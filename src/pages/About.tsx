import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, BookOpen, Target, Clock } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import instructorImage from "@/assets/instructor-teaching.jpg";

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-100px" });
  const { ref: valuesRef, visibleItems: valueItems } = useStaggeredAnimation(4, 180, 300);
  const { ref: instructorsRef, visibleItems: instructorItems } = useStaggeredAnimation(2, 200, 250);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,  
      title: "SD - PERGURUAN TINGGI",
      description: "Radar education center membuka pembelajaran dari pendidikan SD s/d Perguruan Tinggi"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "SERTIFIKAT", 
      description: "Sertifikat sering kali dianggap sebagai tambahan yang bernilai pada resume atau portofolio seseorang karena menunjukkan dedikasi, pencapaian, dan kompetensi yang dimiliki oleh pemilik sertifikat tersebut"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "BELAJAR FLEKSIBEL",
      description: "Pembelajaran Fleksibel yang memungkinkan akses materi kapan pun dimana pun melalui perangkat digital. Selain itu, ada juga pendekatan belajar mandiri yang memberikan ruang bagi seseorang untuk mengatur waktu belajar sesuai dengan kebutuhan dan tingkat pemahaman mereka"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "KURIKULUM TERKINI",
      description: "Menggunakan kurikulum yang selalu diperbarui sesuai dengan perkembangan zaman dan kebutuhan industri, memastikan siswa mendapatkan pengetahuan yang relevan dan aplikatif"
    }
  ];

  const instructors = [
    {
      name: "Asep Surahmat M.Kom",
      title: "Lead Instructor & Founder",
      specialization: "Programming, Database, System Analysis",
      experience: "15+ tahun pengalaman di industri IT",
      image: instructorImage
    },
    {
      name: "Rizqi Darmawan",
      title: "Senior Instructor",
      specialization: "Networking, Security, Infrastructure",
      experience: "10+ tahun pengalaman networking",
      image: instructorImage
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            Tentang RADAR Education Center
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            PT. Radar Teknologi Komputer Education Center telah menjadi pionir dalam pendidikan IT di Indonesia, 
            mengembangkan skill teknologi untuk semua kalangan dari tingkat dasar hingga mahir.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section ref={storyRef as any} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out ${
              storyVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-20 scale-95'
            }`}>
              <h2 className="text-3xl font-heading font-bold mb-6 gradient-text-animated">
                Media Meningkatkan Skill dalam Bidang IT
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Radar Education Center merupakan pusat pendidikan yang didedikasikan untuk memajukan 
                keterampilan dan pengetahuan Anda di bidang IT. Sebagai mitra dalam perjalanan pendidikan Anda, 
                Radar Education Center menawarkan pengalaman belajar yang inovatif dan berorientasi pada praktik, 
                membantu Anda mempersiapkan diri untuk tantangan yang terus berkembang di dunia IT.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Radar Education Center menawarkan beragam program pelatihan IT yang dirancang oleh para ahli industri. 
                Mulai dari pemrograman hingga keamanan informasi, program kami mencakup spektrum luas keterampilan 
                yang dibutuhkan dalam dunia kerja saat ini. Dengan fokus pada pendekatan praktis, Anda akan mengasah 
                keterampilan sehari-hari yang dapat diterapkan secara langsung dalam pekerjaan.
              </p>
              <div className={`grid grid-cols-2 gap-4 transition-all duration-800 ease-out delay-500 ${
                storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center p-4 hover-scale smooth-transition">
                  <div className="text-3xl font-bold text-primary mb-2 gradient-text-animated">1000+</div>
                  <div className="text-sm text-muted-foreground">Siswa Terdidik</div>
                </div>
                <div className="text-center p-4 hover-scale smooth-transition">
                  <div className="text-3xl font-bold text-primary mb-2 gradient-text-animated">50+</div>
                  <div className="text-sm text-muted-foreground">Program Kursus</div>
                </div>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 ease-out delay-300 ${
              storyVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'
            }`}>
              <img 
                src={instructorImage} 
                alt="RADAR Education Center Classroom" 
                className="rounded-lg shadow-card-hover w-full hover-scale smooth-transition"
              />
              <div className={`absolute -bottom-6 -left-6 bg-white text-primary p-6 rounded-xl shadow-card hover-lift smooth-transition transition-all duration-800 ease-out delay-700 ${
                storyVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
              }`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1 gradient-text-animated">15+</div>
                  <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 gradient-text-animated">Mengapa Memilih RADAR?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi kami dalam memberikan pendidikan IT terbaik
            </p>
          </div>
          <div ref={valuesRef as any} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center hover:shadow-card-hover pulse-border hover-lift smooth-transition transition-all duration-800 ease-out ${
                  valueItems.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                }`}
              >
                <div className="flex justify-center mb-4 hover-scale smooth-transition">{value.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-3 hover:text-primary smooth-transition">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 gradient-text-animated">Tim Instruktur</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Instruktur berpengalaman dengan keahlian mendalam di bidang teknologi
            </p>
          </div>
          <div ref={instructorsRef as any} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((instructor, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden hover:shadow-card-hover pulse-border hover-lift smooth-transition transition-all duration-800 ease-out ${
                  instructorItems.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 smooth-transition"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2 hover:text-primary smooth-transition">{instructor.name}</h3>
                  <Badge variant="secondary" className="mb-3 hover-scale smooth-transition">{instructor.title}</Badge>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{instructor.specialization}</p>
                  <p className="text-sm text-primary font-medium hover:text-primary/80 smooth-transition">{instructor.experience}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section ref={ctaRef as any} className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-heading font-bold mb-4 transition-all duration-800 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Siap Meningkatkan Skill IT Anda?
          </h2>
          <p className={`text-xl opacity-90 mb-8 transition-all duration-800 ease-out delay-200 ${
            ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Bergabunglah dengan ribuan siswa yang telah mempercayai RADAR Education Center
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 ease-out delay-400 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 smooth-transition"
            >
              Hubungi Kami
            </a>
            <a 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:scale-105 smooth-transition"
            >
              Lihat Kursus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;