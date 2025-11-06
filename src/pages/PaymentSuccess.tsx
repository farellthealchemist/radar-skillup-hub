import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Download, BookOpen, Award } from 'lucide-react';

interface Order {
  id: string;
  order_id: string;
  amount: number;
  status: string;
  created_at: string;
  course_id: string;
  courses: {
    title: string;
    thumbnail_url: string;
  };
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      if (!orderId) {
        navigate('/courses');
        return;
      }

      fetchOrder();
    };

    checkAuth();
  }, [orderId, navigate]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          courses (
            title,
            thumbnail_url
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order Tidak Ditemukan</h2>
          <Button asChild className="mt-4">
            <Link to="/courses">Kembali ke Kursus</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-600">
            Terima kasih, pembayaran Anda telah kami terima
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono font-semibold">{order.order_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {order.status === 'paid' ? 'Lunas' : 'Menunggu Konfirmasi'}
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <img 
              src={order.courses.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'} 
              alt={order.courses.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{order.courses.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Pembayaran</span>
                <span className="text-xl font-bold text-primary">
                  Rp {order.amount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Langkah Selanjutnya</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Cek Email Anda</h3>
                <p className="text-sm text-gray-600">
                  Kami telah mengirimkan konfirmasi pembayaran dan detail akses kursus ke email Anda
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Akses Materi Kursus</h3>
                <p className="text-sm text-gray-600">
                  Anda sekarang dapat mengakses semua materi kursus dari halaman "Kursus Saya"
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Mulai Belajar</h3>
                <p className="text-sm text-gray-600">
                  Mulai perjalanan belajar Anda dan raih sertifikat setelah menyelesaikan kursus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            asChild
            size="lg"
            className="flex-1"
          >
            <Link to="/my-courses">
              <BookOpen className="w-5 h-5 mr-2" />
              Mulai Belajar
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <Link to="/transactions">
              <Download className="w-5 h-5 mr-2" />
              Lihat Invoice
            </Link>
          </Button>
        </div>

        {/* Benefits Reminder */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Yang Anda Dapatkan
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Akses seumur hidup ke semua materi kursus
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Sertifikat resmi setelah menyelesaikan kursus
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Support instruktur 24/7 via grup diskusi
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Career guidance dan job assistance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
