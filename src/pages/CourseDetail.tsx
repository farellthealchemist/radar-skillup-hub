import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, Users, Award, BookOpen, CheckCircle, Star,
  ChevronDown, PlayCircle, Globe, Target, Loader2,
  Share2, Heart, Lock, ChevronRight
} from "lucide-react";

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

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  discount_price: number | null;
  discount_end_date: string | null;
  is_free: boolean;
  duration: string | null;
  level: string | null;
  language: string | null;
  category: string | null;
  rating: number | null;
  total_students: number | null;
  instructor_name: string | null;
  instructor_avatar: string | null;
}

interface Enrollment {
  id: string;
  progress: number;
  status: string;
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCourseData();
    checkAuth();
  }, [slug]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user && course) {
      fetchEnrollment(user.id);
    }
  };

  const fetchCourseData = async () => {
    try {
      setLoading(true);

      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (courseError) throw courseError;
      if (!courseData) {
        toast({
          title: "Kursus tidak ditemukan",
          description: "Kursus yang Anda cari tidak tersedia.",
          variant: "destructive"
        });
        navigate('/courses');
        return;
      }

      setCourse(courseData);

      // Fetch modules with lessons
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select(`
          *,
          lessons (*)
        `)
        .eq('course_id', courseData.id)
        .order('order_number', { ascending: true });

      if (modulesError) throw modulesError;

      // Format modules with sorted lessons
      const formattedModules = (modulesData || []).map((module: any) => ({
        ...module,
        lessons: (module.lessons || []).sort((a: any, b: any) => a.order_number - b.order_number)
      }));

      setModules(formattedModules);

      // Check enrollment if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await fetchEnrollment(user.id, courseData.id);
      }

    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Gagal memuat kursus",
        description: "Terjadi kesalahan saat memuat data kursus",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollment = async (userId: string, courseId?: string) => {
    try {
      const { data: enrollmentData, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          lesson_progress (
            lesson_id,
            completed
          )
        `)
        .eq('user_id', userId)
        .eq('course_id', courseId || course?.id)
        .maybeSingle();

      if (!error && enrollmentData) {
        setEnrollment(enrollmentData);

        // Map lesson progress
        const completedLessons = new Set(
          enrollmentData.lesson_progress
            ?.filter((lp: any) => lp.completed)
            .map((lp: any) => lp.lesson_id) || []
        );

        setModules(prevModules => 
          prevModules.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson => ({
              ...lesson,
              completed: completedLessons.has(lesson.id)
            }))
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching enrollment:', error);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login terlebih dahulu untuk mendaftar kursus"
      });
      navigate('/login');
      return;
    }

    if (!course) return;

    if (course.is_free) {
      // Create enrollment directly for free courses
      try {
        const { error } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            course_id: course.id
          });

        if (error) throw error;

        toast({
          title: "Berhasil mendaftar!",
          description: "Anda sekarang dapat mengakses kursus ini"
        });

        fetchEnrollment(user.id, course.id);
      } catch (error) {
        console.error('Error enrolling:', error);
        toast({
          title: "Gagal mendaftar",
          description: "Terjadi kesalahan saat mendaftar kursus",
          variant: "destructive"
        });
      }
    } else {
      // Navigate to checkout for paid courses
      navigate('/checkout', { state: { courseId: course.id } });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!course?.discount_price || !course?.price) return null;
    return Math.round(((course.price - course.discount_price) / course.price) * 100);
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.completed).length,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat kursus...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Kursus tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-red-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/courses" className="text-gray-500 hover:text-red-600 transition-colors">
              Kursus
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Link 
                  to="/courses" 
                  className="text-white/80 hover:text-white text-sm inline-flex items-center gap-2"
                >
                  ← Kembali ke Kursus
                </Link>
              </div>
              
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                {course.category || 'IT & Programming'}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-white/90 mb-6">
                {course.description?.substring(0, 200)}...
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating || 4.8}</span>
                  <span className="text-white/80">({course.total_students || 0} siswa)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.total_students || 0} siswa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration || '3-6 Bulan'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{course.language || 'Bahasa Indonesia'}</span>
                </div>
              </div>

              {enrollment && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Progress Kursus</span>
                    <span className="text-sm">{Math.round(enrollment.progress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/80 mt-2">
                    {completedLessons} dari {totalLessons} pelajaran selesai
                  </p>
                </div>
              )}
            </div>

            {/* Right Card - Price & Enroll */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
                {course.thumbnail_url && (
                  <img 
                    src={course.thumbnail_url} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}

                {course.is_free ? (
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary">Gratis</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    {course.discount_price ? (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-3xl font-bold text-primary">
                            {formatPrice(course.discount_price)}
                          </p>
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                            {calculateDiscount()}% OFF
                          </span>
                        </div>
                        <p className="text-gray-500 line-through">
                          {formatPrice(course.price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-primary">
                        {formatPrice(course.price)}
                      </p>
                    )}
                  </div>
                )}

                {enrollment ? (
                  <Button 
                    onClick={() => navigate(`/learn/${course.slug}`)}
                    className="w-full mb-4"
                    size="lg"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Lanjutkan Belajar
                  </Button>
                ) : (
                  <Button 
                    onClick={handleEnroll}
                    className="w-full mb-4"
                    size="lg"
                  >
                    {course.is_free ? 'Daftar Gratis' : 'Daftar Sekarang'}
                  </Button>
                )}

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Durasi: {course.duration || '3-6 Bulan'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <span>{totalLessons} pelajaran</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-gray-400" />
                    <span>Level: {course.level || 'Pemula - Menengah'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span>Sertifikat tersedia</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-8 border-b mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('kurikulum')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'kurikulum'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Kurikulum
            </button>
            <button
              onClick={() => setActiveTab('instruktur')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'instruktur'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Instruktur
            </button>
          </div>

          {/* Tab Content - Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Tentang Kursus</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content - Kurikulum */}
          {activeTab === 'kurikulum' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Kurikulum Lengkap</h2>
              <div className="space-y-4">
                {modules.map((module, index) => {
                  const moduleCompleted = module.lessons.filter(l => l.completed).length;
                  const moduleTotal = module.lessons.length;
                  
                  return (
                    <div key={module.id} className="bg-white border rounded-xl overflow-hidden">
                      <div
                        onClick={() => toggleModule(index)}
                        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{moduleTotal} pelajaran</span>
                            {enrollment && (
                              <span className="text-primary">
                                {moduleCompleted}/{moduleTotal} selesai
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            expandedModules.includes(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      
                      {expandedModules.includes(index) && (
                        <div className="p-5 pt-0 border-t bg-gray-50">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 py-3 border-b last:border-0"
                            >
                              {lesson.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : enrollment ? (
                                <PlayCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                              <span className="flex-1 text-gray-700">{lesson.title}</span>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content - Instruktur */}
          {activeTab === 'instruktur' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Instruktur</h2>
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {course.instructor_avatar && (
                    <img
                      src={course.instructor_avatar}
                      alt={course.instructor_name || 'Instruktur'}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {course.instructor_name || 'Instruktur Professional'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Instruktur berpengalaman di bidang {course.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;