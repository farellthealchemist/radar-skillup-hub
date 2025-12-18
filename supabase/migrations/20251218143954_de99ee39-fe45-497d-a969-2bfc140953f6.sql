-- Create blog_posts table for storing articles
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Admin RADAR',
  author_avatar TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (blog posts are public)
CREATE POLICY "Blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (true);

-- Create index for faster slug lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index for category filtering
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, author_name, is_featured, read_time, thumbnail_url) VALUES
('Cara Efektif Belajar Pemrograman untuk Pemula', 'cara-efektif-belajar-pemrograman', 'Pelajari strategi dan tips terbaik untuk memulai perjalanan belajar pemrograman Anda dengan langkah yang tepat.', 'Belajar pemrograman membutuhkan pendekatan yang sistematis. Mulailah dengan memahami konsep dasar seperti variabel, loop, dan kondisional. Praktik secara konsisten setiap hari, minimal 30 menit. Pilih satu bahasa pemrograman dan kuasai dulu sebelum pindah ke bahasa lain. Python sangat direkomendasikan untuk pemula karena sintaksnya yang sederhana dan mudah dipahami.', 'Pemrograman', 'Tim RADAR', true, '8 min read', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'),
('Mengenal Jaringan Komputer: Panduan Lengkap', 'mengenal-jaringan-komputer', 'Pahami dasar-dasar jaringan komputer dan bagaimana internet bekerja dalam kehidupan sehari-hari.', 'Jaringan komputer adalah sistem yang menghubungkan dua atau lebih perangkat untuk berbagi sumber daya dan informasi. Ada beberapa jenis jaringan: LAN (Local Area Network), WAN (Wide Area Network), dan MAN (Metropolitan Area Network). Protokol TCP/IP adalah fondasi dari komunikasi internet modern.', 'Jaringan', 'Tim RADAR', false, '6 min read', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'),
('Tips Sukses Belajar Online di Era Digital', 'tips-sukses-belajar-online', 'Maksimalkan pengalaman belajar online Anda dengan strategi yang terbukti efektif.', 'Belajar online membutuhkan disiplin dan manajemen waktu yang baik. Buat jadwal belajar yang konsisten, siapkan ruang belajar yang nyaman, dan minimalkan distraksi. Gunakan teknik pomodoro untuk menjaga fokus. Jangan ragu bertanya kepada mentor atau bergabung dengan komunitas belajar.', 'Tips Belajar', 'Tim RADAR', true, '5 min read', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800'),
('Scratch untuk Anak: Pengenalan Coding yang Menyenangkan', 'scratch-untuk-anak', 'Kenalkan anak-anak pada dunia pemrograman melalui Scratch yang interaktif dan menyenangkan.', 'Scratch adalah platform pemrograman visual yang dirancang khusus untuk anak-anak usia 8-16 tahun. Dengan Scratch, anak-anak bisa membuat cerita interaktif, game, dan animasi sambil belajar konsep pemrograman dasar. Platform ini gratis dan bisa diakses melalui browser.', 'Pemrograman', 'Tim RADAR', false, '4 min read', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'),
('Membangun Karir di Bidang IT: Panduan Lengkap', 'membangun-karir-it', 'Pelajari langkah-langkah strategis untuk memulai dan mengembangkan karir di industri teknologi.', 'Industri IT menawarkan berbagai peluang karir yang menjanjikan. Mulai dari web developer, data analyst, hingga cybersecurity specialist. Kunci sukses adalah terus belajar dan mengikuti perkembangan teknologi. Bangun portfolio yang kuat dan aktif berkontribusi di komunitas open source.', 'Karir', 'Tim RADAR', false, '7 min read', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'),
('Pentingnya Keamanan Siber di Era Digital', 'pentingnya-keamanan-siber', 'Lindungi data dan privasi Anda dengan memahami dasar-dasar keamanan siber.', 'Keamanan siber menjadi semakin penting seiring meningkatnya aktivitas online. Gunakan password yang kuat dan unik untuk setiap akun. Aktifkan two-factor authentication. Waspadai phishing dan social engineering. Update software secara berkala untuk menutup celah keamanan.', 'Keamanan', 'Tim RADAR', false, '6 min read', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800');