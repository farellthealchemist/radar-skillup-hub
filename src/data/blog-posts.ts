export interface StaticBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  category: string;
  author_name: string;
  published_at: string;
  is_featured: boolean;
  read_time: string;
}

export const blogPosts: StaticBlogPost[] = [
  {
    id: "1",
    title: "5 Bahasa Pemrograman Paling Dicari di 2024",
    slug: "5-bahasa-pemrograman-paling-dicari-2024",
    excerpt: "Temukan bahasa pemrograman yang paling banyak dicari oleh perusahaan teknologi dan bagaimana mempersiapkan diri untuk menguasainya.",
    content: "Dunia teknologi terus berkembang dengan pesat. Berikut adalah 5 bahasa pemrograman yang paling dicari oleh perusahaan di tahun 2024:\n\n1. Python - Bahasa serbaguna yang digunakan dalam AI, data science, dan web development.\n\n2. JavaScript - Masih menjadi raja di dunia web development dengan ekosistem yang sangat luas.\n\n3. Java - Tetap menjadi pilihan utama untuk pengembangan enterprise dan aplikasi Android.\n\n4. Go - Semakin populer untuk backend development dan microservices.\n\n5. Rust - Menawarkan performa tinggi dengan keamanan memori yang kuat.\n\nDi RADAR Education Center, kami menyediakan program kursus yang mencakup Python dan Java sebagai fondasi programming yang kuat.",
    thumbnail_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    category: "Pemrograman",
    author_name: "Admin RADAR",
    published_at: "2024-03-15",
    is_featured: true,
    read_time: "5 min read",
  },
  {
    id: "2",
    title: "Tips Efektif Belajar Programming untuk Pemula",
    slug: "tips-efektif-belajar-programming-pemula",
    excerpt: "Panduan lengkap bagi pemula yang ingin memulai perjalanan belajar programming dengan cara yang efektif dan terstruktur.",
    content: "Belajar programming bisa terasa menakutkan di awal, tapi dengan pendekatan yang tepat, siapa saja bisa menguasainya.\n\nBerikut tips efektif untuk pemula:\n\n1. Mulai dari yang Dasar - Pahami konsep fundamental seperti variabel, loop, dan kondisi sebelum masuk ke topik advanced.\n\n2. Praktek Setiap Hari - Konsistensi lebih penting daripada durasi belajar yang panjang.\n\n3. Buat Project Nyata - Terapkan apa yang dipelajari ke dalam project yang bermanfaat.\n\n4. Jangan Takut Error - Error adalah bagian normal dari proses belajar.\n\n5. Bergabung dengan Komunitas - Belajar bersama teman dan mentor akan mempercepat proses belajar.",
    thumbnail_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: "Tips Belajar",
    author_name: "Admin RADAR",
    published_at: "2024-02-20",
    is_featured: false,
    read_time: "4 min read",
  },
  {
    id: "3",
    title: "Pentingnya Sertifikasi IT untuk Karir Anda",
    slug: "pentingnya-sertifikasi-it-karir",
    excerpt: "Mengapa sertifikasi IT menjadi faktor penting dalam pengembangan karir dan bagaimana cara mendapatkannya.",
    content: "Di era digital ini, sertifikasi IT menjadi salah satu cara terbaik untuk membuktikan kompetensi profesional Anda.\n\nManfaat sertifikasi IT:\n\n1. Meningkatkan Kredibilitas - Sertifikasi menunjukkan bahwa Anda memiliki pengetahuan dan skill yang terverifikasi.\n\n2. Peluang Karir Lebih Luas - Banyak perusahaan mensyaratkan sertifikasi untuk posisi tertentu.\n\n3. Gaji Lebih Tinggi - Profesional bersertifikasi cenderung mendapatkan kompensasi yang lebih baik.\n\n4. Update Skill - Proses sertifikasi memaksa Anda untuk terus belajar.\n\nRADAR Education Center menyediakan program kursus yang dirancang untuk mempersiapkan Anda mendapatkan sertifikasi resmi.",
    thumbnail_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    category: "Karir",
    author_name: "Admin RADAR",
    published_at: "2024-01-10",
    is_featured: false,
    read_time: "6 min read",
  },
  {
    id: "4",
    title: "Mengenal Dasar-Dasar Keamanan Jaringan",
    slug: "mengenal-dasar-keamanan-jaringan",
    excerpt: "Pelajari konsep fundamental keamanan jaringan yang wajib diketahui setiap profesional IT.",
    content: "Keamanan jaringan adalah aspek kritis dalam infrastruktur IT modern.\n\nKonsep dasar yang harus dipahami:\n\n1. Firewall - Garis pertahanan pertama yang mengontrol lalu lintas jaringan.\n\n2. VPN - Membuat koneksi aman melalui jaringan publik.\n\n3. Enkripsi - Melindungi data saat transit maupun saat tersimpan.\n\n4. Authentication - Memastikan identitas pengguna yang mengakses sistem.\n\n5. Monitoring - Memantau aktivitas jaringan untuk mendeteksi ancaman.\n\nProgram Network Administration di RADAR mencakup semua topik ini dengan pendekatan praktikal.",
    thumbnail_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    category: "Keamanan",
    author_name: "Admin RADAR",
    published_at: "2024-01-05",
    is_featured: false,
    read_time: "5 min read",
  },
];

export const getBlogPostBySlug = (slug: string): StaticBlogPost | undefined => {
  return blogPosts.find((p) => p.slug === slug);
};
