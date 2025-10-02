import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Users
} from "lucide-react";

const Register = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
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
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const courses = [
    { value: "programming", label: "Programming Fundamentals", duration: "3 Bulan", price: "Rp 3.500.000" },
    { value: "scratch", label: "Scratch Programming untuk Anak", duration: "2 Bulan", price: "Rp 2.000.000" },
    { value: "office", label: "Microsoft Office Professional", duration: "1.5 Bulan", price: "Rp 1.500.000" },
    { value: "networking", label: "Network Administration", duration: "3 Bulan", price: "Rp 3.800.000" }
  ];

  const schedules = [
    { value: "weekday-morning", label: "Senin-Jumat (09:00-12:00)" },
    { value: "weekday-afternoon", label: "Senin-Jumat (13:00-16:00)" },
    { value: "weekday-evening", label: "Senin-Jumat (17:00-20:00)" },
    { value: "weekend", label: "Sabtu-Minggu (10:00-16:00)" }
  ];

  const benefits = [
    { icon: <Award className="w-5 h-5" />, text: "Sertifikat Resmi" },
    { icon: <Users className="w-5 h-5" />, text: "Instruktur Berpengalaman" },
    { icon: <Clock className="w-5 h-5" />, text: "Jadwal Fleksibel" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Modul Lengkap" }
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden bg-gray-50">
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

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Daftar Kursus Sekarang
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-6 max-w-2xl mx-auto">
              Mulai perjalanan belajar Anda bersama instruktur profesional dan kurikulum terstruktur
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  {benefit.icon}
                  <span className="text-sm md:text-base">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Formulir Pendaftaran</h2>
              <p className="text-gray-600">Lengkapi data di bawah ini untuk mendaftar kursus</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  Data Pribadi
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Nama Lengkap *</label>
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Nomor HP / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Pilihan Kursus
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Program Kursus *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                    required
                  >
                    <option value="">Pilih Program Kursus</option>
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label} - {course.duration} ({course.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Jadwal Kursus *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                      required
                    >
                      <option value="">Pilih Jadwal</option>
                      {schedules.map((schedule) => (
                        <option key={schedule.value} value={schedule.value}>
                          {schedule.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Pengalaman Sebelumnya</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none h-32 smooth-transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <button 
                  type="submit"
                  className="w-full hero-gradient text-white py-4 rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Mengirim Pendaftaran...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Daftar & Lanjutkan ke Pembayaran</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-sm text-gray-600 mt-4">
                  Dengan mendaftar, Anda menyetujui{" "}
                  <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium">
                    Syarat & Ketentuan
                  </Link>{" "}
                  kami
                </p>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Butuh Bantuan?</h3>
            <p className="text-gray-700 mb-4">
              Tim kami siap membantu Anda dalam proses pendaftaran. Hubungi kami melalui:
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://wa.me/6285782763529"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 smooth-transition"
              >
                <Phone className="w-4 h-4" />
                WhatsApp: 0857-8276-3529
              </a>
              <a 
                href="mailto:info@radarteknologikomputer.id"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 smooth-transition"
              >
                <Mail className="w-4 h-4" />
                Email Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
