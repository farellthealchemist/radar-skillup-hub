import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Clock, 
  BookOpen, 
  Target, 
  Shield,
  Star,
  Rocket,
  TrendingUp,
  Building,
  PhoneCall,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const useHeaderAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { isLoaded };
};

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

const OptimizedAbout = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation();
  const { ref: valuesRef, visibleItems: valueItems } = useStaggeredAnimation(6, 120, 250);
  const { ref: instructorsRef, visibleItems: instructorItems } = useStaggeredAnimation(2, 200, 250);
  const { ref: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  // Enhanced company values with red theme
  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,  
      title: "Untuk Semua Kalangan",
      subtitle: "SD - Perguruan Tinggi",
      description: "Program pembelajaran komprehensif untuk semua tingkatan pendidikan, dari siswa SD hingga mahasiswa perguruan tinggi",
      highlight: "All Ages Welcome"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Sertifikat Terakreditasi", 
      subtitle: "Industry Recognition",
      description: "Sertifikat resmi yang diakui industri dan institusi pendidikan, meningkatkan kredibilitas profesional Anda",
      highlight: "Certified Programs"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Jadwal Fleksibel",
      subtitle: "Sesuai Kebutuhan Anda",
      description: "Pembelajaran adaptif dengan jadwal pagi, siang, dan malam. Akses materi 24/7 melalui platform digital",
      highlight: "24/7 Access"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Kurikulum Terkini",
      subtitle: "Industry-Aligned",
      description: "Materi pembelajaran yang selalu diperbarui mengikuti perkembangan teknologi dan kebutuhan pasar kerja",
      highlight: "Updated Monthly"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Praktek Intensif",
      subtitle: "70% Hands-On",
      description: "Fokus pada penerapan praktis dengan rasio 70% praktek dan 30% teori untuk hasil pembelajaran optimal",
      highlight: "Project-Based"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
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
      title: "Berdirinya RADAR",
      description: "Dimulai sebagai pusat pelatihan komputer lokal dengan visi menjangkau semua kalangan",
      icon: <Rocket className="w-5 h-5" />
    },
    {
      year: "2012",
      title: "Ekspansi Program",
      description: "Menambahkan program programming dan networking untuk memenuhi kebutuhan industri",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      year: "2016",
      title: "Sertifikasi Nasional",
      description: "Mendapatkan akreditasi resmi dan sertifikasi dari lembaga pendidikan nasional",
      icon: <Award className="w-5 h-5" />
    },
    {
      year: "2024",
      title: "1000+ Alumni Sukses",
      description: "Telah mencetak lebih dari 1000 lulusan yang berkarir di berbagai perusahaan teknologi",
      icon: <Users className="w-5 h-5" />
    }
  ];

  // Instructors
  const instructors = [
    {
      name: "Asep Surahmat M.Kom",
      title: "Lead Instructor & Founder",
      specialization: "Programming, Database, Web Development",
      experience: "16+ tahun pengalaman mengajar dan mengembangkan kurikulum IT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face",
      credentials: [
        "M.Kom - Master Komputer",
        "Certified Java Programmer",
        "Database Administrator Professional"
      ],
      rating: 4.9,
      students: "800+"
    },
    {
      name: "Rizqi Darmawan",
      title: "Senior IT Instructor",
      specialization: "Networking, Cybersecurity, System Administration",
      experience: "10+ tahun di industri IT dan infrastruktur jaringan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop&crop=face",
      credentials: [
        "CCNA Certified",
        "CompTIA Network+",
        "Certified Ethical Hacker (CEH)"
      ],
      rating: 4.8,
      students: "500+"
    }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Optimized Styles with Red Theme */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, hsl(var(--education-primary)), hsl(var(--education-primary-dark)));
        }
        .gradient-text {
          background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--education-primary-dark)));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .timeline-line {
          background: linear-gradient(180deg, 
            transparent 0%, 
            hsl(var(--primary)) 10%, 
            hsl(var(--primary)) 90%, 
            transparent 100%);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
          box-shadow: 0 0 20px hsl(var(--primary) / 0.4);
        }
      `}</style>

      {/* Enhanced Company Story with red theme */}
      <section ref={storyRef} className="py-24 mt-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <span className="inline-block mb-4 px-4 py-2 bg-education-gray-light text-primary rounded-full text-sm font-medium">
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
                  Dengan pendekatan pembelajaran yang <strong className="text-primary">70% praktek</strong> dan 
                  <strong className="text-primary"> 30% teori</strong>, kami memastikan setiap siswa tidak hanya 
                  memahami konsep, tetapi juga mampu mengimplementasikan skill dalam dunia kerja nyata.
                </p>
                
                <p>
                  Tim instruktur kami terdiri dari praktisi industri dengan pengalaman puluhan tahun, 
                  yang selalu mengupdate kurikulum mengikuti perkembangan teknologi terkini.
                </p>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 ease-out delay-300 ${
              storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover-lift smooth-transition">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" 
                  alt="RADAR Education Center"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 hero-gradient opacity-20"></div>
                
                {/* Floating achievement card */}
                <div className={`absolute -bottom-6 -left-6 bg-white text-primary p-4 rounded-2xl shadow-xl hover-lift animate-float transition-all duration-800 ease-out delay-600 ${
                  storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto mb-1 text-primary" />
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
                  <div className="text-xs text-gray-500">1000+ Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-2 bg-education-gray-light text-primary rounded-full text-sm font-medium">
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
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover-lift smooth-transition">
                      <div className="flex items-center gap-3 mb-3">
                        {index % 2 === 0 ? (
                          <>
                            <div className="text-primary">{item.icon}</div>
                            <span className="text-primary font-bold text-lg">{item.year}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-primary font-bold text-lg">{item.year}</span>
                            <div className="text-primary">{item.icon}</div>
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
            <div className="absolute left-6 top-0 w-0.5 bg-primary h-full rounded-full"></div>
            
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
                  <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg z-10 mt-2 flex-shrink-0"></div>
                  
                  {/* Mobile content */}
                  <div className="ml-6 flex-1">
                    <div className="bg-white p-4 rounded-lg shadow-md hover-lift smooth-transition">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-primary">{item.icon}</div>
                        <span className="text-primary font-bold text-base">{item.year}</span>
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
            <span className="inline-block mb-4 px-4 py-2 bg-education-gray-light text-primary rounded-full text-sm font-medium">
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
                className={`group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                  valueItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Highlight badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 smooth-transition">
                  {value.highlight}
                </div>
                
                <div className="mb-6 group-hover:scale-110 smooth-transition">
                  {value.icon}
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-primary smooth-transition">
                  {value.title}
                </h3>
                
                <div className="text-primary font-medium text-sm mb-4">
                  {value.subtitle}
                </div>
                
                <p className="text-gray-600 leading-relaxed">
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
            <span className="inline-block mb-4 px-4 py-2 bg-education-gray-light text-primary rounded-full text-sm font-medium">
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
                  <h3 className="font-bold text-xl mb-1 text-gray-900 group-hover:text-primary smooth-transition">
                    {instructor.name}
                  </h3>
                  
                  <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-md mb-3 font-medium">
                    {instructor.title}
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    <strong>Spesialisasi:</strong> {instructor.specialization}
                  </p>
                  
                  <p className="text-sm text-primary font-medium mb-3">
                    {instructor.experience}
                  </p>
                  
                  {/* Credentials */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-xs text-gray-900 mb-2">Sertifikasi & Kredensial:</h4>
                    <ul className="space-y-1">
                      {instructor.credentials.map((cred, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <Award className="w-3 h-3 text-primary flex-shrink-0" />
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{instructor.students} Siswa</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-900">{instructor.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact CTA */}
      <section ref={ctaRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-gradient rounded-3xl p-12 text-white text-center relative overflow-hidden">
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
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Telepon & WhatsApp</h3>
                  <p className="text-xs sm:text-sm">0857-8276-3529</p>
                  <p className="text-xs text-gray-500 mt-1">Respon cepat via WA</p>
                </div>
                
                <div className="glass-effect text-gray-900 p-4 sm:p-6 rounded-xl hover-lift smooth-transition">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Resmi</h3>
                  <p className="text-xs sm:text-sm">asep@radarteknologikomputer.id</p>
                  <p className="text-xs text-gray-500 mt-1">Info lengkap via email</p>
                </div>
                
                <div className="glass-effect text-gray-900 p-4 sm:p-6 rounded-xl hover-lift smooth-transition">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Lokasi Kursus</h3>
                  <p className="text-xs sm:text-sm">Tangerang, Banten</p>
                  <p className="text-xs text-gray-500 mt-1">Mudah dijangkau</p>
                </div>
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-600 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition shadow-lg btn-glow"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Hubungi Kami
                </Link>
                <Link 
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:scale-105 smooth-transition"
                >
                  Daftar Sekarang
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
