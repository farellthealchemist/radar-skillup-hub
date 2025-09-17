import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, BookOpen } from "lucide-react";
import programmingImage from "@/assets/programming-course.jpg";
import scratchImage from "@/assets/scratch-course.jpg";
import officeImage from "@/assets/office-course.jpg";
import networkingImage from "@/assets/networking-course.jpg";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Programming Fundamentals",
      category: "Programming",
      description: "Pelajari dasar-dasar pemrograman dengan Python dan Java. Cocok untuk pemula yang ingin memulai karir di bidang software development.",
      image: programmingImage,
      duration: "3 Bulan",
      students: "150+ Siswa",
      level: "Pemula - Menengah",
      price: "Rp 2.500.000",
      features: [
        "Python Programming",
        "Java Fundamentals", 
        "Database Basics",
        "Web Development Intro",
        "Proyek Akhir"
      ],
      learningOutcomes: [
        "Menguasai sintaks Python dan Java",
        "Memahami konsep OOP",
        "Dapat membuat aplikasi sederhana",
        "Siap untuk advanced programming"
      ]
    },
    {
      id: 2,
      title: "Scratch Visual Programming",
      category: "Programming",
      description: "Pengenalan programming untuk anak-anak dan pemula menggunakan Scratch. Belajar logika programming dengan cara yang menyenangkan.",
      image: scratchImage,
      duration: "1 Bulan",
      students: "200+ Siswa",
      level: "Pemula",
      price: "Rp 750.000",
      features: [
        "Scratch Basics",
        "Game Development",
        "Animation Creation",
        "Interactive Stories",
        "Problem Solving"
      ],
      learningOutcomes: [
        "Memahami logika programming",
        "Dapat membuat game sederhana",
        "Mengembangkan kreativitas",
        "Persiapan untuk text-based programming"
      ]
    },
    {
      id: 3,
      title: "Microsoft Office Mastery",
      category: "Office",
      description: "Kuasai Microsoft Office (Word, Excel, PowerPoint) untuk produktivitas maksimal di tempat kerja dan pendidikan.",
      image: officeImage,
      duration: "2 Bulan",
      students: "300+ Siswa",
      level: "Pemula - Mahir",
      price: "Rp 1.200.000",
      features: [
        "Microsoft Word Advanced",
        "Excel Formulas & Macros",
        "PowerPoint Design",
        "Data Analysis",
        "Business Templates"
      ],
      learningOutcomes: [
        "Mahir menggunakan Word untuk dokumen profesional",
        "Menguasai Excel untuk analisis data",
        "Dapat membuat presentasi menarik",
        "Meningkatkan produktivitas kerja"
      ]
    },
    {
      id: 4,
      title: "Network Administration",
      category: "Networking",
      description: "Pelajari administrasi jaringan, keamanan cyber, dan infrastruktur IT. Ideal untuk IT support dan network administrator.",
      image: networkingImage,
      duration: "4 Bulan",
      students: "100+ Siswa",
      level: "Menengah - Mahir",
      price: "Rp 3.500.000",
      features: [
        "Network Fundamentals",
        "Cisco Configuration",
        "Cybersecurity Basics",
        "Server Administration",
        "Troubleshooting"
      ],
      learningOutcomes: [
        "Dapat merancang jaringan",
        "Menguasai konfigurasi router/switch",
        "Memahami protokol keamanan",
        "Siap kerja sebagai network admin"
      ]
    }
  ];

  const categories = ["Semua", "Programming", "Office", "Networking"];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 animate-fade-in">
            Program Lengkap & Terpercaya
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-slide-up">
            Program Kursus 
            <span className="block gradient-text-animated bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              IT Terbaik
            </span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in-delayed">
            Pilih program kursus yang sesuai dengan kebutuhan dan level skill Anda. 
            Dari pemula hingga profesional, kami ada untuk semua.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 stagger-children">
            <div className="text-center hover-scale smooth-transition">
              <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">4</div>
              <div className="text-sm opacity-75">Program Utama</div>
            </div>
            <div className="text-center hover-scale smooth-transition">
              <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">750+</div>
              <div className="text-sm opacity-75">Alumni</div>
            </div>
            <div className="text-center hover-scale smooth-transition">
              <div className="text-3xl font-bold mb-2 gradient-text-animated bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">95%</div>
              <div className="text-sm opacity-75">Tingkat Kelulusan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 stagger-children">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={category === "Semua" ? "default" : "outline"}
                className="px-6 py-2 hover-lift smooth-transition btn-interactive hover-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 stagger-children">
            {courses.map((course, index) => (
              <Card key={course.id} className="overflow-hidden hover-lift shadow-card hover:shadow-card-hover smooth-transition animate-scale-in-bounce pulse-border group" 
                   style={{ animationDelay: `${index * 200}ms` }}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 smooth-transition"></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="hover-scale smooth-transition bg-white/90 backdrop-blur-sm">{course.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground hover-scale smooth-transition pulse-border">{course.level}</Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 smooth-transition">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse-soft"></div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary smooth-transition gradient-text-animated">{course.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{course.description}</p>
                  
                  {/* Course Stats */}
                  <div className="flex flex-wrap gap-4 mb-4 stagger-children">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground smooth-transition group/stat">
                      <Clock className="w-4 h-4 group-hover/stat:text-primary group-hover/stat:scale-110 smooth-transition" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground smooth-transition group/stat">
                      <Users className="w-4 h-4 group-hover/stat:text-primary group-hover/stat:scale-110 smooth-transition" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground smooth-transition group/stat">
                      <Award className="w-4 h-4 group-hover/stat:text-primary group-hover/stat:scale-110 smooth-transition" />
                      Sertifikat
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 group-hover:text-primary smooth-transition">
                      <BookOpen className="w-4 h-4 group-hover:scale-110 smooth-transition" />
                      Materi Pembelajaran:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs hover-scale smooth-transition hover:border-primary hover:text-primary">
                          {feature}
                        </Badge>
                      ))}
                      {course.features.length > 3 && (
                        <Badge variant="outline" className="text-xs hover-scale smooth-transition hover:border-primary hover:text-primary">
                          +{course.features.length - 3} lainnya
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t group-hover:border-primary/30 smooth-transition">
                    <div className="hover-scale smooth-transition">
                      <div className="text-2xl font-bold text-primary gradient-text-animated">{course.price}</div>
                      <div className="text-sm text-muted-foreground">Per program</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover-glow smooth-transition btn-interactive">
                        Detail
                      </Button>
                      <Button size="sm" className="hero-gradient hover-lift smooth-transition btn-interactive pulse-border">
                        Daftar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Guarantee */}
      <section className="py-16 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-6 animate-fade-in gradient-text-animated">Jaminan Pembelajaran</h2>
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            <div className="p-6 hover-lift smooth-transition group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 smooth-transition pulse-border">
                <Award className="w-6 h-6 text-primary group-hover:animate-bounce-gentle" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary smooth-transition">Sertifikat Resmi</h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground smooth-transition">Dapatkan sertifikat yang diakui industri</p>
            </div>
            <div className="p-6 hover-lift smooth-transition group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 smooth-transition pulse-border">
                <Users className="w-6 h-6 text-primary group-hover:animate-bounce-gentle" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary smooth-transition">Kelas Kecil</h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground smooth-transition">Maksimal 15 siswa per kelas untuk perhatian optimal</p>
            </div>
            <div className="p-6 hover-lift smooth-transition group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 smooth-transition pulse-border">
                <BookOpen className="w-6 h-6 text-primary group-hover:animate-bounce-gentle" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary smooth-transition">Praktek Langsung</h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground smooth-transition">70% praktek, 30% teori untuk hasil optimal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4 animate-fade-in">
            Mulai Perjalanan IT Anda Hari Ini
          </h2>
          <p className="text-xl opacity-90 mb-8 animate-slide-up">
            Konsultasi gratis untuk menentukan program yang tepat untuk Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-stagger-1">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover-lift smooth-transition btn-interactive pulse-border">
              Konsultasi Gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 smooth-transition btn-interactive hover-glow">
              Download Brosur
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;