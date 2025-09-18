import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { 
  Code, 
  Palette, 
  FileText, 
  Network, 
  Star, 
  Users, 
  Award, 
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Quote
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import instructorImage from "@/assets/instructor-teaching.jpg";
import programmingImage from "@/assets/programming-course.jpg";
import scratchImage from "@/assets/scratch-course.jpg";
import officeImage from "@/assets/office-course.jpg";
import networkingImage from "@/assets/networking-course.jpg";

const Index = () => {
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(4, 200);
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: testimonialsRef, visibleItems: testimonialVisible } = useStaggeredAnimation(3, 150);

  const services = [
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Programming",
      description: "Python, Java fundamentals untuk membangun foundation programming yang kuat",
      courses: ["Python Basics", "Java OOP", "Web Development"],
      image: programmingImage,
      link: "/courses#programming"
    },
    {
      icon: <Palette className="w-12 h-12 text-primary" />,
      title: "Scratch Programming",
      description: "Visual programming untuk pemula dan anak-anak dengan pendekatan yang menyenangkan",
      courses: ["Scratch Basics", "Game Creation", "Interactive Stories"],
      image: scratchImage,
      link: "/courses#scratch"
    },
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
      title: "Microsoft Office",
      description: "Kuasai Word, Excel, PowerPoint untuk produktivitas maksimal di tempat kerja",
      courses: ["Word Advanced", "Excel Mastery", "PowerPoint Design"],
      image: officeImage,
      link: "/courses#office"
    },
    {
      icon: <Network className="w-12 h-12 text-primary" />,
      title: "Networking",
      description: "Network administration dan cybersecurity untuk infrastruktur IT modern",
      courses: ["Network Fundamentals", "Cisco Config", "Security Basics"],
      image: networkingImage,
      link: "/courses#networking"
    }
  ];

  const testimonials = [
    {
      name: "Sarah",
      role: "Pelajar",
      company: "SMA Negeri 1",
      content: "Tempat kursus ini benar-benar bagus! Instruktur sangat ramah dan sabar dalam menjelaskan setiap konsep. Saya sekarang memiliki pemahaman yang lebih baik tentang dunia komputer dan merasa lebih siap untuk melanjutkan studi di perguruan tinggi.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Daniel", 
      role: "Mahasiswa",
      company: "Universitas Bina Nusantara",
      content: "Saya sangat puas mengikuti kursus di sini. Instruktur sangat kompeten dan materi yang diajarkan sangat relevan dengan perkembangan IT. Saya merasa lebih percaya diri dalam menghadapi tugas kuliah setelah mengikuti kursus ini.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Maria",
      role: "Mahasiswa",
      company: "Universitas Indonesia", 
      content: "Tempat kursus ini memberikan pengalaman belajar yang sangat baik. Materi disampaikan dengan cara yang mudah dipahami, dan fasilitas yang disediakan sangat memadai. Saya telah meningkatkan keterampilan teknis saya dan merasa lebih siap untuk menghadapi tugas-tugas ke depannya.",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Instruktur Berpengalaman",
      description: "Tim instruktur dengan pengalaman industri 10+ tahun"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Sertifikat Resmi",
      description: "Sertifikat yang diakui industri dan lembaga pendidikan"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Jadwal Fleksibel",
      description: "Kelas pagi, siang, dan malam sesuai kebutuhan Anda"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Praktek Intensif",
      description: "70% praktek langsung untuk hasil pembelajaran optimal"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 animate-fade-in">
                #1 IT Training Center di Tangerang
              </Badge>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-slide-up">
                Media Meningkatkan
                <span className="block gradient-text-animated bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Skill dalam Bidang IT</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-lg animate-fade-in-delayed">
                Bergabunglah dengan RADAR Education Center dan kembangkan skill IT Anda 
                dari level pemula hingga profesional dengan kurikulum terkini dan instruktur berpengalaman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-stagger-1">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-hero hover-lift btn-interactive">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Mulai Belajar Sekarang
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary smooth-transition btn-interactive">
                  Lihat Program Kursus
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 stagger-children">
                <div className="text-center hover-scale smooth-transition">
                  <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">1000+</div>
                  <div className="text-sm opacity-75">Siswa Terdidik</div>
                </div>
                <div className="text-center hover-scale smooth-transition">
                  <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm opacity-75">Program Kursus</div>
                </div>
                <div className="text-center hover-scale smooth-transition">
                  <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">10+</div>
                  <div className="text-sm opacity-75">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:block hidden">
              <div className="max-w-max mx-auto">
                <div className="flex flex-col space-y-6">
                  {/* Instructor Card 1 */}
                  <div className="w-64 p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-2xl animate-scale-in-bounce pulse-border">
                    <div className="flex items-center gap-4">
                      <img 
                        src={instructorImage} 
                        alt="Asep Surahmat M.Kom" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 hover-scale smooth-transition"
                      />
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-gray-900 hover:text-primary smooth-transition">Asep Surahmat M.Kom</h3>
                        <p className="text-sm text-gray-500 mb-2">Pengajar</p>
                        <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full hover-scale smooth-transition">
                          <MapPin className="w-3 h-3 text-primary animate-pulse-soft" />
                          <span className="text-xs text-gray-700 font-medium">Pinang, ID</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructor Card 2 */}
                  <div className="w-64 p-4 bg-white hover-lift shadow-card hover:shadow-card-hover smooth-transition rounded-2xl animate-scale-in-bounce pulse-border" 
                       style={{ animationDelay: "300ms" }}>
                    <div className="flex items-center gap-4">
                      <img 
                        src={instructorImage} 
                        alt="Rizqi Darmawan" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 hover-scale smooth-transition"
                      />
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-gray-900 hover:text-primary smooth-transition">Rizqi Darmawan</h3>
                        <p className="text-sm text-gray-500 mb-2">Pengajar</p>
                        <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-700">Karawaci, ID</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 animate-fade-in">Program Unggulan</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 animate-slide-up">
              4 Kategori Kursus Terpopuler
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-delayed">
              Pilih program yang sesuai dengan minat dan kebutuhan karir Anda. 
              Dari programming hingga office skills, semua tersedia di sini.
            </p>
          </div>
          
          <div ref={servicesRef as any} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`group hover-lift shadow-card hover:shadow-card-hover smooth-transition overflow-hidden pulse-border transition-all duration-700 ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 smooth-transition"></div>
                  <div className="absolute bottom-4 left-4 text-white group-hover:scale-110 group-hover:text-primary smooth-transition">
                    {service.icon}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 smooth-transition">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className="font-heading font-bold text-lg mb-3 group-hover:text-primary smooth-transition gradient-text-animated">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {service.courses.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground smooth-transition group/item">
                        <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 group-hover/item:scale-110 smooth-transition" />
                        {course}
                      </div>
                    ))}
                  </div>
                  
                  <Link to={service.link}>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white smooth-transition btn-interactive hover-glow">
                      Pelajari Lebih Lanjut
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transition" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef as any} className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`relative transition-all duration-700 ${
              aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <img 
                src={instructorImage} 
                alt="RADAR Education Center - Pengajar Profesional" 
                className="rounded-2xl shadow-card w-full hover-scale smooth-transition"
              />
              <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-card hover-lift animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1 gradient-text-animated">15+</div>
                  <div className="text-sm opacity-90">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-200 ${
              aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              <Badge className="mb-4 animate-scale-in">Tentang Kami</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 gradient-text-animated">
                PT. Radar Teknologi Komputer Education Center
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Sejak didirikan, RADAR Education Center telah menjadi pionir dalam pendidikan IT di Indonesia. 
                Kami berkomitmen untuk menjadi media terdepan dalam meningkatkan skill teknologi untuk semua kalangan, 
                dari tingkat dasar hingga mahir.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 hover-lift smooth-transition transition-all duration-700 ${
                      aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover-scale animate-pulse-soft">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 hover:text-primary smooth-transition">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <Link to="/about">
                  <Button className="hero-gradient hover-glow btn-interactive">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transition" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="hover-lift btn-interactive">
                    Konsultasi Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimoni</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Testimoni
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dengarkan cerita sukses dari alumni yang telah mengembangkan karir mereka 
              setelah belajar di RADAR Education Center.
            </p>
          </div>
          
          <div ref={testimonialsRef as any} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-card-hover hover-lift smooth-transition transition-all duration-700 ${
                  testimonialVisible.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Siap Memulai Perjalanan IT Anda?
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Bergabunglah dengan ribuan alumni yang telah sukses berkarir di bidang IT. 
                Konsultasi gratis untuk menentukan program yang tepat untuk Anda.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>0857-8276-3529 (WhatsApp tersedia)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>asep@radarteknologikomputer.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Jl. Pinang-Kunciran No.114, RT.003/RW.005, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144</span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-block p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <h3 className="text-2xl font-heading font-bold mb-4">Konsultasi Gratis</h3>
                <p className="opacity-90 mb-6">
                  Diskusikan kebutuhan dan tujuan karir Anda dengan tim kami
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                      Hubungi Kami Sekarang
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">
                      Lihat Semua Kursus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Alumni Tersertifikasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Program Kursus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Tingkat Kelulusan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Online</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;