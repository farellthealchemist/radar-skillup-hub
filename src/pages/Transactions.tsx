import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Calendar, CheckCircle, Clock, Download, Filter, Loader2, XCircle } from 'lucide-react';

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    success: 0,
    pending: 0,
    failed: 0,
    totalSpent: 0
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Login Required",
            description: "Silakan login untuk melihat transaksi Anda",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Fetch orders with course details
        const { data: orders, error } = await supabase
          .from('orders')
          .select(`
            id,
            order_id,
            amount,
            status,
            payment_method,
            created_at,
            paid_at,
            midtrans_transaction_id,
            courses (
              id,
              title
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Process transactions
        const processedTransactions = (orders || []).map(order => ({
          id: order.order_id,
          internalId: order.id,
          course: order.courses?.title || 'Unknown Course',
          date: new Date(order.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          amount: `Rp ${order.amount.toLocaleString('id-ID')}`,
          amountNum: order.amount,
          status: order.status,
          method: order.payment_method || 'Pending',
          transactionId: order.midtrans_transaction_id || '-',
          invoice: order.paid_at ? `/invoices/${order.order_id}` : null
        }));

        setTransactions(processedTransactions);

        // Calculate stats
        const successCount = processedTransactions.filter(t => t.status === 'paid').length;
        const pendingCount = processedTransactions.filter(t => t.status === 'pending').length;
        const failedCount = processedTransactions.filter(t => ['failed', 'expired', 'cancelled'].includes(t.status)).length;
        const totalSpent = processedTransactions
          .filter(t => t.status === 'paid')
          .reduce((acc, t) => acc + t.amountNum, 0);

        setStats({
          success: successCount,
          pending: pendingCount,
          failed: failedCount,
          totalSpent
        });

      } catch (error: any) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Gagal memuat riwayat transaksi",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate, toast]);

  const filteredTransactions = filterStatus === 'all' 
    ? transactions 
    : transactions.filter(t => {
        if (filterStatus === 'success') return t.status === 'paid';
        if (filterStatus === 'pending') return t.status === 'pending';
        if (filterStatus === 'failed') return ['failed', 'expired', 'cancelled'].includes(t.status);
        return true;
      });

  const getStatusBadge = (status: string) => {
    if (status === 'paid') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusText = (status: string) => {
    if (status === 'paid') return 'Berhasil';
    if (status === 'pending') return 'Pending';
    if (status === 'expired') return 'Kadaluarsa';
    if (status === 'cancelled') return 'Dibatalkan';
    return 'Gagal';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="hero-gradient text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Riwayat Transaksi</h1>
            <p className="text-lg opacity-90">Lihat semua transaksi pembelian kursus Anda</p>
          </div>
        </section>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat transaksi Anda...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      <section className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Riwayat Transaksi</h1>
          <p className="text-lg opacity-90">Lihat semua transaksi pembelian kursus Anda</p>
        </div>
      </section>

      <section className="py-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.success}
              </div>
              <div className="text-sm text-gray-600">Berhasil</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                Rp {stats.totalSpent.toLocaleString('id-ID')}
              </div>
              <div className="text-sm text-gray-600">Total Pengeluaran</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filter:</span>
              {['all', 'success', 'pending', 'failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium smooth-transition ${
                    filterStatus === status
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Semua' : 
                   status === 'success' ? 'Berhasil' :
                   status === 'pending' ? 'Pending' : 'Gagal'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada transaksi</h3>
                <p className="text-gray-600">
                  {filterStatus === 'all' 
                    ? 'Anda belum memiliki transaksi' 
                    : `Tidak ada transaksi dengan status ${filterStatus}`}
                </p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg smooth-transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{transaction.course}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {transaction.date}
                      </span>
                      <span>ID: {transaction.id}</span>
                      <span>{transaction.method}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{transaction.amount}</div>
                    </div>
                    {transaction.invoice && (
                      <button
                        onClick={() => window.open(transaction.invoice, '_blank')}
                        className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 smooth-transition font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Invoice</span>
                      </button>
                    )}
                    {!transaction.invoice && (
                      <div className="px-4 py-2 text-gray-400 text-sm">
                        Invoice belum tersedia
                      </div>
                    )}
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;