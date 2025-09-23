import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Clock, User, ArrowRight, BookOpen, Lightbulb, Target } from "lucide-react";

const Blog = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ delay: 200 });
  const { ref: articlesRef, isVisible: articlesVisible } = useScrollAnimation({ delay: 400 });
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation({ delay: 300 });

  const blogPosts = [
    {
      id: 1,
      title: "Tips Belajar Programming untuk Pemula",
      excerpt: "Panduan lengkap memulai perjalanan programming dengan strategi yang efektif dan mudah dipahami.",
      author: "Tim RADAR",
      date: "2024-01-15",
      readTime: "5 menit",
      category: "Programming",
      image: "/src/assets/programming-course.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Tren Teknologi 2024: Yang Perlu Anda Ketahui",
      excerpt: "Eksplorasi tren teknologi terbaru yang akan membentuk masa depan dunia digital.",
      author: "Tim RADAR",
      date: "2024-01-10",
      readTime: "7 menit",
      category: "Teknologi",
      image: "/src/assets/networking-course.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Mengoptimalkan Produktivitas dengan Microsoft Office",
      excerpt: "Tips dan trik untuk meningkatkan efisiensi kerja menggunakan suite aplikasi Office.",
      author: "Tim RADAR",
      date: "2024-01-08",
      readTime: "4 menit",
      category: "Office",
      image: "/src/assets/office-course.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Scratch: Membangun Logika Programming Anak",
      excerpt: "Bagaimana Scratch membantu anak-anak mengembangkan kemampuan berpikir logis dan kreatif.",
      author: "Tim RADAR",
      date: "2024-01-05",
      readTime: "6 menit",
      category: "Edukasi",
      image: "/src/assets/scratch-course.jpg",
      featured: false
    }
  ];

  const categories = [
    { name: "Programming", count: 15, icon: BookOpen },
    { name: "Teknologi", count: 12, icon: Lightbulb },
    { name: "Office", count: 8, icon: Target },
    { name: "Edukasi", count: 10, icon: User }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef as any}
            className={`text-center transition-all duration-800 ease-out ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Blog & Artikel
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Temukan insight terbaru tentang teknologi, programming, dan tips-tips menarik 
              untuk meningkatkan skill digital Anda.
            </p>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Badge 
                    key={category.name} 
                    variant="secondary" 
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                      headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name} ({category.count})
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={featuredRef as any}
              className={`transition-all duration-800 ease-out ${
                featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-12">
                Artikel Pilihan
              </h2>
              
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card to-card/50 border-primary/20">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-square overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-foreground">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <Button className="hero-gradient w-fit group">
                      Baca Artikel
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={articlesRef as any}
            className={`transition-all duration-800 ease-out ${
              articlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-12">
              Artikel Terbaru
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className={`overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2 bg-card border-border/50 ${
                    articlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <Badge className="w-fit mb-2 bg-secondary text-secondary-foreground">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg font-heading line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full group hover:bg-primary hover:text-primary-foreground">
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="hero-gradient-border">
                Lihat Artikel Lainnya
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .hero-gradient-border {
          position: relative;
          background: transparent;
          border: 2px solid transparent;
        }
        
        .hero-gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
        }
      `}</style>
    </div>
  );
};

export default Blog;