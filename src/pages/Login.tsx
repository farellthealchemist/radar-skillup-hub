import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

// Animation Hook
const useScrollAnimation = ({ delay = 0 } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
};

// Password validation schema
const passwordSchema = z.string()
  .min(8, "Password harus minimal 8 karakter")
  .regex(/[A-Z]/, "Password harus mengandung huruf besar")
  .regex(/[a-z]/, "Password harus mengandung huruf kecil")
  .regex(/[0-9]/, "Password harus mengandung angka");

// Signup validation schema
const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Nama harus minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: z.string().trim().regex(/^08\d{8,12}$/, "Format nomor HP tidak valid (contoh: 08123456789)"),
  email: z.string().email("Format email tidak valid").max(255, "Email maksimal 255 karakter"),
  password: passwordSchema
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ delay: 300 });
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Mohon isi semua field",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui syarat & ketentuan",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Berhasil!",
          description: "Anda berhasil masuk",
        });
        navigate("/dashboard");
      } else {
        // Validate signup form
        try {
          signupSchema.parse({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
          });
        } catch (error) {
          if (error instanceof z.ZodError) {
            toast({
              title: "Validasi Gagal",
              description: error.errors[0].message,
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        toast({
          title: "Registrasi Berhasil!",
          description: "Selamat datang! Anda akan diarahkan ke dashboard.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
      `}</style>

      {/* Header */}
      <section className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isLogin ? "Masuk ke Akun Anda" : "Daftar Akun Baru"}
            </h1>
            <p className="text-lg opacity-90">
              {isLogin ? "Lanjutkan perjalanan belajar Anda" : "Mulai perjalanan belajar IT Anda"}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={formRef}
            className={`bg-white rounded-2xl shadow-xl p-8 border transition-all duration-1000 ease-out ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-red-600" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Nama lengkap Anda"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor HP / WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-600" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-red-500"
                  required
                />
                {!isLogin && (
                  <p className="text-xs text-gray-600 mt-1">
                    Minimal 8 karakter, huruf besar, huruf kecil, dan angka
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Saya menyetujui{" "}
                  <Link to="#" className="text-red-600 hover:text-red-700 font-medium smooth-transition">
                    Syarat & Ketentuan
                  </Link>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium smooth-transition"
                >
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
                </button>
                {isLogin && (
                  <Link 
                    to="#" 
                    className="text-sm text-gray-600 hover:text-gray-900 smooth-transition"
                  >
                    Lupa password?
                  </Link>
                )}
              </div>

              <button
                type="submit"
                className="w-full hero-gradient text-white py-3 rounded-lg font-semibold hover:scale-105 smooth-transition btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600">
                    Atau
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 font-medium smooth-transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk dengan Google
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
