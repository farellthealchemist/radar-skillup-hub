import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Mohon isi semua field",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui Syarat & Ketentuan",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Berhasil!",
      description: "Anda berhasil masuk",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreedToTerms: checked,
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-education-gray-light via-white to-education-gray-light py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-4 sm:mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Masuk
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Masuk ke akun RADAR Anda
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 animate-scale-in border border-education-gray-light">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="password" className="text-xs sm:text-sm">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 pt-1">
              <Link 
                to="/register" 
                className="text-xs sm:text-sm text-primary hover:text-accent transition-colors"
              >
                Belum punya akun?
              </Link>
              <Link 
                to="#" 
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={handleCheckboxChange}
                className="mt-0.5 h-4 w-4"
              />
              <Label 
                htmlFor="terms" 
                className="text-xs leading-snug cursor-pointer text-muted-foreground flex-1"
              >
                Dengan masuk, Anda menyetujui{" "}
                <Link to="#" className="text-primary hover:text-accent transition-colors font-medium">
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link to="#" className="text-primary hover:text-accent transition-colors font-medium">
                  Kebijakan Privasi
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 h-9 sm:h-10 text-sm"
            >
              Masuk
            </Button>

            <div className="relative my-3 sm:my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-education-gray-light"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-muted-foreground">
                  Atau
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-9 sm:h-10 text-xs sm:text-sm"
            >
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Masuk dengan Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;