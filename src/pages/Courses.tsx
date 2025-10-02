import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle,
  ArrowRight,
  Star,
  Filter,
  Search,
  Phone,
  Download,
  Target,
  TrendingUp,
  Shield
} from "lucide-react";

// Optimized Animation Hooks (consistent with homepage)
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

const useStaggeredAnimation = (itemCount, staggerDelay = 120, initialDelay = 200) => {
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

const OptimizedCourses = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: coursesRef, visibleItems } = useStaggeredAnimation(4, 150, 250);
  const { ref: guaranteeRef, visibleItems: guaranteeItems } = useStaggeredAnimation(3, 100, 200);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const courses = [
    {
      id: 1,
      title: "Programming Fundamentals",
      category: "Programming",
      description: "Pelajari dasar-dasar pemrograman dengan Python dan Java. Cocok untuk pemula yang ingin memulai karir di bidang software development.",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop",
      duration: "3-6 Bulan",
      students: "150+",
      level: "Pemula - Menengah",
      price: "Rp 2.500.000",
      originalPrice: "Rp 3.000.000",
      discount: "17%",
      rating: 4.8,
      popular: true,
      features: [
        "Python Programming",
        "Java Fundamentals", 
        "Database Basics",
        "Web Development Intro",
        "Project Portfolio"
      ],
      outcomes: [
        "Menguasai sintaks Python dan Java",
        "Memahami konsep OOP dan database",
        "Dapat membuat aplikasi web sederhana",
        "Siap untuk advanced programming"
      ]
    },
    {
      id: 2,
      title: "Scratch Visual Programming",
      category: "Programming",
      description: "Pengenalan programming untuk anak-anak dan pemula menggunakan Scratch. Belajar logika programming dengan cara yang menyenangkan.",
      image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600&h=400&fit=crop",
      duration: "2-3 Bulan",
      students: "200+",
      level: "Pemula",
      price: "Rp 750.000",
      originalPrice: "Rp 900.000",
      discount: "17%",
      rating: 4.9,
      popular: false,
      features: [
        "Scratch Basics",
        "Game Development",
        "Animation Creation",
        "Interactive Stories",
        "Logic Building"
      ],
      outcomes: [
        "Memahami logika programming",
        "Dapat membuat game interaktif",
        "Mengembangkan problem solving",
        "Foundation untuk text-based coding"
      ]
    },
    {
      id: 3,
      title: "Microsoft Office Mastery",
      category: "Office",
      description: "Kuasai Microsoft Office (Word, Excel, PowerPoint) untuk produktivitas maksimal di tempat kerja dan pendidikan.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      duration: "2-4 Bulan",
      students: "300+",
      level: "Pemula - Mahir",
      price: "Rp 1.200.000",
      originalPrice: "Rp 1.500.000",
      discount: "20%",
      rating: 4.7,
      popular: true,
      features: [
        "Word Advanced",
        "Excel Formulas & Macros",
        "PowerPoint Design",
        "Data Analysis",
        "Business Templates"
      ],
      outcomes: [
        "Mahir Word untuk dokumen profesional",
        "Menguasai Excel untuk data analysis",
        "Membuat presentasi yang menarik",
        "Meningkatkan produktivitas kerja 300%"
      ]
    },
    {
      id: 4,
      title: "Network Administration",
      category: "Networking",
      description: "Pelajari administrasi jaringan, keamanan cyber, dan infrastruktur IT. Ideal untuk IT support dan network administrator.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      duration: "4-6 Bulan",
      students: "100+",
      level: "Menengah - Mahir",
      price: "Rp 3.500.000",
      originalPrice: "Rp 4.200.000",
      discount: "17%",
      rating: 4.6,
      popular: false,
      features: [
        "Network Fundamentals",
        "Cisco Configuration",
        "Cybersecurity Basics",
        "Server Administration",
        "Troubleshooting"
      ],
      outcomes: [
        "Dapat merancang infrastruktur jaringan",
        "Menguasai konfigurasi Cisco devices",
        "Memahami security protocols",
        "Job-ready sebagai Network Admin"
      ]
    }
  ];

  const categories = [
    { name: "Semua", count: courses.length },
    { name: "Programming", count: courses.filter(c => c.category === "Programming").length },
    { name: "Office", count: courses.filter(c => c.category === "Office").length },
    { name: "Networking", count: courses.filter(c => c.category === "Networking").length }
  ];

  const guaranteeFeatures = [
    { 
      icon: <Shield className="w-8 h-8 text-teal-600" />, 
      title: "Garansi Mengulang", 
      description: "Bisa mengulang kelas GRATIS jika belum menguasai materi",
      highlight: "100% Guarantee"
    },
    { 
      icon: <Users className="w-8 h-8 text-teal-600" />, 
      title: "Kelas Kecil", 
      description: "Maksimal 12 siswa per kelas untuk perhatian personal optimal",
      highlight: "Personal Attention"
    },
    { 
      icon: <Target className="w-8 h-8 text-teal-600" />, 
      title: "Job Assistance", 
      description: "Bantuan penempatan kerja dan career guidance setelah lulus",
      highlight: "85% Job Rate"
    }
  ];

  // Filter courses based on category and search
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "Semua" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Consistent Styles with Homepage */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #14b8a6, #0d9488, #0f766e);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(13, 148, 136, 0.4);
        }
      `}</style>

      {/* Hero Section - Simplified without stats */}
      <section ref={heroRef} className="py-16 mt-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-medium border border-teal-100">
                Program Kursus IT
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Pilih Program Kursus 
                <span className="gradient-text"> Sesuai Tujuan Karir Anda</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Dari Programming hingga Network Administration, temukan program yang tepat untuk mengembangkan skill IT dan mempersiapkan masa depan profesional Anda.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-gray-700">
                  <strong>Cara Memilih:</strong> Gunakan filter kategori dan pencarian di bawah untuk menemukan program yang sesuai dengan minat dan level skill Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter & Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:flex-1 max-w-md">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Cari kursus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm rounded-lg font-medium smooth-transition hover-lift ${
                      activeCategory === category.name
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="hidden sm:inline">{category.name} ({category.count})</span>
                    <span className="sm:hidden">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Courses Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={coursesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className={`group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover-lift smooth-transition transition-all duration-800 ease-out ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Course Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-md ${
                      course.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
                      course.category === 'Office' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {course.category}
                    </span>
                  </div>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1">
                    {course.popular && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-600 text-white text-xs font-medium rounded-md">
                        Popular
                      </span>
                    )}
                    {course.discount && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-teal-600 text-white text-xs font-bold rounded-md">
                        -{course.discount}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-3 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base sm:text-lg gradient-text group-hover:scale-105 smooth-transition leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                  
                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4 py-2 sm:py-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Clock className="w-3 h-3 mx-auto mb-1 text-teal-600" />
                      <div className="text-xs font-medium">{course.duration}</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-3 h-3 mx-auto mb-1 text-teal-600" />
                      <div className="text-xs font-medium">{course.students}</div>
                    </div>
                    <div className="text-center">
                      <Award className="w-3 h-3 mx-auto mb-1 text-teal-600" />
                      <div className="text-xs font-medium">Sertifikat</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center gap-2">
                      <BookOpen className="w-3 h-3 text-teal-600" />
                      <span className="hidden sm:inline">Materi Utama:</span>
                      <span className="sm:hidden">Materi:</span>
                    </h4>
                    <div className="space-y-1">
                      {course.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-2 h-2 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                      <div className="text-xs text-gray-500">
                        +{course.features.length - 2} lainnya
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base sm:text-lg font-bold text-teal-600">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">{course.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Per program</div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md hidden sm:inline">
                        {course.level}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to="/courses" 
                        className="px-2 sm:px-3 py-1.5 sm:py-2 border border-teal-600 text-teal-600 font-medium rounded-md hover:bg-teal-50 smooth-transition text-xs sm:text-sm flex items-center justify-center"
                      >
                        Detail
                      </Link>
                      <Link 
                        to="/register"
                        className="px-2 sm:px-3 py-1.5 sm:py-2 hero-gradient text-white font-medium rounded-md hover:scale-105 smooth-transition btn-glow text-xs sm:text-sm flex items-center justify-center"
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Guarantee */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Jaminan Pembelajaran
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Komitmen Kami untuk Kesuksesan Anda
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami tidak hanya mengajar, tapi memastikan Anda benar-benar menguasai skill yang dipelajari
            </p>
          </div>
          
          <div ref={guaranteeRef} className="grid md:grid-cols-3 gap-8">
            {guaranteeFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                  guaranteeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-teal-600 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 text-xs font-medium rounded-full">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={ctaRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Mulai Investasi Terbaik untuk Masa Depan Anda
              </h2>
              
              <p className={`text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Konsultasi GRATIS untuk menentukan program yang tepat sesuai tujuan karir dan skill level Anda saat ini.
              </p>
              
              {/* Contact options */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out delay-400 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <a 
                  href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition btn-glow"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Via WhatsApp
                </a>
                <a 
                  href="#"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 hover:scale-105 smooth-transition"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brosur Program
                </a>
              </div>

              {/* Quick contact info */}
              <div className={`text-center opacity-80 transition-all duration-1000 ease-out delay-600 ${
                ctaVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <p className="text-sm mb-2">Atau hubungi langsung:</p>
                <p className="font-semibold">0857-8276-3529 (WhatsApp) • asep@radarteknologikomputer.id</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedCourses;