import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Code, 
  Network, 
  Trophy, 
  Clock,
  Search,
  Filter,
  Mail
} from "lucide-react";

// Consistent Animation Hooks
const useScrollAnimation = ({ delay = 0, threshold = 0.1, rootMargin = "0px" } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  return { ref, isVisible };
};

const useStaggeredAnimation = (itemCount, staggerDelay = 100, initialDelay = 200) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, initialDelay + i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, initialDelay]);

  return { ref, visibleItems };
};

const OptimizedBlog = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 300 });
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: postsRef, visibleItems } = useStaggeredAnimation(6, 100, 250);
  const { ref: newsletterRef, isVisible: newsletterVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const featuredPost = {
    id: 1,
    title: "Tren Teknologi 2024: AI dan Machine Learning dalam Dunia Kerja",
    excerpt: "Bagaimana perkembangan AI dan ML mengubah lanskap karir IT dan skill apa yang perlu Anda persiapkan untuk masa depan.",
    author: "Asep Surahmat M.Kom",
    date: "15 Maret 2024",
    category: "Technology Trends",
    readTime: "8 menit baca",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "5 Tips Belajar Programming untuk Pemula",
      excerpt: "Panduan lengkap memulai journey programming dengan strategi yang tepat dan efektif.",
      author: "Rizqi Darmawan",
      date: "12 Maret 2024",
      category: "Programming",
      readTime: "5 menit baca",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Mengoptimalkan Excel untuk Analisis Data Bisnis",
      excerpt: "Teknik advanced Excel yang wajib dikuasai untuk analisis data dan reporting profesional.",
      author: "RADAR Team",
      date: "10 Maret 2024",
      category: "Office Skills",
      readTime: "6 menit baca",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Keamanan Jaringan: Ancaman dan Solusi Terkini",
      excerpt: "Update terbaru tentang ancaman cyber dan cara melindungi infrastruktur jaringan perusahaan.",
      author: "Rizqi Darmawan",
      date: "8 Maret 2024",
      category: "Networking",
      readTime: "7 menit baca",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Sukses Story: Dari Nol ke Programmer dalam 6 Bulan",
      excerpt: "Kisah inspiratif alumni yang berhasil berkarir sebagai software developer setelah kursus di RADAR.",
      author: "Alumni RADAR",
      date: "5 Maret 2024",
      category: "Success Story",
      readTime: "4 menit baca",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Pengenalan Scratch: Programming untuk Anak-anak",
      excerpt: "Mengapa Scratch adalah pilihan tepat untuk memperkenalkan programming kepada anak-anak.",
      author: "RADAR Team",
      date: "3 Maret 2024",
      category: "Education",
      readTime: "5 menit baca",
      image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=250&fit=crop"
    },
    {
      id: 7,
      title: "Cloud Computing: Masa Depan Infrastruktur IT",
      excerpt: "Memahami manfaat cloud computing dan bagaimana mempersiapkan skill untuk era digital.",
      author: "Asep Surahmat M.Kom",
      date: "1 Maret 2024",
      category: "Cloud Technology",
      readTime: "9 menit baca",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"
    }
  ];

  const categories = [
    { name: "Semua", icon: <BookOpen className="w-4 h-4" />, count: blogPosts.length + 1 },
    { name: "Programming", icon: <Code className="w-4 h-4" />, count: 2 },
    { name: "Networking", icon: <Network className="w-4 h-4" />, count: 1 },
    { name: "Office Skills", icon: <BookOpen className="w-4 h-4" />, count: 1 },
    { name: "Success Story", icon: <Trophy className="w-4 h-4" />, count: 1 },
    { name: "Technology Trends", icon: <TrendingUp className="w-4 h-4" />, count: 1 }
  ];

  // Filter posts based on category and search
  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Semua" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show featured post only when "Semua" is selected or matches the featured post category
  const showFeaturedPost = (activeCategory === "Semua" || activeCategory === featuredPost.category) &&
                           (searchTerm === "" || 
                            featuredPost.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            featuredPost.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

  // Get actual count for each category including featured post
  const getCategoryCount = (categoryName) => {
    if (categoryName === "Semua") return blogPosts.length + 1; // +1 for featured post
    
    const blogPostCount = blogPosts.filter(post => post.category === categoryName).length;
    const featuredCount = featuredPost.category === categoryName ? 1 : 0;
    return blogPostCount + featuredCount;
  };

  const updatedCategories = categories.map(cat => ({
    ...cat,
    count: getCategoryCount(cat.name)
  }));

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Programming": return <Code className="w-5 h-5 text-blue-600" />;
      case "Networking": return <Network className="w-5 h-5 text-purple-600" />;
      case "Office Skills": return <BookOpen className="w-5 h-5 text-green-600" />;
      case "Success Story": return <Trophy className="w-5 h-5 text-yellow-600" />;
      case "Technology Trends": return <TrendingUp className="w-5 h-5 text-red-600" />;
      case "Education": return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case "Cloud Technology": return <TrendingUp className="w-5 h-5 text-cyan-600" />;
      default: return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Consistent Styles */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #14b8a6, #0d9488, #0f766e);
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
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>


      {/* Enhanced Search & Filter Section */}
      <section className="py-12 mt-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari artikel atau topik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent smooth-transition"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                {updatedCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium smooth-transition hover-lift ${
                      activeCategory === category.name
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.name 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article - Show conditionally */}
      {showFeaturedPost && (
        <section ref={featuredRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                Artikel Pilihan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Artikel Terbaru & Terpopuler
              </h2>
            </div>
            
            <div className={`transition-all duration-1000 ease-out ${
              featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover-lift smooth-transition">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-105 smooth-transition"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 smooth-transition"></div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      {getCategoryIcon(featuredPost.category)}
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight gradient-text hover:scale-105 smooth-transition">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <Link 
                      to="#"
                      className="inline-flex items-center justify-center px-6 py-3 hero-gradient text-white font-semibold rounded-lg hover:scale-105 smooth-transition btn-glow"
                    >
                      Baca Artikel
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results info */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {activeCategory === "Semua" ? "Semua Artikel" : `Artikel ${activeCategory}`}
            </h2>
            <p className="text-gray-600 text-lg">
              {searchTerm ? (
                <>Menampilkan hasil pencarian untuk "<strong>{searchTerm}</strong>" dalam kategori <strong>{activeCategory}</strong></>
              ) : (
                <>Menampilkan {filteredBlogPosts.length} artikel dalam kategori <strong>{activeCategory}</strong></>
              )}
            </p>
          </div>

          {filteredBlogPosts.length > 0 ? (
            <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${
                    visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                    
                    <div className="absolute top-4 left-4">
                      {getCategoryIcon(post.category)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-teal-600 smooth-transition">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to="#"
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm group-hover:scale-105 smooth-transition"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada artikel ditemukan</h3>
              <p className="text-gray-500 mb-6">
                Coba ubah filter kategori atau kata kunci pencarian Anda.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory("Semua");
                  setSearchTerm("");
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 smooth-transition"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Load More Button - only show if there are results */}
          {filteredBlogPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 smooth-transition">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ease-out ${
            newsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
              
              <div className="relative z-10">
                <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Jangan Lewatkan Update Terbaru
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Berlangganan newsletter kami untuk mendapatkan artikel terbaru, tips IT, 
                  dan informasi program kursus langsung di inbox Anda.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition">
                    Berlangganan
                  </button>
                </div>
                
                <p className="text-sm opacity-75 mt-4">
                  Gratis dan bisa berhenti berlangganan kapan saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Dari Membaca ke Mempraktikkan
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Sudah siap mengaplikasikan ilmu yang Anda baca? Bergabunglah dengan program kursus kami 
              dan wujudkan skill IT impian Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-4 hero-gradient text-white font-semibold rounded-lg hover:scale-105 smooth-transition btn-glow"
              >
                Lihat Program Kursus
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a 
                href="https://wa.me/6285782763529?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20program%20kursus%20di%20RADAR%20Education%20Center"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-600 hover:text-white hover:scale-105 smooth-transition"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedBlog;