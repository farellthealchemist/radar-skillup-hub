import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, BookOpen, Target, Clock } from "lucide-react";

// Custom hooks for animations
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

const useStaggeredAnimation = (itemCount, staggerDelay = 100, initialDelay = 0) => {
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

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-100px" });
  const { ref: valuesRef, visibleItems: valueItems } = useStaggeredAnimation(4, 180, 300);
  const { ref: instructorsRef, visibleItems: instructorItems } = useStaggeredAnimation(2, 200, 250);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  
  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,  
      title: "SD - PERGURUAN TINGGI",
      description: "Radar education center membuka pembelajaran dari pendidikan SD s/d Perguruan Tinggi"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "SERTIFIKAT", 
      description: "Sertifikat sering kali dianggap sebagai tambahan yang bernilai pada resume atau portofolio seseorang karena menunjukkan dedikasi, pencapaian, dan kompetensi yang dimiliki oleh pemilik sertifikat tersebut"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "BELAJAR FLEKSIBEL",
      description: "Pembelajaran Fleksibel yang memungkinkan akses materi kapan pun dimana pun melalui perangkat digital. Selain itu, ada juga pendekatan belajar mandiri yang memberikan ruang bagi seseorang untuk mengatur waktu belajar sesuai dengan kebutuhan dan tingkat pemahaman mereka"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "KURIKULUM TERKINI",
      description: "Menggunakan kurikulum yang selalu diperbarui sesuai dengan perkembangan zaman dan kebutuhan industri, memastikan siswa mendapatkan pengetahuan yang relevan dan aplikatif"
    }
  ];

  const instructors = [
    {
      name: "Asep Surahmat M.Kom",
      title: "Lead Instructor & Founder",
      specialization: "Programming, Database, System Analysis",
      experience: "15+ tahun pengalaman di industri IT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
    },
    {
      name: "Rizqi Darmawan",
      title: "Senior Instructor",
      specialization: "Networking, Security, Infrastructure",
      experience: "10+ tahun pengalaman networking",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      <style jsx>{`
        .hero-gradient {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        .gradient-text-animated {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        .smooth-transition {
          transition: all 0.3s ease;
        }
        .shadow-card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .shadow-card-hover:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Tentang RADAR Education Center
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            PT. Radar Teknologi Komputer Education Center telah menjadi pionir dalam pendidikan IT di Indonesia, 
            mengembangkan skill teknologi untuk semua kalangan dari tingkat dasar hingga mahir.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section ref={storyRef as any} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-3xl font-bold mb-6 gradient-text-animated">
                Media Meningkatkan Skill dalam Bidang IT
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Radar Education Center merupakan pusat pendidikan yang didedikasikan untuk memajukan 
                keterampilan dan pengetahuan Anda di bidang IT. Sebagai mitra dalam perjalanan pendidikan Anda, 
                Radar Education Center menawarkan pengalaman belajar yang inovatif dan berorientasi pada praktik, 
                membantu Anda mempersiapkan diri untuk tantangan yang terus berkembang di dunia IT.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Radar Education Center menawarkan beragam program pelatihan IT yang dirancang oleh para ahli industri. 
                Mulai dari pemrograman hingga keamanan informasi, program kami mencakup spektrum luas keterampilan 
                yang dibutuhkan dalam dunia kerja saat ini. Dengan fokus pada pendekatan praktis, Anda akan mengasah 
                keterampilan sehari-hari yang dapat diterapkan secara langsung dalam pekerjaan.
              </p>
              <div className={`grid grid-cols-2 gap-4 transition-all duration-800 ease-out delay-500 ${
                storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="text-center p-4 hover-scale smooth-transition">
                  <div className="text-3xl font-bold text-red-600 mb-2 gradient-text-animated">1000+</div>
                  <div className="text-sm text-gray-600">Siswa Terdidik</div>
                </div>
                <div className="text-center p-4 hover-scale smooth-transition">
                  <div className="text-3xl font-bold text-red-600 mb-2 gradient-text-animated">50+</div>
                  <div className="text-sm text-gray-600">Program Kursus</div>
                </div>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 ease-out delay-300 ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="RADAR Education Center Classroom" 
                  className="rounded-lg shadow-card-hover w-full hover-scale smooth-transition"
                />
                <div className={`absolute -bottom-6 -left-6 bg-white text-red-600 p-6 rounded-xl shadow-card hover-lift smooth-transition transition-all duration-800 ease-out delay-700 ${
                  storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1 gradient-text-animated">15+</div>
                    <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text-animated">Mengapa Memilih RADAR?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi kami dalam memberikan pendidikan IT terbaik
            </p>
          </div>
          <div ref={valuesRef as any} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`p-6 text-center bg-white rounded-lg border hover:shadow-card-hover hover-lift smooth-transition transition-all duration-800 ease-out ${
                  valueItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="flex justify-center mb-4 hover-scale smooth-transition">{value.icon}</div>
                <h3 className="font-semibold text-lg mb-3 smooth-transition">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text-animated">Tim Instruktur</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Instruktur berpengalaman dengan keahlian mendalam di bidang teknologi
            </p>
          </div>
          <div ref={instructorsRef as any} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((instructor, index) => (
              <div 
                key={index} 
                className={`overflow-hidden bg-white rounded-lg border hover:shadow-card-hover hover-lift smooth-transition transition-all duration-800 ease-out ${
                  instructorItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 smooth-transition"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 smooth-transition">{instructor.name}</h3>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded mb-3 hover-scale smooth-transition">{instructor.title}</span>
                  <p className="text-gray-600 mb-3 leading-relaxed">{instructor.specialization}</p>
                  <p className="text-sm text-red-600 font-medium hover:text-red-500 smooth-transition">{instructor.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section ref={ctaRef as any} className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-4">
          <h2 className={`text-3xl font-bold mb-4 transition-all duration-800 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Siap Meningkatkan Skill IT Anda?
          </h2>
          <p className={`text-xl opacity-90 mb-8 transition-all duration-800 ease-out delay-200 ${
            ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Bergabunglah dengan ribuan siswa yang telah mempercayai RADAR Education Center
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 ease-out delay-400 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition"
            >
              Hubungi Kami
            </a>
            <a 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:scale-105 smooth-transition"
            >
              Lihat Kursus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;