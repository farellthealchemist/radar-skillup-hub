import { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, Clock, Download, Filter } from 'lucide-react';

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const transactions = [
    {
      id: 'TRX001',
      course: 'Programming Fundamentals',
      date: '15 Sep 2025',
      amount: 'Rp 2.500.000',
      status: 'success',
      method: 'Transfer Bank',
      invoice: '#'
    },
    {
      id: 'TRX002',
      course: 'Microsoft Office Mastery',
      date: '20 Sep 2025',
      amount: 'Rp 1.200.000',
      status: 'success',
      method: 'E-Wallet',
      invoice: '#'
    },
    {
      id: 'TRX003',
      course: 'Network Administration',
      date: '25 Sep 2025',
      amount: 'Rp 3.500.000',
      status: 'pending',
      method: 'Transfer Bank',
      invoice: '#'
    }
  ];

  const filteredTransactions = filterStatus === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === filterStatus);

  const totalSpent = transactions
    .filter(t => t.status === 'success')
    .reduce((acc, t) => acc + parseInt(t.amount.replace(/\D/g, '')), 0);

  const getStatusBadge = (status) => {
    if (status === 'success') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusText = (status) => {
    if (status === 'success') return 'Berhasil';
    if (status === 'pending') return 'Pending';
    return 'Gagal';
  };

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
                {transactions.filter(t => t.status === 'success').length}
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
                {transactions.filter(t => t.status === 'pending').length}
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
                Rp {totalSpent.toLocaleString('id-ID')}
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
            {filteredTransactions.map((transaction) => (
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
                    <button
                      onClick={() => window.open(transaction.invoice, '_blank')}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 smooth-transition font-medium flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;