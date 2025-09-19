import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  ChevronUp
} from "lucide-react";

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

// FAQ Component
const FAQ = ({ items }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg border hover:shadow-md transition-all duration-300">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{item.question}</span>
            {openItems.includes(index) ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openItems.includes(index) && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Contact = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-100px" });
  const { ref: contactInfoRef, visibleItems: infoItems } = useStaggeredAnimation(4, 150, 200);
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Alamat",
      details: [
        "Jl. Pinang-Kunciran No.114, RT.003/RW.005",
        "Kunciran, Kec. Pinang",
        "Kota Tangerang, Banten 15144"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-red-600" />,
      title: "Telepon",
      details: [
        "0857-8276-3529",
        "WhatsApp tersedia"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-red-600" />,
      title: "Email",
      details: [
        "asep@radarteknologikomputer.id",
        "info@radarteknologikomputer.id"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-red-600" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 10:00 - 20:00",
        "Sabtu: 10:00 - 16:00", 
        "Minggu: Tutup"
      ]
    }
  ];

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
      question: "Apakah setelah mengikuti kursus ini bisa dapat pekerjaan di bidang IT?",
      answer: "Program kami dirancang untuk mempersiapkan siswa dengan skill yang dibutuhkan industri IT. Banyak alumni kami yang berhasil berkarir di bidang IT setelah menyelesaikan program."
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
        .pulse-border {
          position: relative;
        }
        .pulse-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          padding: 2px;
          background: linear-gradient(45deg, #ef4444, #dc2626);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pulse-border:hover::before {
          opacity: 0.3;
          animation: pulse 2s infinite;
        }
        .animate-pulse-soft {
          animation: pulseSoft 3s infinite;
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <div>
            <div className="font-semibold">Pesan Terkirim!</div>
            <div className="text-sm opacity-90">Tim kami akan segera merespons.</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-800 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Hubungi Kami
          </h1>
          <p className={`text-xl max-w-3xl mx-auto opacity-90 transition-all duration-800 ease-out delay-300 ${
            heroVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Punya pertanyaan tentang program kursus? Tim kami siap membantu Anda 
            menemukan program yang tepat untuk mengembangkan skill IT Anda.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={contactRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ease-out ${
              contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <div className="bg-white rounded-lg border shadow-card-hover hover-lift pulse-border smooth-transition h-fit p-6">
                <h2 className="text-2xl font-bold mb-4 gradient-text-animated">Kirim Pesan</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Nama Lengkap *</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Nomor HP</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Program Kursus</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Pilih Program</option>
                        <option value="programming">Programming</option>
                        <option value="scratch">Scratch</option>
                        <option value="office">Microsoft Office</option>
                        <option value="networking">Networking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Pesan *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-24"
                      required
                    />
                  </div>

                  <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="w-full hero-gradient text-white py-3 rounded-md font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Mengirim...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Pesan
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div>
                <h2 className="text-2xl font-bold mb-6 gradient-text-animated">Informasi Kontak</h2>
                <div ref={contactInfoRef} className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-lg border p-4 hover:shadow-card-hover hover-lift pulse-border smooth-transition transition-all duration-800 ease-out ${
                        infoItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover-scale animate-pulse-soft">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 hover:text-red-600 smooth-transition">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border p-4 shadow-card">
                <h3 className="font-semibold text-lg mb-4">Kontak Cepat</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/6285782763529" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-green-50 hover:border-green-200 smooth-transition"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-gray-600">Respon cepat dalam 5 menit</div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                  </a>
                  
                  <a 
                    href="tel:+6285782763529" 
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-red-50 hover:border-red-200 smooth-transition"
                  >
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium">Telepon Langsung</div>
                      <div className="text-sm text-gray-600">0857-8276-3529</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg border p-4 shadow-card">
                <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white smooth-transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white smooth-transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white smooth-transition">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-800 ease-out ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-3xl font-bold mb-4 gradient-text-animated">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600 text-lg">
              Temukan jawaban untuk pertanyaan umum seputar program kursus kami
            </p>
          </div>
          
          <div className={`transition-all duration-800 ease-out delay-300 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-800 ease-out ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-3xl font-bold mb-4 gradient-text-animated">Lokasi Kami</h2>
            <p className="text-gray-600">
              Kunjungi langsung kantor kami di Tangerang untuk konsultasi tatap muka
            </p>
          </div>
          <div className={`bg-white rounded-lg border overflow-hidden hover-lift shadow-card hover:shadow-card-hover smooth-transition transition-all duration-800 ease-out delay-300 ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-red-600 mx-auto mb-4 hover-scale animate-pulse-soft" />
                <h3 className="font-semibold text-xl mb-3 hover:text-red-600 smooth-transition">RADAR Education Center</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Jl. Pinang-Kunciran No.114, RT.003/RW.005<br />
                  Kunciran, Kec. Pinang<br />
                  Kota Tangerang, Banten 15144
                </p>
                <button 
                  className="px-6 py-3 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white smooth-transition btn-glow"
                  onClick={() => window.open('https://maps.app.goo.gl/iKmXrw9u4ecF129T8', '_blank')}
                >
                  Buka di Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;