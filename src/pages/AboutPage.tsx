import { Card } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            Tentang Kami
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            Media Meningkatkan Skill dalam Bidang IT
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 lg:p-12 shadow-card-hover">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-6">Tentang Kami</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>
                Radar Education Center merupakan pusat pendidikan yang didedikasikan untuk memajukan 
                keterampilan dan pengetahuan Anda di bidang IT. Sebagai mitra dalam perjalanan pendidikan Anda, 
                Radar Education Center menawarkan pengalaman belajar yang inovatif dan berorientasi pada praktik, 
                membantu Anda mempersiapkan diri untuk tantangan yang terus berkembang di dunia IT.
              </p>
              
              <p>
                Radar Education Center menawarkan beragam program pelatihan IT yang dirancang oleh para ahli industri. 
                Mulai dari pemrograman hingga keamanan informasi, program kami mencakup spektrum luas keterampilan 
                yang dibutuhkan dalam dunia kerja saat ini. Dengan fokus pada pendekatan praktis, Anda akan mengasah 
                keterampilan sehari-hari yang dapat diterapkan secara langsung dalam pekerjaan.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Mari bersama-sama mengembangkan skill IT Anda untuk masa depan yang lebih cerah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/courses" 
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Lihat Program Kursus
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;