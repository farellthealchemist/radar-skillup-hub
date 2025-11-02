import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  PlayCircle, CheckCircle, ChevronLeft, ChevronRight, 
  Clock, Download, Menu, X, Award
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
}

interface Module {
  moduleTitle: string;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  modules: Module[];
}

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([0, 1, 2]);

  const coursesData: Record<string, CourseData> = {
    "1": {
      id: "1",
      title: "Programming Fundamentals",
      instructor: "Asep Surahmat M.Kom",
      thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Python Basics",
          lessons: [
            { id: 0, title: "Introduction to Python", duration: "15 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "Variables & Data Types", duration: "25 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "Control Flow", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 3, title: "Functions", duration: "28 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Object-Oriented Programming",
          lessons: [
            { id: 4, title: "Introduction to OOP", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 5, title: "Classes & Objects", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 6, title: "Inheritance", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    },
    "3": {
      id: "3",
      title: "Microsoft Office Mastery",
      instructor: "Dewi Lestari M.M",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Microsoft Word",
          lessons: [
            { id: 0, title: "Word Basics", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "Document Formatting", duration: "25 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "Mail Merge", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Microsoft Excel",
          lessons: [
            { id: 3, title: "Excel Basics", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 4, title: "Formulas & Functions", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 5, title: "Pivot Tables", duration: "40 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    },
    "4": {
      id: "4",
      title: "Network Administration",
      instructor: "Joko Widodo S.Kom",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Network Fundamentals",
          lessons: [
            { id: 0, title: "Introduction to Networking", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "OSI Model", duration: "45 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "TCP/IP Protocol", duration: "40 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Cisco Configuration",
          lessons: [
            { id: 3, title: "Cisco IOS Basics", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 4, title: "Router Configuration", duration: "45 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    }
  };

  const courseData = coursesData[id];

  useEffect(() => {
    if (!courseData) {
      navigate('/dashboard');
    }
  }, [courseData, navigate]);

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  const allLessons = courseData.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLesson];
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const markAsComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goToPrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToNext = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
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
                  {courseData.instructor}
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
              src={currentLessonData.videoUrl}
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
                    Lesson {currentLesson + 1} of {allLessons.length}
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentLesson === 0}
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
                  {completedLessons.includes(currentLesson) ? 'Completed' : 'Mark Complete'}
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentLesson === allLessons.length - 1}
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
              {allLessons.length} lessons • {completedLessons.length} completed
            </p>
          </div>
          
          <div className="p-4 sm:p-6 space-y-6">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                {/* Module Header */}
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                  <h4 className="text-gray-900 font-semibold text-sm">
                    {module.moduleTitle}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1">
                    {module.lessons.length} lessons
                  </p>
                </div>
                
                {/* Lessons List */}
                <div className="divide-y divide-gray-200">
                  {module.lessons.map((lesson) => {
                    const isActive = currentLesson === lesson.id;
                    const isCompleted = completedLessons.includes(lesson.id);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson.id)}
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