import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, User, ArrowRight, BookOpen, Code, Network, Trophy, Clock, Search, Shield, GraduationCap
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const { ref: postsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(20, 100, 250);

  const featuredPost = blogPosts.find(p => p.is_featured) || null;
  const posts = blogPosts.filter(p => !p.is_featured || p.id !== featuredPost?.id);
  const categories = [...new Set(blogPosts.map(p => p.category))];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Pemrograman": return <Code className="w-5 h-5 text-blue-600" />;
      case "Jaringan": return <Network className="w-5 h-5 text-purple-600" />;
      case "Tips Belajar": return <BookOpen className="w-5 h-5 text-green-600" />;
      case "Karir": return <Trophy className="w-5 h-5 text-yellow-600" />;
      case "Keamanan": return <Shield className="w-5 h-5 text-red-600" />;
      default: return <GraduationCap className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "Semua" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showFeaturedPost = featuredPost && (activeCategory === "Semua" || activeCategory === featuredPost.category) &&
    (searchTerm === "" || featuredPost.title.toLowerCase().includes(searchTerm.toLowerCase()) || featuredPost.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Search & Filter */}
      <section className="py-12 mt-1 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Blog RADAR Education</h1>
            <p className="text-muted-foreground text-lg">Artikel, tips, dan insight seputar teknologi dan pendidikan</p>
          </div>
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input type="text" placeholder="Cari artikel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent smooth-transition" />
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveCategory("Semua")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium smooth-transition hover-lift ${activeCategory === "Semua" ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  <BookOpen className="w-4 h-4" /><span className="hidden sm:inline">Semua</span>
                </button>
                {categories.map((category) => (
                  <button key={category} onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium smooth-transition hover-lift ${activeCategory === category ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                    {getCategoryIcon(category)}<span className="hidden sm:inline">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {showFeaturedPost && featuredPost && (
        <section ref={featuredRef as React.RefObject<HTMLElement>} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Artikel Pilihan</span>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Artikel Terbaru & Terpopuler</h2>
            </div>
            <div className={`transition-all duration-1000 ease-out ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover-lift smooth-transition">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                    <img src={featuredPost.thumbnail_url} alt={featuredPost.title} className="w-full h-full object-cover hover:scale-105 smooth-transition" loading="lazy" />
                    <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">Featured</span></div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      {getCategoryIcon(featuredPost.category)}
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">{featuredPost.category}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight gradient-text">{featuredPost.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2"><User className="w-4 h-4" />{featuredPost.author_name}</div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(featuredPost.published_at)}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{featuredPost.read_time}</div>
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`} className="inline-flex items-center justify-center px-6 py-3 hero-gradient text-white font-semibold rounded-lg hover:scale-105 smooth-transition btn-glow w-fit">
                      Baca Artikel<ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">{activeCategory === "Semua" ? "Semua Artikel" : `Artikel ${activeCategory}`}</h2>
            <p className="text-muted-foreground text-lg">Menampilkan {filteredPosts.length} artikel</p>
          </div>
          {filteredPosts.length > 0 ? (
            <div ref={postsRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article key={post.id} className={`group bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover-lift smooth-transition transition-all duration-800 ease-out ${visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 smooth-transition" loading="lazy" />
                    <div className="absolute top-4 left-4">{getCategoryIcon(post.category)}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">{post.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{post.read_time}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary smooth-transition">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-4 h-4 text-primary" /></div>
                        <div>
                          <p className="text-sm font-medium">{post.author_name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(post.published_at)}</p>
                        </div>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 smooth-transition">
                        Baca<ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center"><Search className="w-12 h-12 text-muted-foreground" /></div>
              <h3 className="text-xl font-bold mb-2">Tidak Ada Artikel</h3>
              <p className="text-muted-foreground mb-6">Tidak ditemukan artikel yang sesuai.</p>
              <button onClick={() => { setSearchTerm(""); setActiveCategory("Semua"); }} className="px-6 py-3 hero-gradient text-white font-semibold rounded-lg hover:scale-105 smooth-transition">Lihat Semua Artikel</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
