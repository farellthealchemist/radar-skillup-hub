import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderAnimation } from "@/hooks/useScrollAnimation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoaded } = useHeaderAnimation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kursus", path: "/courses" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - With elegant animation */}
          <Link 
            to="/" 
            className={`flex items-center space-x-2 transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <img 
              src="https://radarteknologikomputer.id/upload/01HH6SVBHE39X68755WZ5ZP8YV.png" 
              alt="RADAR Logo" 
              className="w-8 h-8 object-contain transition-transform duration-300 hover:scale-110"
              style={{ 
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '0'
              }}
            />
            <span className="font-heading font-bold text-xl text-primary hover:text-primary/80 transition-colors duration-300">
              RADAR Education Center
            </span>
          </Link>

        {/* Desktop Navigation - Staggered animation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-all duration-500 ease-out hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                isActive(item.path)
                  ? "text-primary after:scale-x-100"
                  : "text-foreground"
              } ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${200 + (index * 100)}ms` 
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Tablet Navigation - Medium screens */}
        <div className="hidden md:flex lg:hidden items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-sm transition-all duration-500 ease-out hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                isActive(item.path)
                  ? "text-primary after:scale-x-100"
                  : "text-foreground"
              } ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${200 + (index * 80)}ms` 
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

          {/* Contact Info & CTA - Delayed animation */}
          <div className={`hidden lg:flex items-center space-x-4 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '700ms' }}>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Phone className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              <span>0857-8276-3529</span>
            </div>
            <Button size="sm" className="hero-gradient hover:scale-105 transition-transform duration-300">
              Daftar Sekarang
            </Button>
          </div>

          {/* Mobile menu button - With animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:lg:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-all duration-500 ease-out hover:scale-110 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="transition-transform duration-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Smooth slide animation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-all duration-500 ease-out hover:text-primary hover:translate-x-2 ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  } ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'  
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              <div className={`pt-4 border-t transition-all duration-500 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: '250ms' }}>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3 hover:text-foreground transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <span>0857-8276-3529</span>
                </div>
                <Button size="sm" className="hero-gradient w-full hover:scale-105 transition-transform duration-300">
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;