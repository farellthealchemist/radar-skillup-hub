import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  BookOpen, 
  Target, 
  Clock, 
  Shield,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Zap,
  TrendingUp
} from "lucide-react";

// Optimized Animation Hooks
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

const OptimizedAbout = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-80px" });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: valuesRef, visibleItems: valueItems } = useStaggeredAnimation(6, 100, 250);
  const { ref: instructorsRef, visibleItems: instructorItems } = useStaggeredAnimation(2, 200, 300);
  const { ref: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  // Enhanced company values with teal theme
  const values = [
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,  
      title: "Untuk Semua Kalangan",
      subtitle: "SD - Perguruan Tinggi",
      description: "Program pembelajaran komprehensif untuk semua tingkatan pendidikan, dari siswa SD hingga mahasiswa perguruan tinggi",
      highlight: "All Ages Welcome"
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Sertifikat Terakreditasi", 
      subtitle: "Industry Recognition",
      description: "Sertifikat resmi yang diakui industri dan institusi pendidikan, meningkatkan kredibilitas profesional Anda",
      highlight: "Certified Programs"
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-600" />,
      title: "Jadwal Fleksibel",
      subtitle: "Sesuai Kebutuhan Anda",
      description: "Pembelajaran adaptif dengan jadwal pagi, siang, dan malam. Akses materi 24/7 melalui platform digital",
      highlight: "24/7 Access"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      title: "Kurikulum Terkini",
      subtitle: "Industry-Aligned",
      description: "Materi pembelajaran yang selalu diperbarui mengikuti perkembangan teknologi dan kebutuhan pasar kerja",
      highlight: "Updated Monthly"
    },
    {
      icon: <Target className="w-8 h-8 text-teal-600" />,
      title: "Praktek Intensif",
      subtitle: "70% Hands-On",
      description: "Fokus pada penerapan praktis dengan rasio 70% praktek dan 30% teori untuk hasil pembelajaran optimal",
      highlight: "Project-Based"
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Garansi Pembelajaran",
      subtitle: "Money Back Guarantee",
      description: "Jaminan kualitas dengan opsi mengulang kelas gratis jika belum menguasai materi sepenuhnya",
      highlight: "100% Guarantee"
    }
  ];

  // Company timeline
  const timeline = [
    {
      year: "2008",
      title: "Pendirian RADAR",
      description: "Dimulai sebagai kursus komputer lokal di Tangerang dengan fokus Microsoft Office",
      icon: <Building className="w-5 h-5" />
    },
    {
      year: "2012", 
      title: "Ekspansi Program",
      description: "Menambah program Programming dan Networking seiring meningkatnya kebutuhan IT",
      icon: <Zap className="w-5 h-5" />
    },
    {
      year: "2016",
      title: "Sertifikasi Resmi",
      description: "Mendapat akreditasi resmi dan kemitraan dengan institusi pendidikan tinggi",
      icon: <Award className="w-5 h-5" />
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Mengadaptasi pembelajaran hybrid dan platform online di era pandemi",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      year: "2024",
      title: "1000+ Alumni",
      description: "Mencapai milestone 1000+ alumni tersertifikasi dengan tingkat penempatan kerja 85%",
      icon: <Users className="w-5 h-5" />
    }
  ];

  // Enhanced instructor profiles
  const instructors = [
    {
      name: "Asep Surahmat M.Kom",
      title: "Lead Instructor & Founder",
      specialization: "Programming, Database Management, System Analysis",
      experience: "15+ tahun pengalaman industri IT",
      credentials: ["M.Kom dari ITB", "Certified Java Developer", "Database Specialist"],
      achievements: "Telah melatih 500+ profesional IT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 4.9
    },
    {
      name: "Rizqi Darmawan",
      title: "Senior Instructor",
      specialization: "Network Security, Infrastructure, Cloud Computing",
      experience: "12+ tahun pengalaman networking & security",
      credentials: ["CCNA Certified", "CompTIA Security+", "AWS Cloud Practitioner"],
      achievements: "Expert dalam implementasi jaringan enterprise",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 4.8
    }
  ];

  // Company achievements
  const achievements = [
    { number: "1000+", label: "Alumni Tersertifikasi", description: "Lulusan yang telah berhasil menyelesaikan program" },
    { number: "15+", label: "Tahun Pengalaman", description: "Melayani pendidikan IT sejak tahun 2008" },
    { number: "85%", label: "Job Placement Rate", description: "Alumni yang berhasil mendapat pekerjaan dalam 6 bulan" },
    { number: "4.8/5", label: "Rating Kepuasan", description: "Berdasarkan feedback dari 500+ alumni" }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Optimized Styles with Teal Theme */}
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
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-line {
          background: linear-gradient(to bottom, #14b8a6, #0d9488, #0f766e);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(13, 148, 136, 0.4);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Enhanced Company Story with teal theme */}
      <section ref={storyRef} className="py-16 mt-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                Cerita Kami
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text leading-tight">
                16 Tahun Dedikasi dalam Pendidikan IT
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">RADAR Education Center</strong> lahir dari visi sederhana namun ambisius: 
                  menjadikan teknologi informasi dapat diakses dan dikuasai oleh semua kalangan. 
                  Kami percaya bahwa setiap orang memiliki potensi untuk berkembang di era digital ini.
                </p>
                
                <p>
                  Dengan pendekatan pembelajaran yang <strong className="text-teal-600">70% praktek</strong> dan 
                  <strong className="text-teal-600"> 30% teori</strong>, kami memastikan setiap siswa tidak hanya 
                  memahami konsep, tetapi juga mampu mengimplementasikan skill dalam dunia kerja nyata.
                </p>
                
                <p>
                  Tim instruktur kami terdiri dari praktisi industri dengan pengalaman puluhan tahun, 
                  yang selalu mengupdate kurikulum mengikuti perkembangan teknologi terkini.
                </p>
              </div>

              {/* Enhanced stats */}
              <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-800 ease-out delay-400 ${
                storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="text-center p-4 bg-gray-50 rounded-xl hover-lift smooth-transition">
                  <div className="text-2xl font-bold gradient-text mb-1">1000+</div>
                  <div className="text-sm text-gray-600 font-medium">Alumni Tersertifikasi</div>
                  <div className="text-xs text-gray-500 mt-1">Sejak 2008</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl hover-lift smooth-transition">
                  <div className="text-2xl font-bold gradient-text mb-1">85%</div>
                  <div className="text-sm text-gray-600 font-medium">Job Placement Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Dalam 6 bulan</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced image section with floating elements */}
            <div className={`relative transition-all duration-1000 ease-out delay-300 ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="RADAR Education Center - Suasana Pembelajaran Interaktif" 
                  className="rounded-2xl shadow-xl w-full hover-lift smooth-transition"
                  loading="lazy"
                />
                
                {/* Floating achievement card */}
                <div className={`absolute -bottom-6 -left-6 bg-white text-teal-600 p-4 rounded-2xl shadow-xl hover-lift animate-float transition-all duration-800 ease-out delay-600 ${
                  storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto mb-1 text-teal-600" />
                    <div className="text-xl font-bold gradient-text">16+</div>
                    <div className="text-xs text-gray-700 font-medium">Tahun Pengalaman</div>
                    <div className="text-xs text-gray-500">Terpercaya</div>
                  </div>
                </div>

                {/* Floating rating card */}
                <div className={`absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg hover-lift transition-all duration-800 ease-out delay-800 ${
                  storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900 text-sm">4.8/5</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">500+ Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline - Mobile Responsive */}
      <section ref={timelineRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Milestone RADAR Education Center
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dari startup lokal hingga menjadi rujukan pendidikan IT terpercaya di Indonesia
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 timeline-line h-full rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center transition-all duration-1000 ease-out ${
                    timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover-lift smooth-transition">
                      <div className="flex items-center gap-3 mb-3">
                        {index % 2 === 0 ? (
                          <>
                            <div className="text-teal-600">{item.icon}</div>
                            <span className="text-teal-600 font-bold text-lg">{item.year}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-teal-600 font-bold text-lg">{item.year}</span>
                            <div className="text-teal-600">{item.icon}</div>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            {/* Mobile timeline line */}
            <div className="absolute left-6 top-0 w-0.5 bg-teal-600 h-full rounded-full"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-start transition-all duration-1000 ease-out ${
                    timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Mobile timeline dot */}
                  <div className="w-3 h-3 bg-teal-600 rounded-full border-2 border-white shadow-lg z-10 mt-2 flex-shrink-0"></div>
                  
                  {/* Mobile content */}
                  <div className="ml-6 flex-1">
                    <div className="bg-white p-4 rounded-lg shadow-md hover-lift smooth-transition">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-teal-600">{item.icon}</div>
                        <span className="text-teal-600 font-bold text-base">{item.year}</span>
                      </div>
                      <h3 className="font-bold text-base mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Keunggulan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Mengapa 1000+ Siswa Memilih RADAR?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Komitmen kami untuk memberikan pendidikan IT berkualitas tinggi dengan pendekatan yang terbukti efektif
            </p>
          </div>
          
          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                  valueItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Highlight badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-teal-100 text-teal-600 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 smooth-transition">
                  {value.highlight}
                </div>
                
                <div className="mb-6 group-hover:scale-110 smooth-transition">
                  {value.icon}
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-teal-600 smooth-transition">
                  {value.title}
                </h3>
                
                <div className="text-teal-600 font-medium text-sm mb-4">
                  {value.subtitle}
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Instructors Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Tim Pengajar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Instruktur Berpengalaman & Tersertifikasi
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Belajar langsung dari praktisi industri dengan pengalaman puluhan tahun dan sertifikasi internasional
            </p>
          </div>
          
          <div ref={instructorsRef} className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((instructor, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover-lift smooth-transition transition-all duration-1000 ease-out ${
                  instructorItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="aspect-[8/5] relative overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 glass-effect px-2 py-1 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-900">{instructor.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1 text-gray-900 group-hover:text-teal-600 smooth-transition">
                    {instructor.name}
                  </h3>
                  
                  <div className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-md mb-3 font-medium">
                    {instructor.title}
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    <strong>Spesialisasi:</strong> {instructor.specialization}
                  </p>
                  
                  <p className="text-sm text-teal-600 font-medium mb-3">
                    {instructor.experience}
                  </p>
                  
                  {/* Credentials */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-xs text-gray-900 mb-2">Sertifikasi & Kredensial:</h4>
                    <div className="space-y-1">
                      {instructor.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-2.5 h-2.5 text-green-500 flex-shrink-0" />
                          {cred}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic border-t pt-3">
                    "{instructor.achievements}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-1000 ease-out ${
              achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Pencapaian yang Membanggakan
            </h2>
            <p className={`text-xl opacity-90 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
              achievementsVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Angka-angka yang menunjukkan komitmen kami terhadap kualitas pendidikan IT
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 ease-out ${
                  achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-3 hover:scale-110 smooth-transition">
                  {achievement.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{achievement.label}</h3>
                <p className="text-sm opacity-80">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact CTA */}
      <section ref={ctaRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Siap Memulai Perjalanan IT Anda Bersama Kami?
              </h2>
              
              <p className={`text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Bergabunglah dengan 1000+ alumni yang telah mempercayai RADAR Education Center 
                untuk mengembangkan karir mereka di bidang teknologi informasi.
              </p>
              
              {/* Contact info cards */}
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 transition-all duration-1000 ease-out delay-400 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <div className="glass-effect text-gray-900 p-4 sm:p-6 rounded-xl hover-lift smooth-transition">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Telepon & WhatsApp</h3>
                  <p className="text-xs sm:text-sm">0857-8276-3529</p>
                  <p className="text-xs text-gray-500 mt-1">Respon cepat via WA</p>
                </div>
                
                <div className="glass-effect text-gray-900 p-4 sm:p-6 rounded-xl hover-lift smooth-transition">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Resmi</h3>
                  <p className="text-xs sm:text-sm">asep@radarteknologikomputer.id</p>
                  <p className="text-xs text-gray-500 mt-1">Info lengkap via email</p>
                </div>
                
                <div className="glass-effect text-gray-900 p-4 sm:p-6 rounded-xl hover-lift smooth-transition">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Lokasi Kursus</h3>
                  <p className="text-xs sm:text-sm">Tangerang, Banten</p>
                  <p className="text-xs text-gray-500 mt-1">Mudah dijangkau</p>
                </div>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-600 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <a 
                  href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition shadow-lg btn-glow"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Gratis
                </a>
                <Link 
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 hover:scale-105 smooth-transition"
                >
                  Lihat Program Kursus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedAbout;