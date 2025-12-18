import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  BookOpen, 
  CreditCard, 
  UserCheck, 
  Award, 
  MessageCircle,
  ChevronDown,
  Search,
  ArrowRight
} from 'lucide-react';

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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ delay: 300 });

  const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      name: 'Umum',
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          question: 'Apa itu RADAR Education Center?',
          answer: 'RADAR Education Center adalah lembaga kursus komputer dan programming yang berbasis di Cibinong, Bogor. Kami menyediakan berbagai program pelatihan mulai dari pemrograman dasar hingga tingkat lanjut, Microsoft Office, jaringan komputer, dan kursus coding untuk anak-anak.'
        },
        {
          question: 'Di mana lokasi RADAR Education Center?',
          answer: 'Kami berlokasi di Jl. Raya Cibinong No. 123, Cibinong, Kabupaten Bogor, Jawa Barat. Lokasi kami mudah dijangkau dan tersedia area parkir yang luas.'
        },
        {
          question: 'Apakah ada kelas online?',
          answer: 'Ya, kami menyediakan opsi kelas online dan offline. Untuk kelas online, Anda bisa belajar dari mana saja dengan akses ke materi pembelajaran digital, video tutorial, dan live session dengan instruktur.'
        },
        {
          question: 'Bagaimana jadwal kelas di RADAR?',
          answer: 'Jadwal kelas fleksibel dan dapat disesuaikan dengan kebutuhan peserta. Tersedia kelas pagi, siang, dan malam untuk hari kerja, serta kelas weekend untuk yang memiliki kesibukan di hari kerja.'
        }
      ]
    },
    {
      id: 'courses',
      name: 'Kursus',
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        {
          question: 'Program kursus apa saja yang tersedia?',
          answer: 'Kami menyediakan berbagai program: Programming (Python, JavaScript, Web Development), Microsoft Office (Word, Excel, PowerPoint), Jaringan Komputer (CCNA, Mikrotik), dan Scratch untuk anak-anak.'
        },
        {
          question: 'Berapa lama durasi setiap kursus?',
          answer: 'Durasi kursus bervariasi tergantung program. Kursus dasar biasanya 1-2 bulan, sementara kursus advanced bisa 3-6 bulan. Setiap kursus memiliki detail durasi di halaman deskripsi.'
        },
        {
          question: 'Apakah ada sertifikat setelah menyelesaikan kursus?',
          answer: 'Ya, setiap peserta yang menyelesaikan kursus akan mendapatkan sertifikat kompetensi dari RADAR Education Center yang dapat digunakan untuk melamar pekerjaan atau melanjutkan pendidikan.'
        },
        {
          question: 'Apakah materi kursus bisa diakses selamanya?',
          answer: 'Ya, setelah mendaftar kursus, Anda akan memiliki akses selamanya ke materi pembelajaran online termasuk video tutorial, dokumen, dan resources pendukung.'
        }
      ]
    },
    {
      id: 'payment',
      name: 'Pembayaran',
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        {
          question: 'Metode pembayaran apa saja yang tersedia?',
          answer: 'Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, BNI, BRI, Mandiri), E-Wallet (GoPay, OVO, DANA), Virtual Account, dan pembayaran langsung di lokasi.'
        },
        {
          question: 'Apakah bisa bayar dengan cicilan?',
          answer: 'Ya, untuk program tertentu kami menyediakan opsi cicilan hingga 3x pembayaran. Silakan hubungi admin untuk informasi lebih lanjut tentang skema cicilan.'
        },
        {
          question: 'Bagaimana kebijakan refund?',
          answer: 'Refund dapat diajukan dalam 7 hari pertama setelah pendaftaran dengan potongan biaya administrasi 20%. Setelah 7 hari, refund tidak dapat diproses tetapi bisa dialihkan ke program lain.'
        },
        {
          question: 'Apakah ada diskon untuk grup?',
          answer: 'Ya, kami menyediakan diskon khusus untuk pendaftaran grup (minimal 3 orang) dan juga diskon untuk pelajar/mahasiswa dengan menunjukkan kartu identitas.'
        }
      ]
    },
    {
      id: 'registration',
      name: 'Pendaftaran',
      icon: <UserCheck className="w-5 h-5" />,
      items: [
        {
          question: 'Bagaimana cara mendaftar kursus?',
          answer: 'Anda bisa mendaftar langsung melalui website ini dengan membuat akun, memilih kursus, dan melakukan pembayaran. Atau bisa juga datang langsung ke lokasi kami untuk konsultasi dan pendaftaran.'
        },
        {
          question: 'Apakah ada tes masuk sebelum kursus?',
          answer: 'Untuk beberapa program advanced, kami menyediakan assessment untuk memastikan peserta memiliki dasar yang cukup. Untuk program pemula, tidak ada syarat khusus.'
        },
        {
          question: 'Dokumen apa yang diperlukan untuk pendaftaran?',
          answer: 'Untuk pendaftaran online, Anda hanya perlu email dan nomor HP yang aktif. Untuk pendaftaran offline, bawa KTP/Kartu Pelajar dan pas foto 3x4.'
        },
        {
          question: 'Kapan saya bisa mulai belajar setelah mendaftar?',
          answer: 'Setelah pembayaran dikonfirmasi, Anda langsung bisa mengakses materi online. Untuk kelas tatap muka, jadwal akan dikonfirmasi oleh admin dalam 1x24 jam.'
        }
      ]
    },
    {
      id: 'certificate',
      name: 'Sertifikat',
      icon: <Award className="w-5 h-5" />,
      items: [
        {
          question: 'Bagaimana cara mendapatkan sertifikat?',
          answer: 'Sertifikat akan diberikan setelah Anda menyelesaikan semua modul pembelajaran dan lulus ujian akhir dengan nilai minimal 70%. Sertifikat bisa diunduh dalam format digital atau dicetak.'
        },
        {
          question: 'Apakah sertifikat RADAR diakui?',
          answer: 'Sertifikat RADAR Education Center diakui oleh berbagai perusahaan dan dapat digunakan sebagai bukti kompetensi saat melamar pekerjaan. Untuk program tertentu, kami juga menyediakan sertifikasi internasional.'
        },
        {
          question: 'Bagaimana jika sertifikat hilang atau rusak?',
          answer: 'Anda bisa mengunduh ulang sertifikat digital dari dashboard akun Anda. Untuk cetak ulang sertifikat fisik, akan dikenakan biaya administrasi Rp 50.000.'
        }
      ]
    }
  ];

  // Filter FAQ items based on search
  const getFilteredItems = () => {
    const category = faqCategories.find(c => c.id === activeCategory);
    if (!category) return [];
    
    if (!searchTerm) return category.items;
    
    return category.items.filter(
      item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
      `}</style>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-gradient text-white py-16">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-800 ease-out ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-block mb-4 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
            Pusat Bantuan
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Temukan jawaban untuk pertanyaan umum tentang kursus, pembayaran, dan layanan kami
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 smooth-transition"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section ref={faqRef} className="py-16">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-800 ease-out ${
          faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
                <div className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setOpenIndex(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left smooth-transition ${
                        activeCategory === category.id
                          ? 'bg-red-50 text-red-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {category.icon}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full p-6 text-left hover:bg-gray-50 smooth-transition focus:outline-none"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {item.question}
                          </h3>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 smooth-transition ${
                              openIndex === index ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        <div className={`overflow-hidden smooth-transition ${
                          openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                        }`}>
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Tidak ada hasil
                    </h3>
                    <p className="text-gray-600">
                      Tidak ditemukan pertanyaan dengan kata kunci "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Masih punya <span className="gradient-text">pertanyaan?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Tim kami siap membantu Anda. Hubungi kami untuk konsultasi gratis tentang program yang sesuai untuk Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 hero-gradient text-white font-semibold rounded-xl hover:scale-105 smooth-transition btn-glow"
            >
              Hubungi Kami
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-50 smooth-transition"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;