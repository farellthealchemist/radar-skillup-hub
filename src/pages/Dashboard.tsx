import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, ArrowRight, TrendingUp, ChevronRight
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

// Sample Data
const myCourses = [
  {
    id: "1",
    title: "Programming Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
    category: "Programming",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8
  },
  {
    id: "3",
    title: "Microsoft Office Mastery",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    category: "Office",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6
  },
  {
    id: "4",
    title: "Network Administration",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    category: "Networking",
    progress: 20,
    totalLessons: 18,
    completedLessons: 4
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });
  const { ref: coursesRef, visibleItems: coursesVisible } = useStaggeredAnimation(3, 150, 200);

  useEffect(() => {
    // Simulate user data
    setUser({
      name: "John Doe",
      email: "john@example.com"
    });
  }, []);

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
                value: myCourses.length, 
                label: "Kursus Aktif",
                color: "blue",
                bgColor: "bg-blue-50"
              },
              { 
                icon: <PlayCircle className="w-6 h-6" />, 
                value: myCourses.reduce((acc, c) => acc + c.completedLessons, 0), 
                label: "Lessons Selesai",
                color: "green",
                bgColor: "bg-green-50"
              },
              { 
                icon: <Clock className="w-6 h-6" />, 
                value: "24h", 
                label: "Total Waktu",
                color: "purple",
                bgColor: "bg-purple-50"
              },
              { 
                icon: <Award className="w-6 h-6" />, 
                value: "1", 
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