import React, { useState, useEffect, useRef } from 'react';
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
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Zap,
  TrendingUp,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

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

const OptimizedAbout = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-80px" });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: valuesRef, visibleItems: valueItems } = useStaggeredAnimation(6, 100, 250);
  const { ref: instructorsRef, visibleItems: instructorItems } = useStaggeredAnimation(2, 200, 300);
  const { ref: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  // Enhanced company values with more comprehensive coverage
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

  const achievements = [
    { number: "1000+", label: "Alumni Tersertifikasi", description: "Lulusan yang telah berhasil menyelesaikan program" },
    { number: "15+", label: "Tahun Pengalaman", description: "Melayani pendidikan IT sejak tahun 2008" },
    { number: "85%", label: "Job Placement Rate", description: "Alumni yang berhasil mendapat pekerjaan dalam 6 bulan" },
    { number: "4.8/5", label: "Rating Kepuasan", description: "Berdasarkan feedback dari 500+ alumni" }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Optimized Styles */}
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>


      {/* Enhanced Company Story with better visual hierarchy */}
      <section ref={storyRef} className="py-16 mt-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-8 items-center transition-opacity duration-1000 ease-out ${
            storyVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            {/* Text Content */}
            <div className="md:order-2">
              <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                Tentang Kami
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
                Transformasi Pendidikan IT Sejak 2008
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                RADAR hadir sebagai solusi pendidikan IT inovatif, membekali siswa dengan keterampilan praktis dan relevan untuk sukses di era digital.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dari kursus komputer dasar hingga program sertifikasi profesional, kami berkomitmen untuk memberikan pendidikan berkualitas yang dapat diakses oleh semua kalangan.
              </p>
            </div>

            {/* Image */}
            <div className="md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47a04ca0052d?w=800&h=500&fit=crop" 
                alt="Company Story" 
                className="rounded-2xl shadow-lg hover-lift" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Nilai-Nilai Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Fondasi yang Memandu Setiap Langkah
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kami percaya bahwa pendidikan IT harus inklusif, relevan, dan berorientasi pada hasil. Nilai-nilai ini tercermin dalam setiap aspek program kami.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                  valueItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-teal-600 smooth-transition">
                  {value.title}
                </h3>
                <h4 className="text-sm text-gray-500 mb-2">{value.subtitle}</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {value.description}
                </p>
                <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 text-xs font-medium rounded-full">
                  {value.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Evolusi RADAR dari Masa ke Masa
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Sejak 2008, kami terus beradaptasi dan berinovasi untuk memberikan pendidikan IT terbaik bagi masyarakat Indonesia.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full timeline-line w-0.5"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center">
                  {/* Dot */}
                  <div className="w-3 h-3 bg-gray-300 rounded-full z-10"></div>

                  {/* Content */}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold gradient-text">{item.year} - {item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Instructors */}
      <section ref={instructorsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Tim Pengajar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Para Ahli yang Membimbing Anda
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kami memiliki tim instruktur berpengalaman dan berdedikasi yang siap membantu Anda mencapai tujuan belajar Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover-lift smooth-transition transition-all duration-800 ease-out ${
                  instructorItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-1/3">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold gradient-text mb-2">{instructor.name}</h3>
                    <h4 className="text-gray-500 mb-3">{instructor.title}</h4>
                    <p className="text-gray-600 mb-4">{instructor.specialization}</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {instructor.credentials.map((credential, i) => (
                        <li key={i}>{credential}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Pencapaian Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Angka yang Membuktikan Kualitas
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Sejak awal, kami telah membantu ribuan siswa mencapai impian mereka di bidang IT. Berikut adalah beberapa pencapaian yang membanggakan:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`text-center transition-opacity duration-1000 ease-out ${
                  achievementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="text-5xl font-bold gradient-text animate-float">{achievement.number}</div>
                <div className="text-lg font-medium text-gray-700 mb-2">{achievement.label}</div>
                <div className="text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Siap Memulai Karir Impian Anda di Bidang IT?
              </h2>
              
              <p className={`text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Konsultasi GRATIS dengan эксперт kami untuk menemukan program yang tepat dan sesuai dengan tujuan karir Anda.
              </p>
              
              {/* Contact options */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out delay-400 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <a href="https://wa.me/6285782763529" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition btn-glow">
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Via WhatsApp
                </a>
                <a href="/brosur" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 hover:scale-105 smooth-transition">
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

export default OptimizedAbout;
