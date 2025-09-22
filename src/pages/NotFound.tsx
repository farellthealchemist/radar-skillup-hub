import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { name: "Beranda", path: "/" },
    { name: "Program Kursus", path: "/courses" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kontak", path: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
              <span className="text-6xl sm:text-8xl font-bold text-red-500">404</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Oops! Halaman yang Anda cari tidak dapat ditemukan.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          URL: <code className="bg-gray-100 px-2 py-1 rounded text-red-600">{location.pathname}</code>
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-red-600 bg-white border-2 border-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Halaman Sebelumnya
          </button>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Search className="w-5 h-5 mr-2 text-gray-500" />
            Halaman Populer
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 py-2 px-3 rounded transition-colors duration-200"
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">
            Butuh bantuan? Hubungi tim kami
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=6285782763529&text=Halo%2C%20saya%20mengalami%20masalah%20dengan%20website%20RADAR%20Education%20Center"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <Phone className="w-4 h-4 mr-1" />
            0857-8276-3529
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;