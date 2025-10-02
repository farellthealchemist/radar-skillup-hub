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
  ArrowRight,
  Building
} from "lucide-react";

// Consistent Animation Hooks
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

const useStaggeredAnimation = (itemCount, staggerDelay = 100, initialDelay = 200) => {
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

const OptimizedContact = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contactInfoRef, visibleItems: infoItems } = useStaggeredAnimation(4, 120, 250);
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
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-teal-600" />,
      title: "Alamat Lengkap",
      details: [
        "Jl. Pinang-Kunciran No.114, RT.003/RW.005",
        "Kunciran, Kec. Pinang",
        "Kota Tangerang, Banten 15144"
      ],
      action: "Buka Maps"
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-600" />,
      title: "Telepon & WhatsApp",
      details: [
        "0857-8276-3529",
        "Tersedia layanan WhatsApp",
        "Respon cepat dalam 5 menit"
      ],
      action: "Hubungi Sekarang"
    },
    {
      icon: <Mail className="w-6 h-6 text-teal-600" />,
      title: "Email Resmi",
      details: [
        "asep@radarteknologikomputer.id",
        "info@radarteknologikomputer.id",
        "Respon dalam 24 jam"
      ],
      action: "Kirim Email"
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 10:00 - 20:00",
        "Sabtu: 10:00 - 16:00", 
        "Minggu: Tutup"
      ],
      action: "Jadwal Kunjungan"
    }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Consistent Styles */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
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
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-xl z-50 max-w-xs sm:max-w-sm">
          <div className="flex items-start gap-2 sm:gap-3">
            <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1 text-sm sm:text-base">Pesan Berhasil Terkirim!</div>
              <div className="text-xs sm:text-sm opacity-90">Tim kami akan segera merespons dalam 24 jam. Terima kasih!</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form & Info */}
      <section ref={contactRef} className="py-20 mt-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ease-out ${
              contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl border p-6 sm:p-8 hover-lift smooth-transition">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Send className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text">Kirim Pesan</h2>
                    <p className="text-gray-600 text-sm">Kami akan merespons dalam 24 jam</p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nama Lengkap *</label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nomor HP</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Program Kursus</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                      >
                        <option value="">Pilih Program</option>
                        <option value="programming">Programming Fundamentals</option>
                        <option value="scratch">Scratch Programming</option>
                        <option value="office">Microsoft Office</option>
                        <option value="networking">Network Administration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Pesan *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none h-24 sm:h-32 smooth-transition"
                      required
                    />
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full hero-gradient text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                        <span className="text-sm sm:text-base">Mengirim Pesan...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">Kirim Pesan Sekarang</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 ease-out delay-300 ${
              contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">Informasi Kontak</h2>
                <div ref={contactInfoRef} className="space-y-3 sm:space-y-4">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-xl shadow-md border p-4 sm:p-6 hover:shadow-lg hover-lift smooth-transition transition-all duration-800 ease-out ${
                        infoItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-900">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-1">
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
              <div className="bg-white rounded-xl shadow-md border p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 gradient-text">Kontak Cepat</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/6285782763529" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 border-green-200 hover:bg-green-50 hover:border-green-400 smooth-transition group"
                  >
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition flex-shrink-0">
                      <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-gray-900">WhatsApp</div>
                      <div className="text-xs sm:text-sm text-gray-600">Respon cepat dalam 5 menit</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Online</span>
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" />
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+6285782763529" 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-400 smooth-transition group"
                  >
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition flex-shrink-0">
                      <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-gray-900">Telepon Langsung</div>
                      <div className="text-xs sm:text-sm text-gray-600">0857-8276-3529</div>
                    </div>
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-teal-600 flex-shrink-0" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-md border p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 gradient-text">Ikuti Media Sosial Kami</h3>
                <div className="flex gap-3 sm:gap-4">
                  <a href="https://www.instagram.com/radareducenter" target="_blank" rel="noopener noreferrer" className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white hover:scale-110 smooth-transition">
                    <Instagram className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                  <a href="https://facebook.com/radareducenter" target="_blank" rel="noopener noreferrer" className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 smooth-transition">
                    <Facebook className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                  <a href="https://youtube.com/@radareducenter" target="_blank" rel="noopener noreferrer" className="w-10 sm:w-12 h-10 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center text-white hover:scale-110 smooth-transition">
                    <Youtube className="w-5 sm:w-6 h-5 sm:h-6" />
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">Dapatkan tips IT dan update program terbaru</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
              Lokasi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Kunjungi Kantor Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Datang langsung ke kantor kami di Tangerang untuk konsultasi tatap muka dan melihat fasilitas pembelajaran
            </p>
          </div>
          
          <div className={`bg-white rounded-2xl shadow-xl border overflow-hidden hover-lift smooth-transition transition-all duration-1000 ease-out delay-300 ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="font-bold text-2xl mb-3 gradient-text">RADAR Education Center</h3>
                <div className="text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
                  <p className="font-medium">Jl. Pinang-Kunciran No.114, RT.003/RW.005</p>
                  <p>Kunciran, Kec. Pinang</p>
                  <p>Kota Tangerang, Banten 15144</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    className="inline-flex items-center justify-center px-6 py-3 hero-gradient text-white rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow"
                    onClick={() => window.open('https://maps.app.goo.gl/iKmXrw9u4ecF129T8', '_blank')}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Buka di Google Maps
                  </button>
                  <button 
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-600 hover:text-white hover:scale-105 smooth-transition"
                    onClick={() => window.open('https://wa.me/6285782763529?text=Halo, saya ingin berkunjung ke kantor RADAR Education Center. Bisa info jam operasional?', '_blank')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Konfirmasi Kunjungan
                  </button>
                </div>
              </div>
            </div>
            
            {/* Office Hours & Directions */}
            <div className="p-6 bg-white border-t">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    Jam Operasional
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Senin - Jumat</span>
                      <span className="font-medium">10:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu</span>
                      <span className="font-medium">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span className="font-medium text-teal-600">Tutup</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-600" />
                    Petunjuk Arah
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• 5 menit dari Stasiun Tangerang</p>
                    <p>• Dekat dengan Mall Tangerang City</p>
                    <p>• Akses mudah transportasi umum</p>
                    <p>• Parkir tersedia untuk motor & mobil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedContact;