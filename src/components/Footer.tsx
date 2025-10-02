import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Program Kursus", path: "/courses" },
    { name: "Blog & Artikel", path: "/blog" },
    { name: "Kontak", path: "/contact" }
  ];

  const courses = [
    { name: "Programming Python & Java", path: "/courses#programming" },
    { name: "Scratch Programming", path: "/courses#scratch" },
    { name: "Microsoft Office", path: "/courses#office" },
    { name: "Network Administration", path: "/courses#networking" }
  ];

  return (
    <footer className="bg-education-gray-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {/* Updated logo dengan URL baru */}
              <img 
              src="https://cdn.ahsakreatif.com/radar/img/logo/radar-edu.png" 
              alt="RADAR Logo" 
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
                style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Media meningkatkan skill dalam bidang IT. Bergabunglah dengan ribuan alumni 
              yang telah sukses berkarir di industri teknologi.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/6285782763529" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Menu Utama</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Program Kursus</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.path}>
                  <Link 
                    to={course.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Jl. Pinang-Kunciran No.114, RT.003/RW.005</div>
                  <div>Kunciran, Kec. Pinang, Kota Tangerang, Banten 15144</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="tel:+6285782763529" className="hover:text-white transition-colors">
                    0857-8276-3529
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="mailto:asep@radarteknologikomputer.id" className="hover:text-white transition-colors">
                    asep@radarteknologikomputer.id
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Senin - Jumat: 10:00 - 20:00</div>
                  <div>Sabtu: 10:00 - 16:00</div>
                  <div>Minggu: Tutup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} PT. Radar Teknologi Komputer Education. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;