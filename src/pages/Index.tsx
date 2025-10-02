import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Palette, 
  FileText, 
  Network, 
  Star, 
  Users, 
  Award, 
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Quote,
  Target,
  Shield,
  MessageCircle,
  ChevronDown,
  HelpCircle
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

// Main Homepage Component
const Homepage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isFaqAnimating, setIsFaqAnimating] = useState(false);

  const toggleFaq = (index) => {
    if (isFaqAnimating) return;
    
    setIsFaqAnimating(true);
    setOpenFaqIndex(openFaqIndex === index ? null : index);
    
    setTimeout(() => setIsFaqAnimating(false), 600);
  };

  const faqs = [
    {
      question: "Bagaimana jika tidak memiliki latar belakang IT?",
      answer: "Tidak masalah! Program kami dirancang untuk semua level, termasuk pemula tanpa latar belakang IT. Instruktur kami akan membantu Anda dari dasar hingga mahir."
    },
    {
      question: "Apakah ada kelas FullStack Web Development?",
      answer: "Saat ini kami fokus pada fundamental programming (Python, Java). Untuk FullStack development, Anda bisa mengikuti program programming terlebih dahulu sebagai foundation."
    },
    {
      question: "Apakah pembayaran dapat dilakukan dengan cara mencicil?",
      answer: "Ya, kami menyediakan sistem pembayaran cicilan yang fleksibel untuk memudahkan siswa mengikuti program kursus."
    },
    {
      question: "Apakah ada kelas coding untuk anak SD?",
      answer: "Ya! Kami memiliki program Scratch yang khusus dirancang untuk anak-anak SD. Program ini mengajarkan logika programming dengan cara yang menyenangkan dan mudah dipahami."
    },
    {
      question: "Berapa lama durasi setiap kelas?",
      answer: "Setiap sesi kelas berlangsung 2-3 jam dengan istirahat. Frekuensi kelas disesuaikan dengan program yang diambil."
    },
    {
      question: "Apakah mendapat sertifikat setelah lulus?",
      answer: "Ya, setiap peserta yang menyelesaikan program akan mendapat sertifikat resmi dari RADAR Education Center yang diakui industri."
    }
  ];

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(4, 150, 300);
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "-50px" });
  const { ref: testimonialsRef, visibleItems: testimonialVisible } = useStaggeredAnimation(3, 200, 250);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.1 });

  const studentCount = useCountAnimation(1000, 2500, statsVisible);
  const courseCount = useCountAnimation(50, 2000, statsVisible);
  const successRate = useCountAnimation(95, 2200, statsVisible);
  const supportTime = useCountAnimation(24, 1800, statsVisible);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const services = [
    {
      id: 'programming',
      title: "Programming",
      description: "Python, Java fundamentals untuk membangun foundation programming yang kuat",
      courses: ["Python Basics", "Java OOP", "Web Development"],
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
      popular: true,
      price: "Mulai 500K",
      duration: "3-6 bulan"
    },
    {
      id: 'scratch',
      title: "Scratch Programming",
      description: "Visual programming untuk pemula dan anak-anak dengan pendekatan yang menyenangkan",
      courses: ["Scratch Basics", "Game Creation", "Interactive Stories"],
      image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=250&fit=crop",
      popular: false,
      price: "Mulai 300K",
      duration: "2-3 bulan"
    },
    {
      id: 'office',
      title: "Microsoft Office",
      description: "Kuasai Word, Excel, PowerPoint untuk produktivitas maksimal di tempat kerja",
      courses: ["Word Advanced", "Excel Mastery", "PowerPoint Design"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      popular: false,
      price: "Mulai 400K",
      duration: "2-4 bulan"
    },
    {
      id: 'networking',
      title: "Networking",
      description: "Network administration dan cybersecurity untuk infrastruktur IT modern",
      courses: ["Network Fundamentals", "Cisco Config", "Security Basics"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      popular: false,
      price: "Mulai 600K",
      duration: "4-6 bulan"
    }
  ];

  const testimonials = [
    {
      name: "Sarah",
      role: "Pelajar",
      company: "SMA Negeri 1",
      content: "Tempat kursus ini sangat bagus! Instruktur ramah dan sabar dalam menjelaskan, sehingga saya lebih mudah memahami materi.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Alvaro", 
      role: "Mahasiswa",
      company: "SMK Vila Mutiara",
      content: "Saya puas mengikuti kursus ini. Instruktur kompeten dan materinya relevan dengan perkembangan IT, membuat saya merasa lebih percaya diri.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Reyhan",
      role: "Mahasiswa",
      company: "Universitas Indonesia", 
      content: "Pengalaman belajar yang sangat baik. Materinya mudah dipahami, fasilitas memadai, dan skill teknis saya meningkat.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const whyChooseUs = [
    {
      title: "Instruktur Berpengalaman",
      description: "Tim instruktur dengan pengalaman industri 10+ tahun"
    },
    {
      title: "Sertifikat Resmi",
      description: "Sertifikat yang diakui industri dan lembaga pendidikan"
    },
    {
      title: "Jadwal Fleksibel",
      description: "Kelas pagi, siang, dan malam sesuai kebutuhan Anda"
    },
    {
      title: "Praktek Intensif",
      description: "70% praktek langsung untuk hasil pembelajaran optimal"
    },
    {
      title: "Job Ready Skills",
      description: "Kurikulum disesuaikan dengan kebutuhan industri terkini"
    },
    {
      title: "Garansi Belajar",
      description: "Bisa mengulang kelas gratis jika belum menguasai materi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const renderServiceIcon = (serviceId) => {
    switch (serviceId) {
      case 'programming':
        return <Code className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />;
      case 'scratch':
        return <Palette className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />;
      case 'office':
        return <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />;
      case 'networking':
        return <Network className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />;
      default:
        return <Code className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-600" />;
    }
  };

  const renderWhyChooseIcon = (index) => {
    switch (index) {
      case 0:
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      case 1:
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      case 2:
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      case 3:
        return <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      case 4:
        return <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      case 5:
        return <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
      default:
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-600" />;
    }
  };

  const styles = `
    .hero-gradient {
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
    }
    .hero-pattern {
      background-image: 
        radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 2px, transparent 2px),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 1px, transparent 1px),
        radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1.5px, transparent 1.5px);
      background-size: 60px 60px, 40px 40px, 80px 80px;
    }
    .gradient-text-animated {
      background: linear-gradient(45deg, #14b8a6, #0d9488, #0f766e);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hover-scale:hover {
      transform: scale(1.05);
    }
    .hover-lift:hover {
      transform: translateY(-6px);
    }
    .smooth-transition {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .shadow-card {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .shadow-card-hover:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    .btn-glow:hover {
      box-shadow: 0 0 20px rgba(13, 148, 136, 0.4);
    }
    .pulse-border {
      position: relative;
    }
    .pulse-border::before {
      content: '';
      position: absolute;
      inset: -2px;
      padding: 2px;
      background: linear-gradient(45deg, #0d9488, #14b8a6);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .pulse-border:hover::before {
      opacity: 0.3;
    }
    .animate-pulse-soft {
      animation: pulseSoft 3s infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    @keyframes pulseSoft {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 sm:pt-28 pb-24 sm:pb-28 overflow-hidden min-h-screen flex items-center hero-gradient hero-pattern">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1588072432836-e10032774350?w=1920&h=1080&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-teal-700/85"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-white order-2 lg:order-1">
              <div className={`transition-all duration-800 ease-out mt-4 sm:mt-6 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-white/20 text-white border border-white/30 rounded-full text-xs sm:text-sm font-medium">
                  🏆 #1 IT Training Center di Tangerang
                </span>
              </div>
              
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-800 ease-out delay-200 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Media Meningkatkan
                <span className="block text-white">
                  Skill dalam Bidang IT
                </span>
              </h1>
              
              <p className={`text-sm sm:text-base lg:text-lg xl:text-xl opacity-90 mb-6 sm:mb-8 max-w-lg leading-relaxed transition-all duration-800 ease-out delay-400 ${
                heroVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Bergabunglah dengan RADAR Education Center dan kembangkan skill IT Anda 
                dari level pemula hingga profesional dengan kurikulum terkini dan instruktur berpengalaman.
              </p>
              
              <div className={`flex flex-col gap-3 sm:gap-4 transition-all duration-800 ease-out delay-600 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Link to="/register" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition btn-glow text-sm sm:text-base">
                  <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Mulai Belajar Sekarang
                </Link>
                <Link to="/courses" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-teal-600 font-semibold rounded-lg hover:scale-105 smooth-transition text-sm sm:text-base">
                  Lihat Program Kursus
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </div>

              {/* Instructor Cards - Mobile Only */}
              <div className={`mt-16 sm:mt-20 mb-8 lg:hidden flex flex-col space-y-4 transition-all duration-1000 ease-out delay-800 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="w-full p-3 sm:p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-xl pulse-border">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                      alt="Asep Surahmat M.Kom" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-600/20 hover-scale smooth-transition flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 smooth-transition text-sm sm:text-base truncate">Asep Surahmat M.Kom</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">Lead Instructor</p>
                      <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-teal-50 to-teal-100 rounded-full hover-scale smooth-transition">
                        <MapPin className="w-3 h-3 text-teal-600 animate-pulse-soft flex-shrink-0" />
                        <span className="text-xs text-teal-700 font-medium truncate">15+ Tahun Exp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full p-3 sm:p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-xl pulse-border">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                      alt="Rizqi Darmawan" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-600/20 hover-scale smooth-transition flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 smooth-transition text-sm sm:text-base truncate">Rizqi Darmawan</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">Senior Instructor</p>
                      <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full hover-scale smooth-transition">
                        <Shield className="w-3 h-3 text-gray-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700 truncate">Network Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Instructor Cards - Desktop Only */}
            <div className={`relative order-1 lg:order-2 hidden lg:flex justify-center lg:justify-end items-center lg:items-start transition-all duration-1000 ease-out delay-400 ${
              heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div className="w-full max-w-sm lg:max-w-none">
                <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 lg:mt-8">
                  <div className="w-full max-w-xs mx-auto lg:mx-0 sm:w-56 md:w-60 lg:w-64 p-3 sm:p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-xl lg:rounded-2xl pulse-border">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                        alt="Asep Surahmat M.Kom" 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-teal-600/20 hover-scale smooth-transition flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 smooth-transition text-sm sm:text-base truncate">Asep Surahmat M.Kom</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Lead Instructor</p>
                        <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 bg-gradient-to-r from-teal-50 to-teal-100 rounded-full hover-scale smooth-transition">
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-600 animate-pulse-soft flex-shrink-0" />
                          <span className="text-xs text-teal-700 font-medium truncate">15+ Tahun Exp</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-xs mx-auto lg:mx-0 sm:w-56 md:w-60 lg:w-64 p-3 sm:p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-xl lg:rounded-2xl pulse-border">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                        alt="Rizqi Darmawan" 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-teal-600/20 hover-scale smooth-transition flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 smooth-transition text-sm sm:text-base truncate">Rizqi Darmawan</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Senior Instructor</p>
                        <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 bg-gray-100 rounded-full hover-scale smooth-transition">
                          <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs text-gray-700 truncate">Network Expert</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium">
              Program Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              4 Kategori Kursus Terpopuler
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Pilih program yang sesuai dengan minat dan kebutuhan karir Anda. 
              Dari programming hingga office skills, semua tersedia di sini.
            </p>
          </div>
          
          <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`group bg-white rounded-lg border hover-lift shadow-card hover:shadow-card-hover overflow-hidden smooth-transition pulse-border transition-all duration-800 ease-out ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 smooth-transition"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white group-hover:scale-110 group-hover:text-teal-400 smooth-transition">
                    {renderServiceIcon(service.id)}
                  </div>
                  {service.popular && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className="px-2 py-1 bg-teal-600 text-white text-xs rounded-full font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 smooth-transition">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 lg:p-6 relative">
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-teal-600 smooth-transition line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {service.courses.slice(0, 2).map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 smooth-transition group/item">
                        <CheckCircle className="w-3 h-3 text-teal-600 flex-shrink-0 group-hover/item:scale-110 smooth-transition" />
                        <span className="truncate">{course}</span>
                      </div>
                    ))}
                    {service.courses.length > 2 && (
                      <div className="text-xs text-gray-400">+{service.courses.length - 2} lainnya</div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs sm:text-sm">
                    <span className="text-teal-600 font-semibold">{service.price}</span>
                    <span className="text-gray-500">{service.duration}</span>
                  </div>
                  
                  <Link to="/courses" className="w-full py-2 sm:py-2.5 text-xs sm:text-sm border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white smooth-transition btn-glow font-medium flex items-center justify-center">
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className={`relative transition-all duration-1000 ease-out ${
              aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="RADAR Education Center - Pengajar Profesional" 
                className="rounded-xl lg:rounded-2xl shadow-card w-full hover-scale smooth-transition"
              />
              <div className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-teal-600 text-white p-4 sm:p-6 rounded-xl shadow-card hover-lift animate-float smooth-transition transition-all duration-1000 ease-out delay-300 ${
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">15+</div>
                  <div className="text-xs sm:text-sm opacity-90">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 ease-out delay-400 ${
              aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium">
                Tentang Kami
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 gradient-text-animated leading-tight">
                PT. Radar Teknologi Komputer Education Center
              </h2>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                Sejak didirikan, RADAR Education Center telah menjadi pionir dalam pendidikan IT di Indonesia. 
                Kami berkomitmen untuk menjadi media terdepan dalam meningkatkan skill teknologi untuk semua kalangan, 
                dari tingkat dasar hingga mahir.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 hover-lift smooth-transition transition-all duration-800 ease-out ${
                      aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-full flex items-center justify-center hover-scale animate-pulse-soft">
                      {renderWhyChooseIcon(index)}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 smooth-transition text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-800 ease-out delay-1000 ${
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Link to="/about" className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 hero-gradient text-white rounded-lg hover:scale-105 smooth-transition btn-glow text-sm sm:text-base">
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a 
                  href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 smooth-transition text-sm sm:text-base"
                >
                  Konsultasi Gratis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium">
              Testimoni
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Apa Kata Alumni Kami
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Dengarkan cerita sukses dari alumni yang telah mengembangkan karir mereka 
              setelah belajar di RADAR Education Center.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 sm:p-8 text-center hover-lift smooth-transition">
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-lg hover-scale smooth-transition"
                        />
                      </div>
                      
                      <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <div className="relative mb-4 sm:mb-6">
                        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600/20 absolute -top-2 sm:-top-4 -left-2 sm:-left-4" />
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed italic pl-4 sm:pl-6">
                          "{testimonial.content.length > 150 ? testimonial.content.substring(0, 150) + '...' : testimonial.content}"
                        </p>
                      </div>
                      
                      <div>
                        <div className="font-bold text-base sm:text-lg text-gray-900">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                        <div className="text-xs sm:text-sm text-teal-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'bg-teal-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-10 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className={`text-center transition-all duration-800 ease-out ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                {statsVisible ? studentCount : 0}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Alumni Tersertifikasi</div>
            </div>
            <div className={`text-center transition-all duration-800 ease-out delay-200 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                {statsVisible ? courseCount : 0}+
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Program Kursus</div>
            </div>
            <div className={`text-center transition-all duration-800 ease-out delay-400 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                {statsVisible ? successRate : 0}%
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Tingkat Kelulusan</div>
            </div>
            <div className={`text-center transition-all duration-800 ease-out delay-600 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                {statsVisible ? supportTime : 0}/7
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">Support Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - UPDATED WITH SMOOTH ANIMATION */}
      <section ref={faqRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className={`transition-all duration-800 ease-out ${
              faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
                Temukan jawaban untuk pertanyaan umum tentang program kursus kami
              </p>
            </div>
          </div>
          
          <div className={`max-w-4xl mx-auto transition-all duration-800 ease-out delay-200 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="space-y-6">
              <div className="space-y-4">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className={`group bg-white rounded-xl border border-gray-200 shadow-card hover:shadow-card-hover hover-lift overflow-hidden pulse-border transition-all duration-500 ease-out ${
                      openFaqIndex === index ? 'ring-2 ring-teal-100 border-teal-200 shadow-lg' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      disabled={isFaqAnimating}
                      className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 ease-out ${
                            openFaqIndex === index 
                              ? 'bg-teal-100 scale-110 rotate-6' 
                              : 'bg-teal-50 group-hover:bg-teal-100 group-hover:scale-105'
                          }`}>
                            <HelpCircle className={`w-5 h-5 transition-all duration-400 ease-out ${
                              openFaqIndex === index 
                                ? 'text-teal-600 scale-110' 
                                : 'text-teal-600 group-hover:scale-105'
                            }`} />
                          </div>
                          <h3 className={`font-bold text-lg leading-tight transition-all duration-400 ease-out ${
                            openFaqIndex === index 
                              ? 'text-teal-600 scale-105' 
                              : 'text-gray-900 group-hover:text-teal-600'
                          }`}>
                            {item.question}
                          </h3>
                        </div>
                        <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-500 ease-out ${
                          openFaqIndex === index 
                            ? 'bg-teal-100 rotate-180 scale-110' 
                            : 'bg-gray-100 group-hover:bg-teal-50 group-hover:scale-105'
                        }`}>
                          <ChevronDown className={`w-5 h-5 transition-all duration-500 ease-out ${
                            openFaqIndex === index ? 'text-teal-600' : 'text-gray-500 group-hover:text-teal-500'
                          }`} />
                        </div>
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-600 ${
                        openFaqIndex === index 
                          ? 'max-h-96 opacity-100 ease-out' 
                          : 'max-h-0 opacity-0 ease-in'
                      }`}
                      style={{
                        transitionTimingFunction: openFaqIndex === index 
                          ? 'cubic-bezier(0.4, 0, 0.2, 1)' 
                          : 'cubic-bezier(0.4, 0, 1, 1)'
                      }}
                    >
                      <div className={`px-6 pb-6 transition-all duration-500 ${
                        openFaqIndex === index 
                          ? 'transform translate-y-0 opacity-100 delay-75' 
                          : 'transform -translate-y-3 opacity-0 delay-0'
                      }`}>
                        <div className="ml-14 pt-2">
                          <div className={`border-t transition-all duration-400 ${
                            openFaqIndex === index 
                              ? 'border-teal-200 bg-gradient-to-r from-teal-50 to-transparent ease-out' 
                              : 'border-gray-100 ease-in'
                          } rounded-sm`}></div>
                          
                          <div className={`mt-4 transition-all duration-500 ${
                            openFaqIndex === index 
                              ? 'opacity-100 transform translate-y-0 delay-150 ease-out' 
                              : 'opacity-0 transform translate-y-2 delay-0 ease-in'
                          }`}>
                            <p className="text-gray-600 leading-relaxed text-base relative">
                              <span className={`absolute inset-0 bg-gradient-to-r from-teal-50/20 to-transparent rounded-lg transition-opacity duration-400 ${
                                openFaqIndex === index ? 'opacity-100' : 'opacity-0'
                              }`}></span>
                              <span className="relative z-10">{item.answer}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 text-center mt-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-teal-100 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
                
                <div className="max-w-2xl mx-auto relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full animate-float">
                      <MessageCircle className="w-8 h-8 text-teal-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in">
                    Masih Ada Pertanyaan?
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in delay-200">
                    Tim kami siap membantu Anda menemukan program kursus yang tepat sesuai kebutuhan dan tujuan karir Anda.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
                    <a 
                      href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 hero-gradient text-white font-semibold rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out btn-glow text-sm sm:text-base group"
                    >
                      <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Hubungi WhatsApp
                    </a>
                    <Link 
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out text-sm sm:text-base group"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Chat Live Support
                    </Link>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in delay-600">
                    <div className="grid sm:grid-cols-2 gap-2 text-center">
                      <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                        <strong>Jam Operasional:</strong><br />Senin - Sabtu, 09:00 - 17:00 WIB
                      </p>
                      <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                        <strong>Response Time:</strong><br />Maksimal 2 jam pada jam kerja
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section ref={ctaRef} className="py-12 sm:py-16 lg:py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className={`transition-all duration-800 ease-out ${
              ctaVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                Siap Memulai Perjalanan IT Anda?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 leading-relaxed">
                Bergabunglah dengan ribuan alumni yang telah sukses berkarir di bidang IT. 
                Konsultasi gratis untuk menentukan program yang tepat untuk Anda.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 hover-scale smooth-transition">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base">0857-8276-3529 (WhatsApp tersedia)</span>
                </div>
                <div className="flex items-center gap-3 hover-scale smooth-transition">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base">asep@radarteknologikomputer.id</span>
                </div>
                <div className="flex items-start gap-3 hover-scale smooth-transition">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed">Jl. Pinang-Kunciran No.114, RT.003/RW.005, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144</span>
                </div>
              </div>
            </div>
            
            <div className={`text-center lg:text-right transition-all duration-800 ease-out delay-400 ${
              ctaVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div className="inline-block p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-white/20 hover-lift smooth-transition w-full max-w-md mx-auto lg:max-w-none">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Konsultasi Gratis</h3>
                <p className="opacity-90 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Diskusikan kebutuhan dan tujuan karir Anda dengan tim kami
                </p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Link 
                    to="/courses"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 hover:scale-105 smooth-transition text-sm sm:text-base flex items-center justify-center"
                  >
                    Lihat Semua Kursus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;