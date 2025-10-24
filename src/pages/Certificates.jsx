import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, Share2, Eye, Calendar, CheckCircle } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      courseTitle: "Scratch Visual Programming",
      completedDate: "10 Sep 2025",
      certificateNumber: "RADAR/2025/09/001",
      instructor: "Rina Kusuma S.Pd",
      thumbnail: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600",
      pdfUrl: "#",
      score: 95
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
      `}</style>

      {/* Header */}
      <section className="hero-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sertifikat Saya</h1>
          <p className="text-lg opacity-90">Kumpulan sertifikat dari kursus yang telah Anda selesaikan</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {certificates.length}
              </div>
              <div className="text-sm text-gray-600">Total Sertifikat</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {certificates.length}
              </div>
              <div className="text-sm text-gray-600">Kursus Selesai</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {certificates.length}
              </div>
              <div className="text-sm text-gray-600">Dapat Diunduh</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {certificates.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada sertifikat</h3>
              <p className="text-gray-600 mb-6">
                Selesaikan kursus untuk mendapatkan sertifikat
              </p>
              <Link 
                to="/my-courses"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 smooth-transition font-medium"
              >
                Lihat Kursus Saya
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-xl overflow-hidden hover:shadow-lg hover-lift smooth-transition border">
                  {/* Certificate Preview */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Award className="w-16 h-16 text-red-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          Certificate of Completion
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cert.courseTitle}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                        Score: {cert.score}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2">{cert.courseTitle}</h4>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Completed: {cert.completedDate}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        No: {cert.certificateNumber}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={cert.pdfUrl}
                        download
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 smooth-transition font-medium text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 smooth-transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 smooth-transition">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Certificates;