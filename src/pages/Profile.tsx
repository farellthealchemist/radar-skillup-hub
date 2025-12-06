import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  phone: z.string().regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor telepon tidak valid (contoh: 081234567890)').or(z.literal('')),
});

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [memberSince, setMemberSince] = useState<string>('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });
  const [originalData, setOriginalData] = useState({
    full_name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ full_name?: string; phone?: string }>({});

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        setUserId(session.user.id);
        setUserEmail(session.user.email || '');
        
        // Format member since date
        const createdAt = new Date(session.user.created_at);
        setMemberSince(createdAt.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }));

        // Fetch profile data
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('full_name, phone')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Error',
            description: 'Gagal memuat data profil',
            variant: 'destructive',
          });
          return;
        }

        if (profile) {
          const profileData = {
            full_name: profile.full_name || '',
            phone: profile.phone || '',
          };
          setFormData(profileData);
          setOriginalData(profileData);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { full_name?: string; phone?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'full_name') fieldErrors.full_name = err.message;
        if (err.path[0] === 'phone') fieldErrors.phone = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: 'Error',
          description: 'Gagal menyimpan perubahan profil',
          variant: 'destructive',
        });
        return;
      }

      setOriginalData(formData);
      setIsEditing(false);
      toast({
        title: 'Berhasil',
        description: 'Profil berhasil diperbarui',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat menyimpan',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark, 0 72% 45%)) 100%); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Profil Saya</h1>
          <p className="text-lg opacity-90">Kelola informasi profil Anda</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-md overflow-hidden border">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-background shadow-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{formData.full_name || 'User'}</h2>
                  <p className="text-muted-foreground mb-1">{userEmail}</p>
                  <p className="text-sm text-muted-foreground">Member sejak: {memberSince}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-foreground">Informasi Pribadi</h3>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 smooth-transition font-medium"
                  >
                    Edit Profil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="px-4 py-2 border-2 border-border text-foreground rounded-lg hover:bg-muted smooth-transition font-medium disabled:opacity-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 smooth-transition font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed bg-background text-foreground"
                  />
                  {errors.full_name && (
                    <p className="text-sm text-destructive mt-1">{errors.full_name}</p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full px-4 py-2 border border-input rounded-lg bg-muted cursor-not-allowed text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email tidak dapat diubah</p>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    placeholder="081234567890"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed bg-background text-foreground"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Additional Settings */}
          <div className="mt-8 bg-card rounded-xl shadow-md p-8 border">
            <h3 className="text-xl font-bold text-foreground mb-6">Pengaturan Akun</h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-border rounded-lg hover:bg-muted smooth-transition">
                <span className="font-medium text-foreground">Ubah Password</span>
                <p className="text-sm text-muted-foreground mt-1">Perbarui password akun Anda</p>
              </button>
              <button className="w-full text-left px-4 py-3 border border-border rounded-lg hover:bg-muted smooth-transition">
                <span className="font-medium text-foreground">Notifikasi</span>
                <p className="text-sm text-muted-foreground mt-1">Kelola preferensi notifikasi</p>
              </button>
              <button className="w-full text-left px-4 py-3 border border-destructive/30 rounded-lg hover:bg-destructive/10 smooth-transition">
                <span className="font-medium text-destructive">Hapus Akun</span>
                <p className="text-sm text-destructive/80 mt-1">Hapus akun dan semua data Anda secara permanen</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
