import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { 
  Clock, 
  Users, 
  Award, 
  Star,
  Search,
  Phone,
  Download,
  Target,
  Shield,
  Loader2
} from "lucide-react";

const OptimizedCourses = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>({ delay: 300 });
  const { ref: coursesRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(courses.length, 150, 250);
  const { ref: guaranteeRef, visibleItems: guaranteeItems } = useStaggeredAnimation<HTMLDivElement>(3, 100, 200);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLElement>();

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        const formattedCourses = data?.map(course => ({
          id: course.id,
          title: course.title,
          slug: course.slug,
          category: course.category,
          description: course.description || '',
          image: course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
          duration: course.duration || '',
          students: `${course.total_students || 0}+`,
          level: course.level || 'Pemula',
          price: course.is_free ? 'GRATIS' : `Rp ${course.price?.toLocaleString('id-ID')}`,
          originalPrice: course.discount_price ? `Rp ${course.discount_price?.toLocaleString('id-ID')}` : null,
          discount: course.discount_price ? `${Math.round((1 - course.discount_price / course.price) * 100)}%` : null,
          rating: course.rating || 0,
          reviewCount: course.total_students || 0,
          popular: course.total_students > 500,
          instructor: course.instructor_name || '',
          language: course.language || 'Bahasa Indonesia',
          isFree: course.is_free
        })) || [];

        setCourses(formattedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Calculate categories dynamically
  const allCategories = Array.from(new Set(courses.map(c => c.category)));
  const categories = [
    { name: "Semua", count: courses.length },
    ...allCategories.map(cat => ({
      name: cat,
      count: courses.filter(c => c.category === cat).length
    }))
  ];

  const guaranteeFeatures = [
    { 
      icon: <Shield className="w-8 h-8 text-red-600" />, 
      title: "Garansi Mengulang", 
      description: "Bisa mengulang kelas GRATIS jika belum menguasai materi",
      highlight: "100% Guarantee"
    },
    { 
      icon: <Users className="w-8 h-8 text-red-600" />, 
      title: "Kelas Kecil", 
      description: "Maksimal 12 siswa per kelas untuk perhatian personal optimal",
      highlight: "Personal Attention"
    },
    { 
      icon: <Target className="w-8 h-8 text-red-600" />, 
      title: "Job Assistance", 
      description: "Bantuan penempatan kerja dan career guidance setelah lulus",
      highlight: "85% Job Rate"
    }
  ];

  // Filter courses based on category and search
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "Semua" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Consistent Styles with Homepage */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
        }
        .scale-103 {
          transform: scale(1.03);
        }
      `}</style>

      {/* Hero Section - Simplified without stats */}
      <section ref={heroRef} className="py-16 mt-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                Program Kursus IT
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Pilih Program Kursus 
                <span className="gradient-text"> Sesuai Tujuan Karir Anda</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Dari Programming hingga Network Administration, temukan program yang tepat untuk mengembangkan skill IT dan mempersiapkan masa depan profesional Anda.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-gray-700">
                  <strong>Cara Memilih:</strong> Gunakan filter kategori dan pencarian di bawah untuk menemukan program yang sesuai dengan minat dan level skill Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter & Search Section */}
      <section className="py-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:flex-1 max-w-md">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Cari kursus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent smooth-transition"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm rounded-lg font-medium smooth-transition hover-lift ${
                      activeCategory === category.name
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="hidden sm:inline">{category.name} ({category.count})</span>
                    <span className="sm:hidden">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Courses Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Memuat kursus...</p>
              </div>
            </div>
          ) : (
          <div ref={coursesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className={`group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover-lift smooth-transition transition-all duration-800 ease-out ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Course Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-md ${
                      course.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
                      course.category === 'Office' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {course.category}
                    </span>
                  </div>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1">
                    {course.popular && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-600 text-white text-xs font-medium rounded-md">
                        Popular
                      </span>
                    )}
                    {course.discount && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                        -{course.discount}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-3 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-red-600 group-hover:scale-103 transition-all duration-300 ease-in-out leading-tight cursor-pointer origin-left">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                  
                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4 py-2 sm:py-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Clock className="w-3 h-3 mx-auto mb-1 text-red-600" />
                      <div className="text-xs font-medium">{course.duration}</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-3 h-3 mx-auto mb-1 text-red-600" />
                      <div className="text-xs font-medium">{course.students}</div>
                    </div>
                    <div className="text-center">
                      <Award className="w-3 h-3 mx-auto mb-1 text-red-600" />
                      <div className="text-xs font-medium">Sertifikat</div>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="mb-3 sm:mb-4 flex items-center gap-2 text-xs text-gray-600">
                    <Users className="w-3 h-3 text-red-600" />
                    <span>{course.instructor}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base sm:text-lg font-bold text-red-600">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">{course.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Per program</div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md hidden sm:inline">
                        {course.level}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to={`/courses/${course.slug}`}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 border border-red-600 text-red-600 font-medium rounded-md hover:bg-red-50 smooth-transition text-xs sm:text-sm flex items-center justify-center"
                      >
                        Detail
                      </Link>
                      {course.isFree ? (
                        <Link 
                          to={`/courses/${course.slug}`}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 hero-gradient text-white font-medium rounded-md hover:scale-105 smooth-transition btn-glow text-xs sm:text-sm flex items-center justify-center"
                        >
                          Mulai Gratis
                        </Link>
                      ) : (
                        <Link 
                          to="/register"
                          className="px-2 sm:px-3 py-1.5 sm:py-2 hero-gradient text-white font-medium rounded-md hover:scale-105 smooth-transition btn-glow text-xs sm:text-sm flex items-center justify-center"
                        >
                          Daftar
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Learning Guarantee */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
              Jaminan Pembelajaran
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Komitmen Kami untuk Kesuksesan Anda
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami tidak hanya mengajar, tapi memastikan Anda benar-benar menguasai skill yang dipelajari
            </p>
          </div>
          
          <div ref={guaranteeRef} className="grid md:grid-cols-3 gap-8">
            {guaranteeFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                  guaranteeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-red-600 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={ctaRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ease-out ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Mulai Investasi Terbaik untuk Masa Depan Anda
              </h2>
              
              <p className={`text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                Konsultasi GRATIS untuk menentukan program yang tepat sesuai tujuan karir dan skill level Anda saat ini.
              </p>
              
              {/* Contact options */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out delay-400 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <a 
                  href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition btn-glow"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Via WhatsApp
                </a>
                <a 
                  href="#"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 hover:scale-105 smooth-transition"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brosur Program
                </a>
              </div>

              {/* Quick contact info */}
              <div className={`text-center opacity-80 transition-all duration-1000 ease-out delay-600 ${
                ctaVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <p className="text-sm mb-2">Atau hubungi langsung:</p>
                <p className="font-semibold">0857-8276-3529 (WhatsApp) • asep@radarteknologikomputer.id</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedCourses;