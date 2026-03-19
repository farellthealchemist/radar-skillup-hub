import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCourseBySlug } from '@/data/courses';
import { 
  Clock, Users, Award, BookOpen, Star,
  ChevronDown, Globe, Target,
  Share2, Heart, ChevronRight
} from "lucide-react";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const course = slug ? getCourseBySlug(slug) : undefined;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Kursus tidak ditemukan</p>
          <Link to="/courses" className="text-primary hover:underline">Kembali ke Kursus</Link>
        </div>
      </div>
    );
  }

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-red-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/courses" className="text-gray-500 hover:text-red-600 transition-colors">Kursus</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Link to="/courses" className="text-white/80 hover:text-white text-sm inline-flex items-center gap-2">
                  ← Kembali ke Kursus
                </Link>
              </div>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">{course.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-lg text-white/90 mb-6">{course.description.substring(0, 200)}...</p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/80">({course.students} siswa)</span>
                </div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span>{course.students} siswa</span></div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>{course.duration}</span></div>
                <div className="flex items-center gap-2"><Globe className="w-5 h-5" /><span>{course.language}</span></div>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6" />
                <div className="mb-6">
                  {course.originalPrice ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-3xl font-bold text-primary">{course.price}</p>
                        {course.discount && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">{course.discount} OFF</span>
                        )}
                      </div>
                      <p className="text-gray-500 line-through">{course.originalPrice}</p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold text-primary">{course.isFree ? 'Gratis' : course.price}</p>
                  )}
                </div>
                <Link
                  to="/register"
                  className="w-full mb-4 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  Daftar Sekarang
                </Link>
                <div className="space-y-3 text-sm text-gray-600 mb-6 mt-4">
                  <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-gray-400" /><span>Durasi: {course.duration}</span></div>
                  <div className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-gray-400" /><span>{totalLessons} pelajaran</span></div>
                  <div className="flex items-center gap-3"><Target className="w-5 h-5 text-gray-400" /><span>Level: {course.level}</span></div>
                  <div className="flex items-center gap-3"><Award className="w-5 h-5 text-gray-400" /><span>Sertifikat tersedia</span></div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />Bagikan
                  </button>
                  <button className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <div className="flex gap-8 border-b mb-8">
            {['overview', 'kurikulum', 'instruktur'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold transition-colors capitalize ${
                  activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' ? 'Overview' : tab === 'kurikulum' ? 'Kurikulum' : 'Instruktur'}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Tentang Kursus</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kurikulum' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Kurikulum Lengkap</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="bg-white border rounded-xl overflow-hidden">
                    <div onClick={() => toggleModule(index)} className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                        <span className="text-sm text-gray-500">{module.lessons.length} pelajaran</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedModules.includes(index) ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedModules.includes(index) && (
                      <div className="p-5 pt-0 border-t bg-gray-50">
                        {module.lessons.map((lesson, li) => (
                          <div key={li} className="flex items-center gap-3 py-3 border-b last:border-0">
                            <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="flex-1 text-gray-700">{lesson.title}</span>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instruktur' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Instruktur</h2>
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-24 h-24 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                    <p className="text-gray-600 mb-4">Instruktur berpengalaman di bidang {course.category}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
