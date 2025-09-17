import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, BookOpen, Target, Clock } from "lucide-react";
import instructorImage from "@/assets/instructor-teaching.jpg";

const About = () => {
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Siswa Terdidik</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Program Kursus</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={instructorImage} 
                alt="RADAR Education Center Classroom" 
                className="rounded-lg shadow-card-hover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Mengapa Memilih RADAR?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi kami dalam memberikan pendidikan IT terbaik
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Tim Instruktur</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Instruktur berpengalaman dengan keahlian mendalam di bidang teknologi
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {instructors.map((instructor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-card-hover transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">{instructor.name}</h3>
                  <Badge variant="secondary" className="mb-3">{instructor.title}</Badge>
                  <p className="text-muted-foreground mb-3">{instructor.specialization}</p>
                  <p className="text-sm text-primary font-medium">{instructor.experience}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Siap Meningkatkan Skill IT Anda?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Bergabunglah dengan ribuan siswa yang telah mempercayai RADAR Education Center
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Hubungi Kami
            </a>
            <a 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
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