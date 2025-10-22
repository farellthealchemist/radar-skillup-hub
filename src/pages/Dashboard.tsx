import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Phone, BookOpen, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);
      await fetchProfile(session.user.id);
      await fetchRegistrations(session.user.id);
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchRegistrations = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('registrations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', variant: 'default' as const, icon: Clock },
      approved: { label: 'Disetujui', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Ditolak', variant: 'destructive' as const, icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getCourseLabel = (courseValue: string) => {
    const courses: Record<string, string> = {
      'programming': 'Programming Fundamentals',
      'scratch': 'Scratch Visual Programming',
      'office': 'Microsoft Office Mastery',
      'networking': 'Network Administration'
    };
    return courses[courseValue] || courseValue;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Selamat datang kembali, {profile?.full_name || 'User'}!
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profil Saya</TabsTrigger>
            <TabsTrigger value="registrations">Pendaftaran Kursus</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  Informasi Profil
                </CardTitle>
                <CardDescription>
                  Detail informasi akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      Nama Lengkap
                    </label>
                    <p className="text-gray-900">{profile?.full_name || '-'}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email
                    </label>
                    <p className="text-gray-900">{user?.email || '-'}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Nomor Telepon
                    </label>
                    <p className="text-gray-900">{profile?.phone || '-'}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      Bergabung Sejak
                    </label>
                    <p className="text-gray-900">
                      {profile?.created_at 
                        ? new Date(profile.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  Pendaftaran Kursus Saya
                </CardTitle>
                <CardDescription>
                  Daftar kursus yang telah Anda daftarkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Belum ada pendaftaran kursus</p>
                    <a 
                      href="/register"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Daftar Kursus Sekarang
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((registration) => (
                      <div 
                        key={registration.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {getCourseLabel(registration.course)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Didaftarkan pada {new Date(registration.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          {getStatusBadge(registration.status)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {registration.schedule_preference && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>Jadwal: {registration.schedule_preference}</span>
                            </div>
                          )}
                          
                          {registration.previous_experience && (
                            <div className="flex items-start gap-2 text-gray-700">
                              <span className="text-gray-500">Pengalaman:</span>
                              <span>{registration.previous_experience}</span>
                            </div>
                          )}
                        </div>

                        {registration.expectations && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Harapan: </span>
                              {registration.expectations}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
