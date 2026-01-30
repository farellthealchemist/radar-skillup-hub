import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, Search, Download, Loader2
} from "lucide-react";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<{
    active: any[];
    completed: any[];
  }>({ active: [], completed: [] });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    totalHours: 0
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });

  // Fetch enrolled courses
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Login Required",
            description: "Silakan login untuk melihat kursus Anda",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Fetch enrollments with course details
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            progress,
            status,
            enrolled_at,
            courses (
              id,
              slug,
              title,
              thumbnail_url,
              category,
              duration,
              instructor_name
            )
          `)
          .eq('user_id', user.id)
          .order('enrolled_at', { ascending: false });

        if (error) throw error;

        // Process enrollments into active and completed
        const activeCourses = [];
        const completedCourses = [];
        let totalDuration = 0;

        for (const enrollment of enrollments || []) {
          const course = enrollment.courses;
          
          // Count lessons
          const { count: totalLessons } = await supabase
            .from('lessons')
            .select('id', { count: 'exact', head: true })
            .in('module_id', 
              await supabase
                .from('course_modules')
                .select('id')
                .eq('course_id', course.id)
                .then(res => res.data?.map(m => m.id) || [])
            );

          // Count completed lessons
          const { count: completedLessons } = await supabase
            .from('lesson_progress')
            .select('id', { count: 'exact', head: true })
            .eq('enrollment_id', enrollment.id)
            .eq('completed', true);

          const courseData = {
            id: course.id,
            slug: course.slug,
            title: course.title,
            thumbnail: course.thumbnail_url,
            category: course.category,
            progress: Math.round(enrollment.progress || 0),
            completedLessons: completedLessons || 0,
            totalLessons: totalLessons || 0,
            totalDuration: course.duration,
            enrolledDate: new Date(enrollment.enrolled_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            instructor: course.instructor_name
          };

          // Parse duration for stats
          const durationMatch = course.duration?.match(/(\d+)/);
          if (durationMatch) {
            totalDuration += parseInt(durationMatch[1]);
          }

          if (enrollment.progress >= 100) {
            completedCourses.push({
              ...courseData,
              completedDate: new Date(enrollment.enrolled_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }),
              certificateUrl: `/certificates/${enrollment.id}`,
              rating: 5
            });
          } else {
            activeCourses.push({
              ...courseData,
              lastAccessed: 'Baru saja'
            });
          }
        }

        setCourses({
          active: activeCourses,
          completed: completedCourses
        });

        setStats({
          total: activeCourses.length + completedCourses.length,
          active: activeCourses.length,
          completed: completedCourses.length,
          totalHours: totalDuration
        });

      } catch (error: any) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Gagal memuat kursus Anda",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [navigate, toast]);

  const filteredCourses = courses[activeTab].filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="hero-gradient text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kursus Saya</h1>
            <p className="text-lg opacity-90">Kelola dan lanjutkan pembelajaran Anda</p>
          </div>
        </section>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat kursus Anda...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
      `}</style>

      {/* Header */}
      <section ref={headerRef} className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-800 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kursus Saya</h1>
            <p className="text-lg opacity-90">Kelola dan lanjutkan pembelajaran Anda</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="w-6 h-6" />, value: stats.total, label: "Total Kursus", color: "red" },
              { icon: <PlayCircle className="w-6 h-6" />, value: stats.active, label: "Sedang Belajar", color: "blue" },
              { icon: <CheckCircle className="w-6 h-6" />, value: stats.completed, label: "Selesai", color: "green" },
              { icon: <Clock className="w-6 h-6" />, value: `${stats.totalHours}h`, label: "Total Durasi", color: "purple" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-5 hover-lift smooth-transition">
                <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center mb-3`}>
                  <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                </div>
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari kursus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 smooth-transition"
                />
              </div>

              {/* Tabs */}
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium smooth-transition ${
                    activeTab === "active"
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sedang Belajar ({courses.active.length})
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium smooth-transition ${
                    activeTab === "completed"
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Selesai ({courses.completed.length})
                </button>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-4">
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada kursus</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "Tidak ada kursus yang cocok dengan pencarian" : "Anda belum memiliki kursus di kategori ini"}
                </p>
                <Link to="/courses" className="inline-flex items-center px-6 py-3 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium">
                  Browse Kursus
                </Link>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition border">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-64 aspect-video md:aspect-square relative overflow-hidden bg-gray-100 flex-shrink-0">
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
                    <div className="flex-1 p-6">
                      <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">Instruktur: {course.instructor}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <PlayCircle className="w-4 h-4" />
                          {course.completedLessons}/{course.totalLessons} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.totalDuration}
                        </span>
                      </div>

                      {/* Progress */}
                      {activeTab === "active" && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-red-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-red-600 h-3 rounded-full smooth-transition"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        {activeTab === "active" ? (
                          <>
                            <Link 
                              to={`/learn/${course.slug}`}
                              className="inline-flex items-center px-6 py-2.5 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium gap-2"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Lanjutkan Belajar
                            </Link>
                            <Link 
                              to={`/courses/${course.slug}`}
                              className="inline-flex items-center px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 font-medium smooth-transition"
                            >
                              Lihat Detail
                            </Link>
                          </>
                        ) : (
                          <>
                            <a 
                              href={course.certificateUrl}
                              className="inline-flex items-center px-6 py-2.5 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download Sertifikat
                            </a>
                            <Link 
                              to={`/learn/${course.slug}`}
                              className="inline-flex items-center px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 font-medium smooth-transition"
                            >
                              Review Materi
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCourses;