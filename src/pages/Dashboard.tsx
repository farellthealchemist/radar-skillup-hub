import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, ArrowRight, User, CreditCard, Star,
  TrendingUp, Calendar, Target, Zap, Trophy,
  ChevronRight, Bell, Settings, LogOut, Menu
} from "lucide-react";

// Custom Hooks
const useScrollAnimation = ({ delay = 0, threshold = 0.1, rootMargin = "0px" } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

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

const useCountAnimation = (targetValue, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(targetValue * percentage));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [targetValue, duration, isVisible]);

  return count;
};

// Sample Data - UPDATED dengan data konsisten
const continueLearningCourses = [
  {
    id: "1",
    title: "Programming Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
    progress: 65,
    completedLessons: 8,
    totalLessons: 12,
    timeLeft: "2 jam lagi",
    category: "Programming",
    lastAccessed: "2 jam yang lalu"
  },
  {
    id: "3",
    title: "Microsoft Office Mastery",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    progress: 40,
    completedLessons: 5,
    totalLessons: 15,
    timeLeft: "4 jam lagi",
    category: "Office",
    lastAccessed: "1 hari yang lalu"
  },
  {
    id: "4",
    title: "Network Administration",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    progress: 20,
    completedLessons: 3,
    totalLessons: 18,
    timeLeft: "6 jam lagi",
    category: "Networking",
    lastAccessed: "3 hari yang lalu"
  }
];

const recommendedCourses = [
  {
    id: "2",
    title: "Scratch Visual Programming",
    thumbnail: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600",
    rating: 4.9,
    price: "Rp 750.000",
    originalPrice: "Rp 900.000",
    level: "Pemula",
    popular: true,
    category: "Programming"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Live Webinar: Python Advanced Tips",
    date: "25 Okt 2025",
    time: "19:00 WIB",
    type: "Webinar",
    instructor: "Asep Surahmat"
  },
  {
    id: 2,
    title: "Q&A Session: Career in IT",
    date: "28 Okt 2025",
    time: "20:00 WIB",
    type: "Q&A",
    instructor: "Team RADAR"
  }
];

