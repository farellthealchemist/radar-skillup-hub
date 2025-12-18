import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoaded } = useHeaderAnimation();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Berhasil keluar",
        description: "Anda telah keluar dari akun",
      });
      navigate("/");
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal keluar",
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const baseNavItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Kursus", path: "/courses" },
    { name: "FAQ", path: "/faq" },
    { name: "Kontak", path: "/contact" },
  ];

  const navItems = isLoggedIn 
    ? [...baseNavItems, { name: "Dashboard", path: "/dashboard" }]
    : baseNavItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-500 ease-out hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive(item.path)
                    ? "text-red-600 after:scale-x-100"
                    : "text-foreground"
                } ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`hidden lg:flex items-center space-x-3 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '700ms' }}>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-red-600 text-red-600"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-red-600 text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-red-600 text-red-600"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md text-foreground hover:text-red-600 hover:bg-red-50 transition-all duration-500 ease-out hover:scale-110 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="transition-transform duration-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 pb-6 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-all duration-500 ease-out hover:text-red-600 hover:translate-x-2 ${
                    isActive(item.path) ? "text-red-600" : "text-foreground"
                  } ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'  
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              <div className={`pt-4 border-t space-y-3 transition-all duration-500 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: '250ms' }}>
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-600 text-red-600 w-full h-10"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-600 text-red-600 w-full h-10"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-600 text-red-600 w-full h-10"
                      >
                        Masuk
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white w-full h-10"
                      >
                        Daftar Sekarang
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;