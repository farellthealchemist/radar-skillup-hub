import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.courses'), path: "/courses" },
    { name: t('nav.blog'), path: "/blog" },
    { name: t('nav.contact'), path: "/contact" },
  ];

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                RADAR Education
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(item.path)
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">0857-8276-3529</span>
              </div>
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <button
                  onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded"
                >
                  {language === 'id' ? 'EN' : 'ID'}
                </button>
              </div>
              
              <Button size="sm" className="hero-gradient text-sm px-4 py-2">
                {t('nav.register')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>0857-8276-3529</span>
                  </div>
                  
                  {/* Mobile Language Switcher */}
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <button
                      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {language === 'id' ? 'English' : 'Bahasa Indonesia'}
                    </button>
                  </div>
                  
                  <Button size="sm" className="hero-gradient w-full">
                    {t('nav.register')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navigation;