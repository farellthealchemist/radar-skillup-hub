import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, ArrowRight, TrendingUp, ChevronRight, Loader2
} from "lucide-react";

// Animation Hook
const useScrollAnimation = ({ delay = 0 } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
};

const useStaggeredAnimation = (itemCount, staggerDelay = 150, initialDelay = 200) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, initialDelay + i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, initialDelay]);

  return { ref, visibleItems };
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeCourses: 0,
    completedLessons: 0,
    totalHours: 0,
    certificates: 0
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });
  const { ref: coursesRef, visibleItems: coursesVisible } = useStaggeredAnimation(3, 150, 200);

  // Fetch user data and courses
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        setUser({
          name: profile?.full_name || 'Student',
          email: user.email
        });

        // Fetch active enrollments with course details (limit to 3 for dashboard)
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            progress,
            status,
            courses (
              id,
              title,
              thumbnail_url,
              category,
              duration
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .lt('progress', 100)
          .order('enrolled_at', { ascending: false })
          .limit(3);

        if (error) throw error;

        // Process courses
        const processedCourses = [];
        let totalCompletedLessons = 0;
        let totalDuration = 0;

        for (const enrollment of enrollments || []) {
          const course = enrollment.courses;
          
          // Count total lessons for this course
          const { data: modules } = await supabase
            .from('course_modules')
            .select('id')
            .eq('course_id', course.id);

          const moduleIds = modules?.map(m => m.id) || [];
          
          const { count: totalLessons } = await supabase
            .from('lessons')
            .select('id', { count: 'exact', head: true })
            .in('module_id', moduleIds);

          // Count completed lessons for this enrollment
          const { count: completedLessons } = await supabase
            .from('lesson_progress')
            .select('id', { count: 'exact', head: true })
            .eq('enrollment_id', enrollment.id)
            .eq('completed', true);

          processedCourses.push({
            id: course.id,
            title: course.title,
            thumbnail: course.thumbnail_url,
            category: course.category,
            progress: Math.round(enrollment.progress || 0),
            totalLessons: totalLessons || 0,
            completedLessons: completedLessons || 0
          });

          totalCompletedLessons += (completedLessons || 0);

          // Parse duration
          const durationMatch = course.duration?.match(/(\d+)/);
          if (durationMatch) {
            totalDuration += parseInt(durationMatch[1]);
          }
        }

        setMyCourses(processedCourses);

        // Count completed courses (certificates)
        const { count: completedCount } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('progress', 100);

        setStats({
          activeCourses: processedCourses.length,
          completedLessons: totalCompletedLessons,
          totalHours: totalDuration,
          certificates: completedCount || 0
        });

      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data dashboard",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, toast]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Selamat datang kembali! 👋
            </h1>
            <p className="text-gray-600">Mari lanjutkan pembelajaran Anda hari ini</p>
          </div>
        </section>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
      `}</style>

      {/* Simple Header */}
      <section ref={headerRef} className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`transition-all duration-800 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Selamat datang kembali, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-gray-600">
              Mari lanjutkan pembelajaran Anda hari ini
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Courses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Kursus Saya</h2>
            <Link 
              to="/my-courses" 
              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 text-sm smooth-transition"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={coursesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course, index) => (
              <Link
                key={course.id}
                to={`/learn/${course.id}`}
                className={`block transition-all duration-800 ease-out ${
                  coursesVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition border">
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-white text-xs rounded-md font-medium ${
                        course.category === 'Programming' ? 'bg-blue-600' :
                        course.category === 'Office' ? 'bg-green-600' :
                        'bg-purple-600'
                      }`}>
                        {course.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-3 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-red-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full smooth-transition"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Lessons Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PlayCircle className="w-4 h-4" />
                      <span>{course.completedLessons} dari {course.totalLessons} lessons</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {myCourses.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada kursus</h3>
              <p className="text-gray-600 mb-6">
                Mulai perjalanan belajar Anda dengan memilih kursus yang sesuai
              </p>
              <Link 
                to="/courses"
                className="inline-flex items-center px-6 py-3 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium"
              >
                Jelajahi Kursus
              </Link>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Statistik Belajar</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                  icon: <BookOpen className="w-6 h-6" />, 
                  value: stats.activeCourses, 
                  label: "Kursus Aktif",
                  color: "blue",
                  bgColor: "bg-blue-50"
                },
                { 
                  icon: <PlayCircle className="w-6 h-6" />, 
                  value: stats.completedLessons, 
                  label: "Lessons Selesai",
                  color: "green",
                  bgColor: "bg-green-50"
                },
                { 
                  icon: <Clock className="w-6 h-6" />, 
                  value: `${stats.totalHours}h`, 
                  label: "Total Waktu",
                  color: "purple",
                  bgColor: "bg-purple-50"
                },
                { 
                  icon: <Award className="w-6 h-6" />, 
                  value: stats.certificates, 
                  label: "Sertifikat",
                  color: "yellow",
                  bgColor: "bg-yellow-50"
                }
              ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm p-5 hover-lift smooth-transition border"
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                </div>
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Menu Cepat</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="w-6 h-6" />, label: "Semua Kursus", link: "/my-courses", color: "blue" },
              { icon: <Award className="w-6 h-6" />, label: "Sertifikat", link: "/my-courses?tab=completed", color: "green" },
              { icon: <TrendingUp className="w-6 h-6" />, label: "Jelajahi Kursus", link: "/courses", color: "purple" },
              { icon: <CheckCircle className="w-6 h-6" />, label: "Transaksi", link: "/transactions", color: "red" }
            ].map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl p-6 hover:shadow-lg hover-lift smooth-transition border group"
              >
                <div className={`w-12 h-12 bg-${action.color}-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                  <div className={`text-${action.color}-600`}>{action.icon}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{action.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 smooth-transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;