import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, 
  Award, ArrowRight, User,
  CreditCard, Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Custom Hooks
const useScrollAnimation = ({ delay = 0, threshold = 0.1, rootMargin = "0px" } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

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

const useStaggeredAnimation = (itemCount: number, staggerDelay = 150, initialDelay = 200) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

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

const useCountAnimation = (targetValue: number, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
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

// Sample Data
const continueLearningCourses = [
  {
    id: "1",
    title: "Programming Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
    progress: 65,
    completedLessons: 8,
    totalLessons: 12,
    timeLeft: "2 jam lagi"
  },
  {
    id: "2",
    title: "Microsoft Office Mastery",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    progress: 40,
    completedLessons: 5,
    totalLessons: 15,
    timeLeft: "4 jam lagi"
  },
  {
    id: "3",
    title: "Network Administration",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    progress: 20,
    completedLessons: 3,
    totalLessons: 18,
    timeLeft: "6 jam lagi"
  }
];

const recommendedCourses = [
  {
    id: "4",
    title: "Advanced Python Programming",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    rating: 4.9,
    price: "Rp 3.200.000",
    level: "Mahir",
    popular: true
  },
  {
    id: "5",
    title: "Web Development Complete",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600",
    rating: 4.8,
    price: "Rp 2.800.000",
    level: "Menengah",
    popular: true
  },
  {
    id: "6",
    title: "Data Science Essentials",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    rating: 4.7,
    price: "Rp 3.500.000",
    level: "Mahir",
    popular: false
  },
  {
    id: "7",
    title: "Cyber Security Basics",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
    rating: 4.6,
    price: "Rp 2.500.000",
    level: "Pemula",
    popular: false
  }
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Akses Ditolak",
          description: "Silakan login terlebih dahulu",
          variant: "destructive",
        });
        navigate('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate, toast]);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });
  const { ref: statsRef, visibleItems: statsVisible } = useStaggeredAnimation(4, 100, 300);
  const { ref: continueRef, visibleItems: continueVisible } = useStaggeredAnimation(3, 150, 200);
  const { ref: recommendRef, visibleItems: recommendVisible } = useStaggeredAnimation(4, 120, 250);

  // Count animations
  const totalCourses = useCountAnimation(12, 2000, statsVisible.includes(0));
  const activeCourses = useCountAnimation(5, 1800, statsVisible.includes(1));
  const completedCourses = useCountAnimation(7, 2200, statsVisible.includes(2));
  const learningHours = useCountAnimation(48, 2500, statsVisible.includes(3));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-lift { transition: transform 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
        .shadow-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .shadow-card-hover:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Header Section */}
      <section ref={headerRef} className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-12 sm:py-16 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className={`transition-all duration-800 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Selamat Datang, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Pengguna'}! 👋
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl">
              Lanjutkan perjalanan belajar Anda dan capai tujuan karir IT impian
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat Card 1 */}
            <div className={`bg-white rounded-xl shadow-card p-6 hover-lift smooth-transition transition-all duration-800 ease-out ${
              statsVisible.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                {totalCourses}
              </div>
              <div className="text-sm text-gray-600">Total Kursus</div>
            </div>

            {/* Stat Card 2 */}
            <div className={`bg-white rounded-xl shadow-card p-6 hover-lift smooth-transition transition-all duration-800 ease-out ${
              statsVisible.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {activeCourses}
              </div>
              <div className="text-sm text-gray-600">Kursus Aktif</div>
            </div>

            {/* Stat Card 3 */}
            <div className={`bg-white rounded-xl shadow-card p-6 hover-lift smooth-transition transition-all duration-800 ease-out ${
              statsVisible.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {completedCourses}
              </div>
              <div className="text-sm text-gray-600">Selesai</div>
            </div>

            {/* Stat Card 4 */}
            <div className={`bg-white rounded-xl shadow-card p-6 hover-lift smooth-transition transition-all duration-800 ease-out ${
              statsVisible.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {learningHours}
              </div>
              <div className="text-sm text-gray-600">Jam Belajar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Lanjutkan Belajar</h2>
            <Link to="/my-courses" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 text-sm sm:text-base smooth-transition">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={continueRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueLearningCourses.map((course, index) => (
              <div 
                key={course.id}
                className={`bg-white border rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition transition-all duration-800 ease-out ${
                  continueVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md font-medium">
                      Sedang Belajar
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Progress */}
                  <div className="mb-4">
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

                  {/* Lessons info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4" />
                      {course.completedLessons}/{course.totalLessons} Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.timeLeft}
                    </span>
                  </div>

                  {/* Button */}
                  <Link 
                    to={`/learn/${course.id}`}
                    className="w-full py-2.5 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white font-medium smooth-transition flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Lanjutkan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Rekomendasi untuk Anda</h2>
              <p className="text-gray-600">Kursus yang mungkin Anda minati</p>
            </div>
            <Link to="/courses" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 text-sm sm:text-base smooth-transition">
              Browse Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={recommendRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCourses.map((course, index) => (
              <div 
                key={course.id}
                className={`bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition transition-all duration-800 ease-out ${
                  recommendVisible.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Thumbnail */}
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
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-600">({course.rating})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-red-600 font-bold text-sm">{course.price}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {course.level}
                    </span>
                  </div>

                  <Link 
                    to={`/course/${course.id}`}
                    className="w-full py-2 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow font-medium text-sm flex items-center justify-center"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Menu */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Quick Access</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/my-courses"
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 hover-lift smooth-transition group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Kursus Saya</div>
              <div className="text-xs text-gray-600">{activeCourses} aktif</div>
            </Link>

            <Link 
              to="/profile"
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 hover-lift smooth-transition group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Profil</div>
              <div className="text-xs text-gray-600">Edit profil</div>
            </Link>

            <Link 
              to="/transactions"
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 hover-lift smooth-transition group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Transaksi</div>
              <div className="text-xs text-gray-600">Riwayat</div>
            </Link>

            <Link 
              to="/my-courses?tab=completed"
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 hover-lift smooth-transition group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Sertifikat</div>
              <div className="text-xs text-gray-600">{completedCourses} sertifikat</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;