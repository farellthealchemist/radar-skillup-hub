import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Users,
  Shield,
  Target,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Animation Hooks from Courses page
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

// Registration validation schema
const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Nama harus minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  email: z.string().trim().email("Format email tidak valid").max(255, "Email maksimal 255 karakter"),
  phone: z.string().trim().regex(/^08\d{8,12}$/, "Format nomor HP tidak valid (contoh: 08123456789)"),
  course: z.string().min(1, "Silakan pilih kursus"),
  schedule: z.string().optional(),
  experience: z.string().optional(),
  message: z.string().max(1000, "Pesan maksimal 1000 karakter").optional()
});

const EnhancedRegister = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    schedule: "",
    experience: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ delay: 200 });
  const { ref: benefitsRef, visibleItems: benefitItems } = useStaggeredAnimation(4, 100, 200);
  const { ref: guaranteeRef, visibleItems: guaranteeItems } = useStaggeredAnimation(3, 120, 250);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Autentikasi Diperlukan",
        description: "Silakan login terlebih dahulu untuk mendaftar kursus",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    // Validate form data
    try {
      registrationSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validasi Gagal",
          description: error.errors[0].message,
          variant: "destructive"
        });
        return;
      }
    }
    
    if (!acceptTerms) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Anda harus menyetujui syarat & ketentuan",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Sesi Berakhir",
          description: "Sesi Anda telah berakhir. Silakan login kembali.",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }

      const { error } = await (supabase as any)
        .from('registrations')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          schedule_preference: formData.schedule,
          previous_experience: formData.experience,
          expectations: formData.message,
          status: 'pending'
        });

      if (error) throw error;

      setShowSuccess(true);
      setFormData({ 
        fullName: "",
        email: "", 
        phone: "", 
        course: "", 
        schedule: "", 
        experience: "", 
        message: "" 
      });
      setAcceptTerms(false);
      
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const courses = [
    { 
      value: "programming", 
      label: "Programming Fundamentals", 
      duration: "3-6 Bulan", 
      price: "Rp 2.500.000",
      originalPrice: "Rp 3.000.000",
      discount: "17%",
      category: "Programming",
      popular: true
    },
    { 
      value: "scratch", 
      label: "Scratch Visual Programming", 
      duration: "2-3 Bulan", 
      price: "Rp 750.000",
      originalPrice: "Rp 900.000",
      discount: "17%",
      category: "Programming",
      popular: false
    },
    { 
      value: "office", 
      label: "Microsoft Office Mastery", 
      duration: "2-4 Bulan", 
      price: "Rp 1.200.000",
      originalPrice: "Rp 1.500.000",
      discount: "20%",
      category: "Office",
      popular: true
    },
    { 
      value: "networking", 
      label: "Network Administration", 
      duration: "4-6 Bulan", 
      price: "Rp 3.500.000",
      originalPrice: "Rp 4.200.000",
      discount: "17%",
      category: "Networking",
      popular: false
    }
  ];

  const schedules = [
    { value: "weekday-morning", label: "Senin-Jumat (09:00-12:00)", icon: "🌅" },
    { value: "weekday-afternoon", label: "Senin-Jumat (13:00-16:00)", icon: "☀️" },
    { value: "weekday-evening", label: "Senin-Jumat (17:00-20:00)", icon: "🌆" },
    { value: "weekend", label: "Sabtu-Minggu (10:00-16:00)", icon: "📅" }
  ];

  const benefits = [
    { 
      icon: <Award className="w-6 h-6" />, 
      text: "Sertifikat Resmi",
      desc: "Tersertifikasi & diakui industri"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      text: "Instruktur Expert",
      desc: "Pengalaman 10+ tahun"
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      text: "Jadwal Fleksibel",
      desc: "Pilihan waktu beragam"
    },
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      text: "Modul Lengkap",
      desc: "Materi terstruktur & praktis"
    }
  ];

  const guaranteeFeatures = [
    { 
      icon: <Shield className="w-8 h-8 text-red-600" />, 
      title: "Garansi Mengulang", 
      description: "Bisa mengulang kelas GRATIS jika belum menguasai materi"
    },
    { 
      icon: <Target className="w-8 h-8 text-red-600" />, 
      title: "Job Assistance", 
      description: "Bantuan penempatan kerja setelah lulus program"
    },
    { 
      icon: <TrendingUp className="w-8 h-8 text-red-600" />, 
      title: "Kelas Kecil", 
      description: "Maksimal 12 siswa untuk perhatian personal optimal"
    }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
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
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 max-w-md animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Pendaftaran Berhasil!</div>
              <div className="text-sm opacity-90">Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pembayaran dan jadwal. Terima kasih!</div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Hero Section */}
      <section ref={heroRef} className="py-12 mt-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Formulir <span className="gradient-text">Pendaftaran Kursus</span>
            </h1>
            <p className="text-gray-600">
              Lengkapi data di bawah ini untuk mendaftar
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={formRef}
            className={`bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 transition-all duration-1000 ease-out ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b">
                  <User className="w-5 h-5 text-red-600" />
                  Data Pribadi
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Nama Lengkap</label>
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent smooth-transition"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent smooth-transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Nomor HP / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent smooth-transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  Pilihan Kursus
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Program Kursus</label>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <label 
                        key={course.value}
                        className={`block p-4 border-2 rounded-lg cursor-pointer smooth-transition hover:border-red-500 hover:bg-red-50 ${
                          formData.course === course.value ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="course"
                            value={course.value}
                            checked={formData.course === course.value}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-gray-900">{course.label}</span>
                                {course.popular && (
                                  <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded">
                                    Popular
                                  </span>
                                )}
                                {course.discount && (
                                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                                    Hemat {course.discount}
                                  </span>
                                )}
                              </div>
                              <span className={`text-xs px-2 py-1 rounded ${
                                course.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
                                course.category === 'Office' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {course.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-red-600">{course.price}</span>
                              {course.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">{course.originalPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Jadwal Kursus</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {schedules.map((schedule) => (
                      <label 
                        key={schedule.value}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer smooth-transition hover:border-red-500 hover:bg-red-50 ${
                          formData.schedule === schedule.value ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="schedule"
                          value={schedule.value}
                          checked={formData.schedule === schedule.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <div className="ml-3 flex items-center gap-2">
                          <span className="text-lg">{schedule.icon}</span>
                          <span className="text-sm font-medium">{schedule.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Pengalaman Sebelumnya</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent smooth-transition"
                  >
                    <option value="">Pilih Level Pengalaman</option>
                    <option value="beginner">Pemula - Belum ada pengalaman</option>
                    <option value="intermediate">Menengah - Pernah belajar dasar</option>
                    <option value="advanced">Lanjutan - Sudah berpengalaman</option>
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900">Informasi Tambahan</h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Catatan / Pertanyaan (Opsional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pertanyaan atau catatan khusus di sini..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-32 smooth-transition"
                  />
                </div>
              </div>

              {/* Submit Button - RESPONSIVE VERSION */}
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Checkbox 
                    id="register-terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
                  />
                  <label
                    htmlFor="register-terms"
                    className="text-xs sm:text-sm text-gray-600 leading-snug sm:leading-relaxed cursor-pointer flex-1"
                  >
                    Saya menyetujui{" "}
                    <Link to="#" className="text-red-600 hover:text-red-700 font-medium transition-colors">
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link to="#" className="text-red-600 hover:text-red-700 font-medium transition-colors">
                      Kebijakan Privasi
                    </Link>
                  </label>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="w-full hero-gradient text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                      <span className="text-xs sm:text-base">Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">Daftar & Lanjutkan ke Pembayaran</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default EnhancedRegister;