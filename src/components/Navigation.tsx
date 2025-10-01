import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    { name: "Blog", path: "/blog" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - With elegant animation */}
          <Link 
            to="/" 
            className={`flex items-center transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <img 
              src="https://cdn.ahsakreatif.com/radar/img/logo/radar-edu.png" 
              alt="RADAR Logo" 
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              style={{ 
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '0'
              }}
            />
          </Link>

          {/* Desktop Navigation - Staggered animation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-500 ease-out hover:text-teal-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive(item.path)
                    ? "text-teal-600 after:scale-x-100"
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

          {/* CTA - Delayed animation */}
          <div className={`hidden lg:flex items-center transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '700ms' }}>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/50">
                Daftar Sekarang
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - With animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md text-foreground hover:text-teal-600 hover:bg-teal-50 transition-all duration-500 ease-out hover:scale-110 ${
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
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-all duration-500 ease-out hover:text-teal-600 hover:translate-x-2 ${
                    isActive(item.path) ? "text-teal-600" : "text-foreground"
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
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/50">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;