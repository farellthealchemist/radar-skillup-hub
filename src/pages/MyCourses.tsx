import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, Filter, Search, Download, Calendar,
  TrendingUp, Star
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

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });

  // Sample data
  const courses = {
    active: [
      {
        id: "1",
        title: "Programming Fundamentals",
        thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
        category: "Programming",
        progress: 65,
        completedLessons: 8,
        totalLessons: 12,
        totalDuration: "45 jam",
        enrolledDate: "15 Sep 2025",
        lastAccessed: "2 jam yang lalu",
        instructor: "Asep Surahmat M.Kom"
      },
      {
        id: "3",
        title: "Microsoft Office Mastery",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        category: "Office",
        progress: 40,
        completedLessons: 5,
        totalLessons: 15,
        totalDuration: "30 jam",
        enrolledDate: "20 Sep 2025",
        lastAccessed: "1 hari yang lalu",
        instructor: "Dewi Lestari M.M"
      },
      {
        id: "4",
        title: "Network Administration",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        category: "Networking",
        progress: 20,
        completedLessons: 3,
        totalLessons: 18,
        totalDuration: "60 jam",
        enrolledDate: "25 Sep 2025",
        lastAccessed: "3 hari yang lalu",
        instructor: "Joko Widodo S.Kom"
      }
    ],
    completed: [
      {
        id: "2",
        title: "Scratch Visual Programming",
        thumbnail: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600",
        category: "Programming",
        progress: 100,
        completedLessons: 10,
        totalLessons: 10,
        totalDuration: "20 jam",
        completedDate: "10 Sep 2025",
        certificateUrl: "#",
        rating: 5,
        instructor: "Rina Kusuma S.Pd"
      }
    ]
  };

  const filteredCourses = courses[activeTab].filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: courses.active.length + courses.completed.length,
    active: courses.active.length,
    completed: courses.completed.length,
    totalHours: courses.active.reduce((acc, c) => acc + parseInt(c.totalDuration), 0) + 
                courses.completed.reduce((acc, c) => acc + parseInt(c.totalDuration), 0)
  };

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
                              to={`/learn/${course.id}`}
                              className="inline-flex items-center px-6 py-2.5 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium gap-2"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Lanjutkan Belajar
                            </Link>
                            <Link 
                              to={`/courses/${course.id}`}
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
                              to={`/learn/${course.id}`}
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