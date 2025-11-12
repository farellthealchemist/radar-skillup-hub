import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  PlayCircle, CheckCircle, ChevronLeft, ChevronRight, 
  Clock, Download, Menu, X, Award, Loader2, AlertCircle, Lock
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  duration: string;
  video_url: string;
  order_number: number;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  order_number: number;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  instructor_name: string;
  thumbnail_url: string;
  modules: Module[];
}

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check authentication and enrollment
  useEffect(() => {
    const checkAuthAndEnrollment = async () => {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Login Required",
            description: "Silakan login untuk mengakses kursus",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }
        
        setUserId(user.id);

        // Check enrollment
        const { data: enrollment, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('id, status')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .eq('status', 'active')
          .maybeSingle();

        if (enrollmentError) throw enrollmentError;

        if (!enrollment) {
          toast({
            title: "Akses Ditolak",
            description: "Anda belum terdaftar di kursus ini. Silakan checkout terlebih dahulu.",
            variant: "destructive"
          });
          navigate(`/courses/${id}`);
          return;
        }

        setIsEnrolled(true);
        setEnrollmentId(enrollment.id);
        
        // Fetch course data with modules and lessons
        await fetchCourseContent();
        
      } catch (error: any) {
        console.error('Error checking enrollment:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data kursus",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    };

    if (id) {
      checkAuthAndEnrollment();
    }
  }, [id, navigate, toast]);

  // Fetch course content from database
  const fetchCourseContent = async () => {
    try {
      setLoading(true);

      // Fetch course details
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('id, title, instructor_name, thumbnail_url')
        .eq('id', id)
        .single();

      if (courseError) throw courseError;

      // Fetch modules with lessons
      const { data: modules, error: modulesError } = await supabase
        .from('course_modules')
        .select(`
          id,
          title,
          description,
          order_number,
          lessons (
            id,
            title,
            description,
            video_url,
            duration,
            order_number
          )
        `)
        .eq('course_id', id)
        .order('order_number', { ascending: true });

      if (modulesError) throw modulesError;

      // Sort lessons within each module
      const sortedModules = modules.map(module => ({
        ...module,
        lessons: (module.lessons as any[]).sort((a, b) => a.order_number - b.order_number)
      }));

      // Fetch user's lesson progress
      const { data: progress, error: progressError } = await supabase
        .from('lesson_progress')
        .select('lesson_id, completed')
        .eq('user_id', userId)
        .eq('enrollment_id', enrollmentId);

      if (progressError) throw progressError;

      // Create set of completed lesson IDs
      const completedSet = new Set<string>(
        progress?.filter(p => p.completed).map(p => p.lesson_id) || []
      );
      setCompletedLessons(completedSet);

      // Set course data
      setCourseData({
        ...course,
        modules: sortedModules as Module[]
      });

    } catch (error: any) {
      console.error('Error fetching course content:', error);
      toast({
        title: "Error",
        description: "Gagal memuat konten kursus",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading || !courseData || !isEnrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat kursus...</p>
        </div>
      </div>
    );
  }

  const allLessons = courseData.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLessonIndex];
  const progress = Math.round((completedLessons.size / allLessons.length) * 100);

  // Mark lesson as complete
  const markAsComplete = async () => {
    if (!currentLessonData || !userId || !enrollmentId) return;

    const isAlreadyCompleted = completedLessons.has(currentLessonData.id);

    try {
      // Update or insert lesson progress
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: currentLessonData.id,
          enrollment_id: enrollmentId,
          completed: true,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      // Update local state
      setCompletedLessons(prev => new Set(prev).add(currentLessonData.id));

      toast({
        title: "Progress Tersimpan",
        description: "Lesson berhasil diselesaikan!",
      });

      // Auto-advance to next lesson
      if (currentLessonIndex < allLessons.length - 1) {
        setTimeout(() => {
          setCurrentLessonIndex(currentLessonIndex + 1);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error marking lesson complete:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan progress",
        variant: "destructive"
      });
    }
  };

  const goToPrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      {/* Top Navigation Bar */}
      <nav className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <Link 
                to="/dashboard"
                className="flex-shrink-0 p-2 -m-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Back to dashboard"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-gray-900 font-semibold text-base sm:text-lg truncate">
                  {courseData.title}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm truncate">
                  {courseData.instructor_name}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex-shrink-0 p-2 -m-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
              <span className="text-gray-600 font-medium">Course Progress</span>
              <span className="text-red-600 font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <main className="flex-1 lg:min-h-[calc(100vh-137px)]">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={currentLessonData.video_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentLessonData.title}
            />
          </div>

          {/* Lesson Info & Controls */}
          <div className="bg-white border-b lg:border-b-0 border-gray-200">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Lesson Title */}
              <div className="mb-6">
                <h2 className="text-gray-900 text-xl sm:text-2xl font-bold mb-3">
                  {currentLessonData.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {currentLessonData.duration}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Lesson {currentLessonIndex + 1} of {allLessons.length}
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentLessonIndex === 0}
                  className="sm:flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                
                <button
                  onClick={markAsComplete}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all font-semibold shadow-lg shadow-red-500/25"
                >
                  <CheckCircle className="w-5 h-5" />
                  {completedLessons.has(currentLessonData.id) ? 'Completed' : 'Mark Complete'}
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="sm:flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 font-medium"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar - Course Content */}
        <aside 
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-[400px] xl:w-[440px] bg-white lg:border-l border-gray-200 lg:max-h-[calc(100vh-137px)] lg:overflow-y-auto`}
        >
          <div className="p-4 sm:p-6 sticky top-0 bg-white border-b border-gray-200 lg:border-b-0">
            <h3 className="text-gray-900 font-bold text-lg">Course Content</h3>
            <p className="text-gray-500 text-sm mt-1">
              {allLessons.length} lessons • {completedLessons.size} completed
            </p>
          </div>
          
          <div className="p-4 sm:p-6 space-y-6">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                {/* Module Header */}
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                  <h4 className="text-gray-900 font-semibold text-sm">
                    {module.title}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1">
                    {module.lessons.length} lessons
                  </p>
                </div>
                
                {/* Lessons List */}
                <div className="divide-y divide-gray-200">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const lessonGlobalIndex = courseData.modules
                      .slice(0, moduleIndex)
                      .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex;
                    
                    const isActive = currentLessonIndex === lessonGlobalIndex;
                    const isCompleted = completedLessons.has(lesson.id);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonIndex(lessonGlobalIndex)}
                        className={`w-full text-left p-4 smooth-transition ${
                          isActive 
                            ? 'bg-gradient-to-r from-red-600 to-red-500' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {isCompleted ? (
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                isActive ? 'bg-white/20' : 'bg-gray-300'
                              }`}>
                                <PlayCircle className={`w-4 h-4 ${
                                  isActive ? 'text-white' : 'text-gray-600'
                                }`} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={`font-medium mb-1 ${
                              isActive ? 'text-white' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </h5>
                            <p className={`text-xs ${
                              isActive ? 'text-white/80' : 'text-gray-600'
                            }`}>
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Course Completion Card */}
            {progress === 100 && (
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-center shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  Congratulations! 🎉
                </h4>
                <p className="text-white/90 text-sm mb-6">
                  You've completed this course successfully
                </p>
                <Link
                  to="/my-courses?tab=completed"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-gray-100 transition-all font-semibold shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Learn;