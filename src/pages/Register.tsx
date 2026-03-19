import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, BookOpen, Clock, Award, Users, Shield, Target, TrendingUp, CheckCircle, ArrowRight, Sparkles
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const useScrollAnimation = ({ delay = 0, threshold = 0.1, rootMargin = "0px" } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay); }, { threshold, rootMargin });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);
  return { ref, isVisible };
};

const useStaggeredAnimation = (itemCount: number, staggerDelay = 120, initialDelay = 200) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { for (let i = 0; i < itemCount; i++) { setTimeout(() => setVisibleItems(prev => [...prev, i]), initialDelay + i * staggerDelay); } }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [itemCount, staggerDelay, initialDelay]);
  return { ref, visibleItems };
};

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Nama harus minimal 2 karakter").max(100),
  email: z.string().trim().email("Format email tidak valid").max(255),
  phone: z.string().trim().regex(/^08\d{8,12}$/, "Format nomor HP tidak valid"),
  course: z.string().min(1, "Silakan pilih kursus"),
  schedule: z.string().optional(),
  experience: z.string().optional(),
  message: z.string().max(1000).optional()
});

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", course: "", schedule: "", experience: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ delay: 200 });
  const { ref: benefitsRef, visibleItems: benefitItems } = useStaggeredAnimation(4, 100, 200);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { registrationSchema.parse(formData); } catch (error) {
      if (error instanceof z.ZodError) { toast({ title: "Validasi Gagal", description: error.errors[0].message, variant: "destructive" }); return; }
    }
    if (!acceptTerms) { toast({ title: "Persetujuan Diperlukan", description: "Anda harus menyetujui syarat & ketentuan", variant: "destructive" }); return; }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", course: "", schedule: "", experience: "", message: "" });
      setAcceptTerms(false);
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const courses = [
    { value: "programming", label: "Programming Fundamentals", duration: "3-6 Bulan", price: "Rp 2.500.000", popular: true },
    { value: "scratch", label: "Scratch Visual Programming", duration: "2-3 Bulan", price: "Rp 750.000", popular: false },
    { value: "office", label: "Microsoft Office Mastery", duration: "2-4 Bulan", price: "Rp 1.200.000", popular: true },
    { value: "networking", label: "Network Administration", duration: "4-6 Bulan", price: "Rp 3.500.000", popular: false },
  ];

  const schedules = [
    { value: "weekday-morning", label: "Senin-Jumat (09:00-12:00)" },
    { value: "weekday-afternoon", label: "Senin-Jumat (13:00-16:00)" },
    { value: "weekday-evening", label: "Senin-Jumat (17:00-20:00)" },
    { value: "weekend", label: "Sabtu-Minggu (10:00-16:00)" },
  ];

  const benefits = [
    { icon: <Award className="w-6 h-6" />, text: "Sertifikat Resmi", desc: "Tersertifikasi & diakui industri" },
    { icon: <Users className="w-6 h-6" />, text: "Instruktur Expert", desc: "Pengalaman 10+ tahun" },
    { icon: <Clock className="w-6 h-6" />, text: "Jadwal Fleksibel", desc: "Pilihan waktu beragam" },
    { icon: <BookOpen className="w-6 h-6" />, text: "Modul Lengkap", desc: "Materi terstruktur & praktis" },
  ];

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
      `}</style>

      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div><div className="font-semibold mb-1">Pendaftaran Berhasil!</div><div className="text-sm opacity-90">Tim kami akan menghubungi Anda dalam 1x24 jam.</div></div>
          </div>
        </div>
      )}

      <section ref={heroRef} className="py-12 mt-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Formulir <span className="gradient-text">Pendaftaran Kursus</span></h1>
            <p className="text-gray-600">Lengkapi data di bawah ini untuk mendaftar</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={formRef} className={`bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 transition-all duration-1000 ease-out ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b"><User className="w-5 h-5 text-red-600" />Data Pribadi</h3>
                <div><label className="block text-sm font-semibold mb-2 text-gray-700">Nama Lengkap</label><input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Masukkan nama lengkap" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold mb-2 text-gray-700">Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required /></div>
                  <div><label className="block text-sm font-semibold mb-2 text-gray-700">Nomor HP / WhatsApp</label><input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="08xx-xxxx-xxxx" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required /></div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b"><BookOpen className="w-5 h-5 text-red-600" />Pilihan Kursus</h3>
                <div className="space-y-3">
                  {courses.map((c) => (
                    <label key={c.value} className={`block p-4 border-2 rounded-lg cursor-pointer smooth-transition hover:border-red-500 hover:bg-red-50 ${formData.course === c.value ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="course" value={c.value} checked={formData.course === c.value} onChange={handleChange} className="w-4 h-4 text-red-600" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900">{c.label}</span>
                            {c.popular && <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded">Popular</span>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{c.duration}</span>
                            <span className="font-bold text-red-600">{c.price}</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div><label className="block text-sm font-semibold mb-2 text-gray-700">Jadwal Preferensi</label>
                  <select name="schedule" value={formData.schedule} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Pilih Jadwal</option>
                    {schedules.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-semibold mb-2 text-gray-700">Pesan (opsional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Ada pertanyaan atau pesan khusus?" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-24" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} />
                <label htmlFor="terms" className="text-sm text-gray-600">Saya menyetujui <span className="text-red-600 font-medium">Syarat & Ketentuan</span></label>
              </div>

              <button type="submit" className="w-full hero-gradient text-white py-4 rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}{!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8 gradient-text">Yang Anda Dapatkan</h2>
          <div ref={benefitsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className={`text-center p-4 rounded-xl bg-red-50 transition-all duration-800 ease-out ${benefitItems.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center text-red-600">{b.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{b.text}</h4>
                <p className="text-xs text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
