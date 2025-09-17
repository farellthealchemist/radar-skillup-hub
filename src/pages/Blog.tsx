import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, TrendingUp, BookOpen, Code, Network, Trophy } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "Tren Teknologi 2024: AI dan Machine Learning dalam Dunia Kerja",
    excerpt: "Bagaimana perkembangan AI dan ML mengubah lanskap karir IT dan skill apa yang perlu Anda persiapkan untuk masa depan.",
    author: "Asep Surahmat M.Kom",
    date: "15 Maret 2024",
    category: "Technology Trends",
    readTime: "8 menit baca",
    image: "/api/placeholder/800/400"
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
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Mengoptimalkan Excel untuk Analisis Data Bisnis",
      excerpt: "Teknik advanced Excel yang wajib dikuasai untuk analisis data dan reporting profesional.",
      author: "RADAR Team",
      date: "10 Maret 2024",
      category: "Office Skills",
      readTime: "6 menit baca",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Keamanan Jaringan: Ancaman dan Solusi Terkini",
      excerpt: "Update terbaru tentang ancaman cyber dan cara melindungi infrastruktur jaringan perusahaan.",
      author: "Rizqi Darmawan",
      date: "8 Maret 2024",
      category: "Networking",
      readTime: "7 menit baca",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Sukses Story: Dari Nol ke Programmer dalam 6 Bulan",
      excerpt: "Kisah inspiratif alumni yang berhasil berkarir sebagai software developer setelah kursus di RADAR.",
      author: "Alumni RADAR",
      date: "5 Maret 2024",
      category: "Success Story",
      readTime: "4 menit baca",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Pengenalan Scratch: Programming untuk Anak-anak",
      excerpt: "Mengapa Scratch adalah pilihan tepat untuk memperkenalkan programming kepada anak-anak.",
      author: "RADAR Team",
      date: "3 Maret 2024",
      category: "Education",
      readTime: "5 menit baca",
      image: "/api/placeholder/400/250"
    },
    {
      id: 7,
      title: "Cloud Computing: Masa Depan Infrastruktur IT",
      excerpt: "Memahami manfaat cloud computing dan bagaimana mempersiapkan skill untuk era digital.",
      author: "Asep Surahmat M.Kom",
      date: "1 Maret 2024",
      category: "Cloud Technology",
      readTime: "9 menit baca",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    { name: "Programming", icon: <Code className="w-4 h-4" />, count: 12 },
    { name: "Networking", icon: <Network className="w-4 h-4" />, count: 8 },
    { name: "Office Skills", icon: <BookOpen className="w-4 h-4" />, count: 15 },
    { name: "Success Story", icon: <Trophy className="w-4 h-4" />, count: 6 },
    { name: "Technology Trends", icon: <TrendingUp className="w-4 h-4" />, count: 10 }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            Blog & Artikel IT
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            Temukan artikel terbaru tentang teknologi, tips programming, tutorial, 
            dan kisah sukses dari dunia IT.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Semua Artikel
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4">Artikel Terpilih</Badge>
            <h2 className="text-3xl font-heading font-bold">Artikel Terbaru</h2>
          </div>
          
          <Card className="overflow-hidden shadow-card-hover hover:shadow-hero transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Featured Article Image</p>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div>{featuredPost.readTime}</div>
                </div>
                <Button className="w-fit hero-gradient">
                  Baca Artikel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-card-hover transition-all duration-300 animate-fade-in group" 
                   style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    {post.category === "Programming" && <Code className="w-12 h-12 text-primary mx-auto mb-2" />}
                    {post.category === "Networking" && <Network className="w-12 h-12 text-primary mx-auto mb-2" />}
                    {post.category === "Office Skills" && <BookOpen className="w-12 h-12 text-primary mx-auto mb-2" />}
                    {post.category === "Success Story" && <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />}
                    {post.category === "Education" && <BookOpen className="w-12 h-12 text-primary mx-auto mb-2" />}
                    {post.category === "Cloud Technology" && <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />}
                    <p className="text-sm text-muted-foreground">Article Image</p>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <Badge variant="outline" className="mb-3">{post.category}</Badge>
                  <h3 className="font-heading font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                      Baca Selengkapnya
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Jangan Lewatkan Update Terbaru
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan artikel terbaru, tips IT, 
            dan informasi program kursus langsung di inbox Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
            />
            <Button className="hero-gradient px-8">
              Berlangganan
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Siap Memulai Perjalanan IT Anda?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Dari artikel ke praktek nyata. Bergabunglah dengan program kursus kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Lihat Program Kursus
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 transition-colors duration-200">
              Download Brosur
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;