const achievements = [
  {
    id: 1,
    icon: <Trophy className="w-6 h-6" />,
    title: "Fast Learner",
    description: "Selesaikan 3 kursus dalam 2 bulan",
    progress: 66,
    color: "yellow"
  },
  {
    id: 2,
    icon: <Target className="w-6 h-6" />,
    title: "Consistent Student",
    description: "Belajar 7 hari berturut-turut",
    progress: 85,
    color: "blue"
  },
  {
    id: 3,
    icon: <Zap className="w-6 h-6" />,
    title: "Quiz Master",
    description: "Dapatkan nilai sempurna di 5 quiz",
    progress: 40,
    color: "purple"
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Simulate user data
  useEffect(() => {
    // Mock user data
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    });
  }, []);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });
  const { ref: statsRef, visibleItems: statsVisible } = useStaggeredAnimation(4, 100, 300);
  const { ref: continueRef, visibleItems: continueVisible } = useStaggeredAnimation(3, 150, 200);
  const { ref: recommendRef, visibleItems: recommendVisible } = useStaggeredAnimation(1, 120, 250);
  const { ref: eventsRef, visibleItems: eventsVisible } = useStaggeredAnimation(2, 100, 200);
  const { ref: achieveRef, visibleItems: achieveVisible } = useStaggeredAnimation(3, 120, 200);

  // Count animations
  const totalCourses = useCountAnimation(12, 2000, statsVisible.includes(0));
  const activeCourses = useCountAnimation(5, 1800, statsVisible.includes(1));
  const completedCourses = useCountAnimation(7, 2200, statsVisible.includes(2));
  const learningHours = useCountAnimation(48, 2500, statsVisible.includes(3));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
        .shadow-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .progress-ring { transform: rotate(-90deg); }
      `}</style>

      {/* Enhanced Header with Profile Menu */}
      <section ref={headerRef} className="relative hero-gradient text-white py-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className={`transition-all duration-800 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Welcome Text */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"} 
                    alt={user?.name}
                    className="w-16 h-16 rounded-full border-4 border-white/30"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      Selamat Datang Kembali! 👋
                    </h1>
                    <p className="text-lg opacity-90 mt-1">
                      {user?.name || 'Student'}
                    </p>
                  </div>
                </div>
                <p className="text-base sm:text-lg opacity-90 max-w-2xl">
                  Ayo lanjutkan pembelajaran Anda dan raih target minggu ini!
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold mb-1">{activeCourses}</div>
                  <div className="text-xs opacity-80">Kursus Aktif</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold mb-1">{learningHours}h</div>
                  <div className="text-xs opacity-80">Jam Belajar</div>
                </div>
              </div>
            </div>

            {/* Progress This Week */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Target Minggu Ini</h3>
                <span className="text-sm opacity-90">15/20 Jam</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white h-3 rounded-full smooth-transition" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm mt-2 opacity-80">5 jam lagi untuk mencapai target mingguan! 🎯</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards - Horizontal Scrollable on Mobile */}
            <section>
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <BookOpen className="w-6 h-6" />, value: totalCourses, label: "Total Kursus", color: "red", bgColor: "bg-red-50" },
                  { icon: <PlayCircle className="w-6 h-6" />, value: activeCourses, label: "Kursus Aktif", color: "blue", bgColor: "bg-blue-50" },
                  { icon: <CheckCircle className="w-6 h-6" />, value: completedCourses, label: "Selesai", color: "green", bgColor: "bg-green-50" },
                  { icon: <Award className="w-6 h-6" />, value: completedCourses, label: "Sertifikat", color: "purple", bgColor: "bg-purple-50" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-xl shadow-card p-5 hover-lift smooth-transition transition-all duration-800 ease-out ${
                      statsVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                      <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                    </div>
                    <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lanjutkan Belajar</h2>
                <Link to="/my-courses" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 smooth-transition">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div ref={continueRef} className="space-y-4">
                {continueLearningCourses.map((course, index) => (
                  <div 
                    key={course.id}
                    className={`bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition border transition-all duration-800 ease-out ${
                      continueVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Thumbnail */}
                      <div className="sm:w-48 aspect-video sm:aspect-square relative overflow-hidden bg-gray-100 flex-shrink-0">
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
                      <div className="flex-1 p-5">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">
                              {course.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                              <span className="flex items-center gap-1">
                                <PlayCircle className="w-4 h-4" />
                                {course.completedLessons}/{course.totalLessons} Lessons
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.timeLeft}
                              </span>
                              <span className="text-xs text-gray-500">
                                • Terakhir diakses {course.lastAccessed}
                              </span>
                            </div>

                            {/* Progress */}
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-semibold text-red-600">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-red-600 h-2.5 rounded-full smooth-transition"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Button */}
                          <div className="mt-4">
                            <Link 
                              to={`/learn/${course.id}`}
                              className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white font-medium smooth-transition gap-2"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Lanjutkan Belajar
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Achievement Progress</h2>
                <Link to="/achievements" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 smooth-transition text-sm">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div ref={achieveRef} className="grid sm:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.id}
                    className={`bg-white rounded-xl p-5 hover:shadow-lg hover-lift smooth-transition border transition-all duration-800 ease-out ${
                      achieveVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className={`w-12 h-12 ${
                      achievement.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                      achievement.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      'bg-purple-50 text-purple-600'
                    } rounded-xl flex items-center justify-center mb-3`}>
                      {achievement.icon}
                    </div>
                    <h4 className="font-bold text-base mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full smooth-transition ${
                          achievement.color === 'yellow' ? 'bg-yellow-500' :
                          achievement.color === 'blue' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{achievement.progress}% Complete</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Side (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Events */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                Upcoming Events
              </h3>

              <div ref={eventsRef} className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={event.id}
                    className={`bg-white rounded-xl p-4 border hover:shadow-md smooth-transition transition-all duration-800 ease-out ${
                      eventsVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                            {event.type}
                          </span>
                          <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.date} • {event.time}</p>
                        <p className="text-xs text-gray-500 mt-1">by {event.instructor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 font-medium smooth-transition text-sm">
                Lihat Semua Event
              </button>
            </section>

            {/* Recommended Course */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                Rekomendasi
              </h3>

              <div ref={recommendRef}>
                {recommendedCourses.map((course, index) => (
                  <div 
                    key={course.id}
                    className={`bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition border transition-all duration-800 ease-out ${
                      recommendVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {course.popular && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-md font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md font-medium">
                          {course.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-base mb-2 line-clamp-2">
                        {course.title}
                      </h4>

                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-gray-600">({course.rating})</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-red-600 font-bold text-base">{course.price}</span>
                          <span className="text-xs text-gray-400 line-through ml-2">{course.originalPrice}</span>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {course.level}
                        </span>
                      </div>

                      <Link 
                        to={`/courses/${course.id}`}
                        className="w-full py-2.5 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium text-sm flex items-center justify-center"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                to="/courses"
                className="block w-full mt-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 font-medium smooth-transition text-sm text-center"
              >
                Browse Semua Kursus
              </Link>
            </section>

            {/* Quick Actions */}
            <section>
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: <User className="w-5 h-5" />, label: "Edit Profil", link: "/profile" },
                  { icon: <CreditCard className="w-5 h-5" />, label: "Riwayat Transaksi", link: "/transactions" },
                  { icon: <Award className="w-5 h-5" />, label: "Sertifikat Saya", link: "/certificates" },
                  { icon: <Settings className="w-5 h-5" />, label: "Pengaturan", link: "/settings" }
                ].map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 smooth-transition border"
                  >
                    <div className="text-gray-600">{action.icon}</div>
                    <span className="text-sm font-medium text-gray-900">{action.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;