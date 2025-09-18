import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";
import FAQ from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "-100px" });
  const { ref: contactInfoRef, visibleItems: infoItems } = useStaggeredAnimation(4, 150, 200);
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih telah menghubungi kami. Tim kami akan segera merespons.",
      });
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
  {
  icon: <MapPin className="w-6 h-6 text-primary" />,
  title: "Alamat",
  details: [
    "Jl. Pinang-Kunciran No.114, RT.003/RW.005",
    "Kunciran, Kec. Pinang",
    "Kota Tangerang, Banten 15144"
  ]
  },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telepon",
      details: [
        "0857-8276-3529",
        "WhatsApp tersedia"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      details: [
        "asep@radarteknologikomputer.id",
        "info@radarteknologikomputer.id"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 10:00 - 20:00",
        "Sabtu: 10:00 - 16:00", 
        "Minggu: Tutup"
      ]
    }
  ];

  const faqs = [
    {
      question: "Bagaimana jika tidak memiliki latar belakang IT?",
      answer: "Tidak masalah! Program kami dirancang untuk semua level, termasuk pemula tanpa latar belakang IT. Instruktur kami akan membantu Anda dari dasar hingga mahir."
    },
    {
      question: "Apakah ada kelas FullStack Web Development?",
      answer: "Saat ini kami fokus pada fundamental programming (Python, Java). Untuk FullStack development, Anda bisa mengikuti program programming terlebih dahulu sebagai foundation."
    },
    {
      question: "Apakah pembayaran dapat dilakukan dengan cara mencicil?",
      answer: "Ya, kami menyediakan sistem pembayaran cicilan yang fleksibel untuk memudahkan siswa mengikuti program kursus."
    },
    {
      question: "Apakah ada kelas coding untuk anak SD?",
      answer: "Ya! Kami memiliki program Scratch yang khusus dirancang untuk anak-anak SD. Program ini mengajarkan logika programming dengan cara yang menyenangkan dan mudah dipahami."
    },
    {
      question: "Apakah setelah mengikuti kursus ini bisa dapat pekerjaan di bidang IT?",
      answer: "Program kami dirancang untuk mempersiapkan siswa dengan skill yang dibutuhkan industri IT. Banyak alumni kami yang berhasil berkarir di bidang IT setelah menyelesaikan program."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section ref={heroRef as any} className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-heading font-bold mb-6 transition-all duration-800 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Hubungi Kami
          </h1>
          <p className={`text-xl max-w-3xl mx-auto opacity-90 transition-all duration-800 ease-out delay-300 ${
            heroVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Punya pertanyaan tentang program kursus? Tim kami siap membantu Anda 
            menemukan program yang tepat untuk mengembangkan skill IT Anda.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={contactRef as any} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className={`p-8 shadow-card-hover hover-lift pulse-border smooth-transition transition-all duration-1000 ease-out ${
              contactVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-20 scale-95'
            }`}>
              <h2 className="text-2xl font-heading font-bold mb-6 gradient-text-animated">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nomor HP</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Program Kursus</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Pilih Program</option>
                      <option value="programming">Programming</option>
                      <option value="scratch">Scratch</option>
                      <option value="office">Microsoft Office</option>
                      <option value="networking">Networking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pesan *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                    rows={4}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full hero-gradient" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              contactVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'
            }`}>
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6 gradient-text-animated">Informasi Kontak</h2>
                <div ref={contactInfoRef as any} className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      className={`p-6 hover:shadow-card-hover hover-lift pulse-border smooth-transition transition-all duration-800 ease-out ${
                        infoItems.includes(index) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover-scale animate-pulse-soft">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 hover:text-primary smooth-transition">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Kontak Cepat</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/6285782763529" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">Respon cepat dalam 5 menit</div>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800">Online</Badge>
                  </a>
                  
                  <a 
                    href="tel:+6285782763529" 
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Telepon Langsung</div>
                      <div className="text-sm text-muted-foreground">0857-8276-3529</div>
                    </div>
                  </a>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef as any} className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-800 ease-out ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-heading font-bold mb-4 gradient-text-animated">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-muted-foreground text-lg">
              Temukan jawaban untuk pertanyaan umum seputar program kursus kami
            </p>
          </div>
          
          <div className={`transition-all duration-800 ease-out delay-300 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef as any} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-800 ease-out ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-heading font-bold mb-4 gradient-text-animated">Lokasi Kami</h2>
            <p className="text-muted-foreground">
              Kunjungi langsung kantor kami di Tangerang untuk konsultasi tatap muka
            </p>
          </div>
          <Card className={`overflow-hidden hover-lift shadow-card hover:shadow-card-hover smooth-transition transition-all duration-800 ease-out delay-300 ${
            mapVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}>
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4 hover-scale animate-pulse-soft" />
                <h3 className="font-semibold text-lg mb-2 hover:text-primary smooth-transition">RADAR Education Center</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jl. Pinang-Kunciran No.114, RT.003/RW.005, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144
                </p>
                <Button className="mt-4 hover-glow btn-interactive" variant="outline"
                onClick={() => window.open('https://maps.app.goo.gl/iKmXrw9u4ecF129T8', '_blank')}>
                  Buka di Google Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;