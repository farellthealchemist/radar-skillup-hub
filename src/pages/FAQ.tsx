import { Link } from "react-router-dom";
import FAQ from "@/components/FAQ";

const FAQPage = () => {
  const faqs = [
    {
      question: "Bagaimana jika tidak memiliki latar belakang IT?",
      answer: "Tidak masalah! Program kami dirancang untuk semua level, termasuk pemula tanpa latar belakang IT. Instruktur kami akan membantu Anda dari dasar hingga mahir."
    },
    {
      question: "Apakah ada kelas FullStack Web Development?",
      answer: "Saat ini kami fokus pada fundamental programming (Python, Java). Untuk FullStack development, Anda bisa mengikuti program programming terlebih dahulu sebagai foundation."
    },
    {
      question: "Apakah pembayaran dapat dilakukan dengan cara mencicil?",
      answer: "Ya, kami menyediakan sistem pembayaran cicilan yang fleksibel untuk memudahkan siswa mengikuti program kursus."
    },
    {
      question: "Apakah ada kelas coding untuk anak SD?",
      answer: "Ya! Kami memiliki program Scratch yang khusus dirancang untuk anak-anak SD. Program ini mengajarkan logika programming dengan cara yang menyenangkan dan mudah dipahami."
    },
    {
      question: "Apakah setelah mengikuti kursus ini bisa dapat pekerjaan di bidang IT?",
      answer: "Program kami dirancang untuk mempersiapkan siswa dengan skill yang dibutuhkan industri IT. Banyak alumni kami yang berhasil berkarir di bidang IT setelah menyelesaikan program."
    },
    {
      question: "Berapa lama durasi setiap kelas?",
      answer: "Setiap sesi kelas berlangsung 2-3 jam dengan istirahat. Frekuensi kelas disesuaikan dengan program yang diambil."
    },
    {
      question: "Apakah mendapat sertifikat setelah lulus?",
      answer: "Ya, setiap peserta yang menyelesaikan program akan mendapat sertifikat resmi dari RADAR Education Center yang diakui industri."
    },
    {
      question: "Bagaimana sistem pembelajaran online/offline?",
      answer: "Kami menyediakan kelas offline di kampus dan online via platform digital. Siswa bisa memilih sesuai preferensi dan kebutuhan."
    },
    {
      question: "Apakah ada trial class atau kelas percobaan?",
      answer: "Ya, kami menyediakan trial class gratis untuk calon siswa yang ingin merasakan metode pembelajaran dan mengenal instruktur terlebih dahulu."
    },
    {
      question: "Bagaimana jika tidak bisa mengikuti kelas karena ada halangan?",
      answer: "Kami memberikan fleksibilitas dengan sistem makeup class. Siswa bisa mengganti kelas yang terlewat dengan jadwal lain atau mengulang materi yang sama."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            Temukan jawaban untuk pertanyaan umum tentang program kursus dan layanan RADAR Education Center
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jawaban untuk Pertanyaan Anda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami telah mengumpulkan pertanyaan yang paling sering ditanyakan untuk membantu Anda mendapatkan informasi yang dibutuhkan
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Tim kami siap membantu Anda. Hubungi kami untuk konsultasi gratis!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Hubungi Kami
            </Link>
            <a 
              href="https://api.whatsapp.com/send?phone=6285782763529&text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
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