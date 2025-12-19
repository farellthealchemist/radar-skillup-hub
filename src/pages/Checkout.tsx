import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, Clock, Award, CheckCircle, AlertCircle } from 'lucide-react';

// Midtrans Snap types
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void;
        onPending: (result: any) => void;
        onError: (result: any) => void;
        onClose: () => void;
      }) => void;
    };
  }
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  thumbnail_url: string;
  duration: string;
  level: string;
  instructor_name: string;
  is_free: boolean;
}

const Checkout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [snapReady, setSnapReady] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Login Required",
          description: "Silakan login terlebih dahulu untuk melanjutkan pembayaran",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      setUser(user);
    };
    checkAuth();
  }, [navigate, toast]);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (error) throw error;
        setCourse(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Gagal memuat data kursus",
          variant: "destructive",
        });
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate, toast]);

  // Load Midtrans Snap script dynamically with client key from server
  const loadSnapScript = (clientKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const existingScript = document.querySelector('script[src*="midtrans"]');
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', clientKey);
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load payment script'));
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!course || !user) return;

    setProcessing(true);

    try {
      // Call edge function to create payment - client key comes from server
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { courseId: course.id }
      });

      if (error) throw error;

      if (!data.snapToken || !data.clientKey) {
        throw new Error('Failed to get payment token');
      }

      // Load Snap script with server-provided client key
      await loadSnapScript(data.clientKey);
      setSnapReady(true);

      // Small delay to ensure script is initialized
      await new Promise(resolve => setTimeout(resolve, 100));

      // Open Midtrans Snap popup
      window.snap.pay(data.snapToken, {
        onSuccess: (result) => {
          toast({
            title: "Pembayaran Berhasil!",
            description: "Terima kasih, pembayaran Anda telah berhasil diproses",
          });
          navigate(`/payment-success?orderId=${data.orderId}`);
        },
        onPending: (result) => {
          toast({
            title: "Pembayaran Pending",
            description: "Pembayaran Anda sedang diproses",
          });
          navigate(`/transactions`);
        },
        onError: (result) => {
          toast({
            title: "Pembayaran Gagal",
            description: "Terjadi kesalahan saat memproses pembayaran",
            variant: "destructive",
          });
          setProcessing(false);
        },
        onClose: () => {
          setProcessing(false);
        },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memproses pembayaran",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  const handleFreeEnrollment = async () => {
    if (!course || !user) return;

    setProcessing(true);

    try {
      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single();

      if (existingEnrollment) {
        toast({
          title: "Sudah Terdaftar",
          description: "Anda sudah terdaftar di kursus ini",
        });
        navigate('/my-courses');
        return;
      }

      // Create free enrollment
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          progress: 0,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Berhasil Terdaftar!",
        description: "Anda telah berhasil mendaftar di kursus gratis ini",
      });
      navigate('/my-courses');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mendaftar kursus",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Kursus Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-4">Kursus yang Anda cari tidak tersedia</p>
          <Button asChild>
            <Link to="/courses">Kembali ke Kursus</Link>
          </Button>
        </div>
      </div>
    );
  }

  const finalPrice = course.discount_price || course.price;
  const savings = course.discount_price ? course.price - course.discount_price : 0;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Selesaikan pembayaran untuk mulai belajar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Course Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Detail Kursus
              </h2>
              
              <div className="flex gap-4">
                <img 
                  src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'} 
                  alt={course.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Yang Anda Dapatkan</h2>
              <div className="space-y-3">
                {[
                  'Akses materi selamanya',
                  'Sertifikat resmi setelah lulus',
                  'Support instruktur 24/7',
                  'Source code & project files',
                  'Grup diskusi alumni',
                  'Career guidance'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Pembayaran Aman</h3>
                  <p className="text-sm text-blue-700">
                    Transaksi Anda dilindungi dengan enkripsi SSL dan diproses oleh Midtrans, 
                    payment gateway terpercaya di Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Harga Kursus</span>
                  <span>Rp {course.price.toLocaleString('id-ID')}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Diskon</span>
                    <span>- Rp {savings.toLocaleString('id-ID')}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {course.is_free ? 'GRATIS' : `Rp ${finalPrice.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={course.is_free ? handleFreeEnrollment : handlePayment}
                disabled={processing}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : course.is_free ? (
                  'Daftar Sekarang'
                ) : (
                  'Bayar Sekarang'
                )}
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Dengan melanjutkan, Anda menyetujui{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Syarat & Ketentuan
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;