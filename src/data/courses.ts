export interface StaticCourse {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  duration: string;
  level: string;
  instructor: string;
  instructorAvatar: string;
  language: string;
  rating: number;
  students: string;
  popular: boolean;
  isFree: boolean;
  modules: {
    title: string;
    lessons: { title: string; duration: string }[];
  }[];
}

export const courses: StaticCourse[] = [
  {
    id: "programming",
    title: "Programming Fundamentals",
    slug: "programming-fundamentals",
    category: "Programming",
    description: "Python, Java fundamentals untuk membangun foundation programming yang kuat. Pelajari konsep dasar pemrograman, struktur data, algoritma, dan object-oriented programming dari nol hingga mahir.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop",
    price: "Rp 2.500.000",
    originalPrice: "Rp 3.000.000",
    discount: "17%",
    duration: "3-6 bulan",
    level: "Pemula - Menengah",
    instructor: "Asep Surahmat M.Kom",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    language: "Bahasa Indonesia",
    rating: 4.9,
    students: "500+",
    popular: true,
    isFree: false,
    modules: [
      {
        title: "Pengenalan Programming",
        lessons: [
          { title: "Apa itu Programming?", duration: "15 menit" },
          { title: "Setup Environment", duration: "20 menit" },
          { title: "Hello World", duration: "10 menit" },
        ],
      },
      {
        title: "Dasar Python",
        lessons: [
          { title: "Variabel & Tipe Data", duration: "25 menit" },
          { title: "Operator & Ekspresi", duration: "20 menit" },
          { title: "Kondisi & Percabangan", duration: "30 menit" },
          { title: "Perulangan", duration: "30 menit" },
        ],
      },
      {
        title: "Object Oriented Programming",
        lessons: [
          { title: "Class & Object", duration: "30 menit" },
          { title: "Inheritance", duration: "25 menit" },
          { title: "Polymorphism", duration: "25 menit" },
        ],
      },
    ],
  },
  {
    id: "scratch",
    title: "Scratch Visual Programming",
    slug: "scratch-visual-programming",
    category: "Kids Programming",
    description: "Visual programming untuk pemula dan anak-anak dengan pendekatan yang menyenangkan. Belajar logika programming melalui game, animasi, dan cerita interaktif.",
    image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&h=500&fit=crop",
    price: "Rp 750.000",
    originalPrice: "Rp 900.000",
    discount: "17%",
    duration: "2-3 bulan",
    level: "Pemula",
    instructor: "Asep Surahmat M.Kom",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    language: "Bahasa Indonesia",
    rating: 4.8,
    students: "300+",
    popular: false,
    isFree: false,
    modules: [
      {
        title: "Pengenalan Scratch",
        lessons: [
          { title: "Apa itu Scratch?", duration: "15 menit" },
          { title: "Interface Scratch", duration: "20 menit" },
        ],
      },
      {
        title: "Membuat Game Sederhana",
        lessons: [
          { title: "Sprite & Background", duration: "25 menit" },
          { title: "Event & Motion", duration: "20 menit" },
          { title: "Game Catch the Ball", duration: "30 menit" },
        ],
      },
    ],
  },
  {
    id: "office",
    title: "Microsoft Office Mastery",
    slug: "microsoft-office-mastery",
    category: "Office",
    description: "Kuasai Word, Excel, PowerPoint untuk produktivitas maksimal di tempat kerja. Dari fitur dasar hingga advanced seperti macro, pivot table, dan desain presentasi profesional.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    price: "Rp 1.200.000",
    originalPrice: "Rp 1.500.000",
    discount: "20%",
    duration: "2-4 bulan",
    level: "Pemula - Menengah",
    instructor: "Asep Surahmat M.Kom",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    language: "Bahasa Indonesia",
    rating: 4.7,
    students: "400+",
    popular: true,
    isFree: false,
    modules: [
      {
        title: "Microsoft Word",
        lessons: [
          { title: "Formatting Dokumen", duration: "20 menit" },
          { title: "Mail Merge", duration: "25 menit" },
          { title: "Table of Contents", duration: "15 menit" },
        ],
      },
      {
        title: "Microsoft Excel",
        lessons: [
          { title: "Formula & Fungsi Dasar", duration: "30 menit" },
          { title: "Pivot Table", duration: "25 menit" },
          { title: "Chart & Visualisasi", duration: "20 menit" },
        ],
      },
      {
        title: "Microsoft PowerPoint",
        lessons: [
          { title: "Desain Presentasi", duration: "25 menit" },
          { title: "Animasi & Transisi", duration: "20 menit" },
        ],
      },
    ],
  },
  {
    id: "networking",
    title: "Network Administration",
    slug: "network-administration",
    category: "Networking",
    description: "Network administration dan cybersecurity untuk infrastruktur IT modern. Pelajari konfigurasi router, switch, firewall, dan keamanan jaringan enterprise.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    price: "Rp 3.500.000",
    originalPrice: "Rp 4.200.000",
    discount: "17%",
    duration: "4-6 bulan",
    level: "Menengah - Mahir",
    instructor: "Rizqi Darmawan",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    language: "Bahasa Indonesia",
    rating: 4.8,
    students: "200+",
    popular: false,
    isFree: false,
    modules: [
      {
        title: "Network Fundamentals",
        lessons: [
          { title: "OSI Model", duration: "30 menit" },
          { title: "TCP/IP Protocol", duration: "25 menit" },
          { title: "IP Addressing & Subnetting", duration: "35 menit" },
        ],
      },
      {
        title: "Cisco Configuration",
        lessons: [
          { title: "Router Configuration", duration: "30 menit" },
          { title: "Switch Configuration", duration: "25 menit" },
          { title: "VLAN Setup", duration: "30 menit" },
        ],
      },
      {
        title: "Network Security",
        lessons: [
          { title: "Firewall Configuration", duration: "30 menit" },
          { title: "VPN Setup", duration: "25 menit" },
        ],
      },
    ],
  },
];

export const getCourseBySlug = (slug: string): StaticCourse | undefined => {
  return courses.find((c) => c.slug === slug);
};
