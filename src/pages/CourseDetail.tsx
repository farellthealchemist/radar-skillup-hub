import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Users, Award, BookOpen, CheckCircle, Star,
  ChevronDown, ChevronRight, PlayCircle, Globe, Target,
  Share2, Heart
} from "lucide-react";

// Animation Hooks
const useScrollAnimation = ({ delay = 0, threshold = 0.1, rootMargin = "0px" } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  return { ref, isVisible };
};

const useStaggeredAnimation = (itemCount, staggerDelay = 120, initialDelay = 200) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, initialDelay + i * staggerDelay);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, initialDelay]);

  return { ref, visibleItems };
};

// Course Data Collection
const coursesData = {
  "1": {
    id: "1",
    title: "Programming Fundamentals",
    category: "Programming",
    rating: 4.8,
    reviewCount: 150,
    students: 300,
    shortDesc: "Pelajari dasar-dasar pemrograman dengan Python dan Java. Cocok untuk pemula yang ingin memulai karir di bidang software development dengan kurikulum terstruktur dan project-based learning.",
    price: "Rp 2.500.000",
    originalPrice: "Rp 3.000.000",
    discount: "17%",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
    duration: "3-6 Bulan",
    level: "Pemula - Menengah",
    language: "Bahasa Indonesia",
    description: `Program Programming Fundamentals dirancang khusus untuk pemula yang ingin memulai karir di dunia software development. Dengan pendekatan hands-on dan project-based learning, Anda akan mempelajari dua bahasa pemrograman populer: Python dan Java.

Program ini tidak hanya mengajarkan sintaks bahasa pemrograman, tetapi juga fundamental concepts seperti algoritma, struktur data, Object-Oriented Programming (OOP), dan database basics. Setiap modul dilengkapi dengan latihan praktis dan mini projects untuk memastikan Anda benar-benar memahami konsep yang diajarkan.

Di akhir program, Anda akan membuat capstone project berupa aplikasi web sederhana yang bisa menjadi portfolio pertama Anda. Instruktur kami yang berpengalaman 15+ tahun di industri akan membimbing Anda step-by-step hingga Anda siap untuk advanced programming atau mencari pekerjaan sebagai junior developer.`,
    outcomes: [
      "Menguasai sintaks Python dan Java dari basic hingga intermediate",
      "Memahami konsep Object-Oriented Programming (OOP) dengan baik",
      "Dapat membuat aplikasi console dan aplikasi web sederhana",
      "Memahami database fundamentals dan SQL queries",
      "Menguasai version control dengan Git dan GitHub",
      "Debugging dan problem-solving skills yang solid",
      "Membuat portfolio project yang siap dipresentasikan",
      "Siap untuk melanjutkan ke advanced programming atau framework modern"
    ],
    requirements: [
      "Komputer/laptop dengan RAM minimal 4GB",
      "Koneksi internet yang stabil",
      "Tidak perlu pengalaman programming sebelumnya",
      "Komitmen belajar 10-15 jam per minggu",
      "Motivasi tinggi untuk belajar dan berlatih"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Python Basics & Programming Logic",
        lessonCount: 12,
        lessons: [
          { title: "Introduction to Python & Setup Environment", duration: "15 min" },
          { title: "Variables, Data Types & Operators", duration: "25 min" },
          { title: "Control Flow: If-Else & Loops", duration: "30 min" },
          { title: "Functions & Scope", duration: "28 min" },
          { title: "Lists, Tuples & Dictionaries", duration: "32 min" },
          { title: "String Manipulation", duration: "20 min" },
          { title: "File Handling", duration: "25 min" },
          { title: "Error Handling & Exceptions", duration: "22 min" },
          { title: "Modules & Packages", duration: "18 min" },
          { title: "Mini Project: Console Calculator", duration: "45 min" },
          { title: "Mini Project: Todo List App", duration: "50 min" },
          { title: "Module 1 Quiz & Review", duration: "30 min" }
        ]
      },
      {
        moduleTitle: "Module 2: Object-Oriented Programming (OOP)",
        lessonCount: 10,
        lessons: [
          { title: "Introduction to OOP Concepts", duration: "20 min" },
          { title: "Classes & Objects", duration: "30 min" },
          { title: "Inheritance & Polymorphism", duration: "35 min" },
          { title: "Encapsulation & Abstraction", duration: "28 min" },
          { title: "Magic Methods & Operator Overloading", duration: "25 min" },
          { title: "Design Patterns Basics", duration: "30 min" },
          { title: "Project: Library Management System", duration: "60 min" },
          { title: "Project: Simple Game with OOP", duration: "55 min" },
          { title: "Code Review & Best Practices", duration: "25 min" },
          { title: "Module 2 Quiz & Review", duration: "30 min" }
        ]
      }
    ],
    instructor: {
      name: "Asep Surahmat M.Kom",
      title: "Lead Programming Instructor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Dengan 15+ tahun pengalaman di industri software development, Asep telah bekerja di berbagai perusahaan teknologi dan startup.",
      expertise: ["Python", "Java", "Web Development", "Software Architecture"]
    },
    reviews: [
      {
        name: "Sarah Wijaya",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
        rating: 5,
        date: "2 minggu lalu",
        comment: "Kursus yang sangat bagus! Penjelasan instruktur sangat jelas dan mudah dipahami."
      }
    ],
    included: [
      "Akses materi selamanya",
      "Sertifikat resmi setelah lulus",
      "Support instruktur 24/7",
      "Source code semua project",
      "Grup diskusi alumni",
      "Career guidance & job assistance"
    ]
  },
  "2": {
    id: "2",
    title: "Scratch Visual Programming",
    category: "Programming",
    rating: 4.9,
    reviewCount: 200,
    students: 450,
    shortDesc: "Pengenalan programming untuk anak-anak dan pemula menggunakan Scratch. Belajar logika programming dengan cara yang menyenangkan dan interaktif.",
    price: "Rp 750.000",
    originalPrice: "Rp 900.000",
    discount: "17%",
    thumbnail: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800",
    duration: "2-3 Bulan",
    level: "Pemula",
    language: "Bahasa Indonesia",
    description: `Program Scratch Visual Programming dirancang khusus untuk anak-anak dan pemula yang ingin memulai perjalanan di dunia programming dengan cara yang fun dan engaging. Scratch menggunakan block-based programming yang memudahkan pemahaman konsep tanpa harus menulis kode yang rumit.

Melalui program ini, siswa akan belajar fundamental programming concepts seperti loops, conditionals, variables, dan events melalui pembuatan games, animations, dan interactive stories. Metode pembelajaran yang visual dan hands-on membuat programming terasa seperti bermain sambil belajar.

Program ini sempurna sebagai stepping stone sebelum melanjutkan ke text-based programming languages seperti Python atau JavaScript. Alumni program ini akan memiliki foundation yang kuat dalam computational thinking dan problem-solving skills.`,
    outcomes: [
      "Memahami konsep dasar programming (loops, conditions, variables)",
      "Dapat membuat game interaktif sederhana dengan Scratch",
      "Mengembangkan computational thinking dan problem solving",
      "Membuat animasi dan interactive stories",
      "Memahami konsep event-driven programming",
      "Bekerja dengan sprites, sounds, dan backgrounds",
      "Siap melanjutkan ke text-based programming",
      "Meningkatkan kreativitas dan logical thinking"
    ],
    requirements: [
      "Komputer/laptop dengan browser modern",
      "Koneksi internet",
      "Tidak perlu pengalaman programming",
      "Cocok untuk usia 8-15 tahun atau pemula dewasa",
      "Minat dalam game dan animasi"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Scratch Basics",
        lessonCount: 8,
        lessons: [
          { title: "Introduction to Scratch Interface", duration: "20 min" },
          { title: "Working with Sprites and Backgrounds", duration: "25 min" },
          { title: "Motion and Looks Blocks", duration: "30 min" },
          { title: "Sound and Events", duration: "25 min" },
          { title: "Mini Project: Simple Animation", duration: "40 min" },
          { title: "Control Blocks: Loops and Conditions", duration: "35 min" },
          { title: "Variables and Operators", duration: "30 min" },
          { title: "Module 1 Project Review", duration: "20 min" }
        ]
      },
      {
        moduleTitle: "Module 2: Game Development",
        lessonCount: 10,
        lessons: [
          { title: "Game Design Basics", duration: "25 min" },
          { title: "Keyboard and Mouse Controls", duration: "30 min" },
          { title: "Collision Detection", duration: "35 min" },
          { title: "Score and Lives System", duration: "30 min" },
          { title: "Project: Catch Game", duration: "45 min" },
          { title: "Project: Maze Game", duration: "50 min" },
          { title: "Project: Platformer Game", duration: "60 min" },
          { title: "Adding Levels and Difficulty", duration: "40 min" },
          { title: "Sound Effects and Music", duration: "25 min" },
          { title: "Final Game Polish", duration: "35 min" }
        ]
      }
    ],
    instructor: {
      name: "Rina Kusuma S.Pd",
      title: "Kids Programming Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      bio: "Berpengalaman 8+ tahun mengajar programming untuk anak-anak. Spesialisasi dalam Scratch, game development, dan computational thinking.",
      expertise: ["Scratch", "Game Development", "Kids Education", "Computational Thinking"]
    },
    reviews: [
      {
        name: "Budi Hartono",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
        rating: 5,
        date: "1 minggu lalu",
        comment: "Anak saya sangat senang belajar programming lewat Scratch. Sekarang dia bisa buat game sendiri!"
      },
      {
        name: "Siti Aminah",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
        rating: 5,
        date: "2 minggu lalu",
        comment: "Metode pengajarannya sangat cocok untuk anak-anak. Tidak membosankan dan sangat interaktif."
      }
    ],
    included: [
      "Akses materi selamanya",
      "Sertifikat penyelesaian",
      "Project templates & assets",
      "Grup diskusi orang tua & siswa",
      "Progress report berkala",
      "1-on-1 mentoring session"
    ]
  },
  "3": {
    id: "3",
    title: "Microsoft Office Mastery",
    category: "Office",
    rating: 4.7,
    reviewCount: 180,
    students: 520,
    shortDesc: "Kuasai Microsoft Office (Word, Excel, PowerPoint) untuk produktivitas maksimal di tempat kerja dan pendidikan.",
    price: "Rp 1.200.000",
    originalPrice: "Rp 1.500.000",
    discount: "20%",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    duration: "2-4 Bulan",
    level: "Pemula - Mahir",
    language: "Bahasa Indonesia",
    description: `Program Microsoft Office Mastery dirancang untuk meningkatkan produktivitas Anda dengan menguasai tiga aplikasi Office terpenting: Word, Excel, dan PowerPoint. Program ini cocok untuk profesional, mahasiswa, atau siapa saja yang ingin meningkatkan skill Office mereka.

Anda akan belajar dari basic hingga advanced features, termasuk mail merge, pivot tables, macros, advanced formulas, professional presentation design, dan masih banyak lagi. Dengan hands-on exercises dan real-world case studies, Anda akan langsung bisa mengaplikasikan ilmu yang dipelajari.

Alumni program ini melaporkan peningkatan produktivitas hingga 300% dan lebih percaya diri dalam menangani tugas-tugas administratif dan analisis data di tempat kerja.`,
    outcomes: [
      "Mahir menggunakan Word untuk dokumen profesional",
      "Menguasai Excel formulas, pivot tables, dan data analysis",
      "Membuat presentasi PowerPoint yang menarik dan profesional",
      "Menggunakan mail merge untuk mass communication",
      "Automasi tugas dengan macros dan VBA basics",
      "Membuat charts dan visualisasi data yang efektif",
      "Tips dan tricks untuk bekerja lebih cepat",
      "Meningkatkan produktivitas kerja hingga 300%"
    ],
    requirements: [
      "Komputer dengan Microsoft Office terinstal (2016 atau lebih baru)",
      "Koneksi internet",
      "Pengetahuan komputer dasar",
      "Komitmen praktek 5-10 jam per minggu"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Microsoft Word Advanced",
        lessonCount: 10,
        lessons: [
          { title: "Document Formatting & Styles", duration: "30 min" },
          { title: "Headers, Footers & Page Numbers", duration: "25 min" },
          { title: "Tables and Columns", duration: "35 min" },
          { title: "Mail Merge", duration: "40 min" },
          { title: "Table of Contents & Index", duration: "30 min" },
          { title: "Track Changes & Comments", duration: "25 min" },
          { title: "Templates & Forms", duration: "35 min" },
          { title: "Macros Basics in Word", duration: "30 min" },
          { title: "Project: Professional Report", duration: "60 min" },
          { title: "Module Review", duration: "20 min" }
        ]
      },
      {
        moduleTitle: "Module 2: Microsoft Excel Mastery",
        lessonCount: 12,
        lessons: [
          { title: "Excel Interface & Navigation", duration: "20 min" },
          { title: "Formulas & Functions Basics", duration: "35 min" },
          { title: "VLOOKUP, HLOOKUP, INDEX-MATCH", duration: "40 min" },
          { title: "Conditional Formatting", duration: "30 min" },
          { title: "Pivot Tables & Pivot Charts", duration: "45 min" },
          { title: "Data Validation & Protection", duration: "25 min" },
          { title: "Charts and Data Visualization", duration: "35 min" },
          { title: "What-If Analysis", duration: "30 min" },
          { title: "Macros & VBA Introduction", duration: "40 min" },
          { title: "Project: Financial Analysis Dashboard", duration: "70 min" },
          { title: "Project: Inventory Management System", duration: "60 min" },
          { title: "Module Review", duration: "25 min" }
        ]
      },
      {
        moduleTitle: "Module 3: PowerPoint Professional",
        lessonCount: 8,
        lessons: [
          { title: "Presentation Design Principles", duration: "30 min" },
          { title: "Slide Layouts & Master Slides", duration: "35 min" },
          { title: "Animations & Transitions", duration: "30 min" },
          { title: "Charts, Diagrams & SmartArt", duration: "35 min" },
          { title: "Multimedia: Videos & Audio", duration: "25 min" },
          { title: "Presenting Skills & Tips", duration: "30 min" },
          { title: "Project: Business Pitch Deck", duration: "60 min" },
          { title: "Module Review", duration: "20 min" }
        ]
      }
    ],
    instructor: {
      name: "Dewi Lestari M.M",
      title: "Office Productivity Expert",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      bio: "Microsoft Certified Trainer dengan 10+ tahun pengalaman training Office applications. Telah melatih 2000+ profesional dari berbagai industri.",
      expertise: ["Microsoft Office", "Data Analysis", "Business Intelligence", "Productivity"]
    },
    reviews: [
      {
        name: "Ahmad Fauzi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
        rating: 5,
        date: "1 minggu lalu",
        comment: "Setelah ikut kursus ini, pekerjaan saya jadi jauh lebih cepat. Excel pivot tables dan macros sangat membantu!"
      },
      {
        name: "Linda Wijaya",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
        rating: 5,
        date: "2 minggu lalu",
        comment: "Materi sangat lengkap dan instruktur sangat sabar. Recommended untuk yang mau meningkatkan skill Office!"
      }
    ],
    included: [
      "Akses materi selamanya",
      "Sertifikat resmi",
      "Template & exercise files",
      "Cheat sheets & quick reference guides",
      "Support instruktur",
      "Free updates materi"
    ]
  },
  "4": {
    id: "4",
    title: "Network Administration",
    category: "Networking",
    rating: 4.6,
    reviewCount: 95,
    students: 180,
    shortDesc: "Pelajari administrasi jaringan, keamanan cyber, dan infrastruktur IT. Ideal untuk IT support dan network administrator.",
    price: "Rp 3.500.000",
    originalPrice: "Rp 4.200.000",
    discount: "17%",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    duration: "4-6 Bulan",
    level: "Menengah - Mahir",
    language: "Bahasa Indonesia",
    description: `Program Network Administration dirancang untuk mempersiapkan Anda menjadi Network Administrator profesional. Anda akan mempelajari fundamental networking, konfigurasi router dan switch Cisco, network security, server administration, dan troubleshooting.

Program ini menggunakan pendekatan praktis dengan lab exercises menggunakan Cisco Packet Tracer dan virtual machines. Materi mencakup OSI model, TCP/IP, subnetting, VLAN, routing protocols, firewall configuration, dan wireless networking.

Lulusan program ini siap mengambil sertifikasi internasional seperti CompTIA Network+ atau Cisco CCNA, dan bekerja sebagai Network Administrator, IT Support, atau Network Engineer di berbagai perusahaan.`,
    outcomes: [
      "Memahami konsep networking fundamental (OSI, TCP/IP)",
      "Dapat konfigurasi router dan switch Cisco",
      "Menguasai subnetting dan IP addressing",
      "Implementasi VLAN dan routing protocols",
      "Memahami network security dan firewall",
      "Troubleshooting network problems",
      "Server administration basics (Windows/Linux)",
      "Siap mengambil sertifikasi CompTIA Network+ / Cisco CCNA"
    ],
    requirements: [
      "Komputer dengan RAM minimal 8GB",
      "Pengetahuan komputer menengah",
      "Pemahaman dasar tentang internet dan networking",
      "Komitmen belajar 15-20 jam per minggu",
      "Virtual machine software (akan dipandu instalasi)"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Network Fundamentals",
        lessonCount: 10,
        lessons: [
          { title: "Introduction to Networking", duration: "30 min" },
          { title: "OSI Model Deep Dive", duration: "45 min" },
          { title: "TCP/IP Protocol Suite", duration: "40 min" },
          { title: "IP Addressing & Subnetting", duration: "50 min" },
          { title: "Subnetting Practice", duration: "60 min" },
          { title: "Network Devices Overview", duration: "35 min" },
          { title: "Network Topologies", duration: "30 min" },
          { title: "Cables and Connectors", duration: "25 min" },
          { title: "Lab: Build Simple Network", duration: "70 min" },
          { title: "Module Quiz", duration: "30 min" }
        ]
      },
      {
        moduleTitle: "Module 2: Cisco Configuration",
        lessonCount: 12,
        lessons: [
          { title: "Cisco IOS Basics", duration: "35 min" },
          { title: "Router Configuration", duration: "45 min" },
          { title: "Switch Configuration", duration: "45 min" },
          { title: "VLAN Implementation", duration: "50 min" },
          { title: "Inter-VLAN Routing", duration: "45 min" },
          { title: "Static Routing", duration: "40 min" },
          { title: "Dynamic Routing: RIP", duration: "45 min" },
          { title: "Dynamic Routing: OSPF", duration: "50 min" },
          { title: "Dynamic Routing: EIGRP", duration: "45 min" },
          { title: "Access Control Lists (ACL)", duration: "50 min" },
          { title: "Lab: Complex Network Setup", duration: "90 min" },
          { title: "Module Quiz", duration: "35 min" }
        ]
      },
      {
        moduleTitle: "Module 3: Network Security",
        lessonCount: 8,
        lessons: [
          { title: "Network Security Fundamentals", duration: "40 min" },
          { title: "Firewall Configuration", duration: "50 min" },
          { title: "VPN Setup", duration: "45 min" },
          { title: "Wireless Security", duration: "40 min" },
          { title: "Network Monitoring & Analysis", duration: "45 min" },
          { title: "Common Attacks & Prevention", duration: "40 min" },
          { title: "Lab: Secure Network Implementation", duration: "80 min" },
          { title: "Module Quiz", duration: "30 min" }
        ]
      },
      {
        moduleTitle: "Module 4: Server Administration",
        lessonCount: 8,
        lessons: [
          { title: "Windows Server Basics", duration: "40 min" },
          { title: "Active Directory", duration: "50 min" },
          { title: "DHCP & DNS Configuration", duration: "45 min" },
          { title: "Linux Server Basics", duration: "40 min" },
          { title: "Web Server Setup (Apache/Nginx)", duration: "45 min" },
          { title: "File Server Configuration", duration: "40 min" },
          { title: "Backup & Recovery", duration: "35 min" },
          { title: "Module Quiz", duration: "30 min" }
        ]
      }
    ],
    instructor: {
      name: "Joko Widodo S.Kom, CCNA",
      title: "Senior Network Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Network Engineer bersertifikat CCNA dan CCNP dengan 12+ tahun pengalaman mengelola infrastruktur jaringan enterprise. Spesialisasi dalam Cisco technologies dan network security.",
      expertise: ["Cisco Networking", "Network Security", "Server Administration", "Cloud Infrastructure"]
    },
    reviews: [
      {
        name: "Rizky Pratama",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80",
        rating: 5,
        date: "3 minggu lalu",
        comment: "Materinya sangat lengkap dan praktis. Setelah lulus langsung diterima sebagai Network Admin. Thanks RADAR!"
      },
      {
        name: "Andi Susanto",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
        rating: 4,
        date: "1 bulan lalu",
        comment: "Program yang challenging tapi sangat rewarding. Lab exercisenya sangat membantu pemahaman."
      }
    ],
    included: [
      "Akses materi selamanya",
      "Sertifikat resmi",
      "Cisco Packet Tracer license",
      "Virtual lab environment",
      "Exam preparation materials (Network+/CCNA)",
      "Job placement assistance",
      "Alumni network access"
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState([]);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ delay: 200 });
  const { ref: outcomesRef, visibleItems: outcomesVisible } = useStaggeredAnimation(8, 100, 200);
  const { ref: sidebarRef, isVisible: sidebarVisible } = useScrollAnimation({ delay: 300 });

  // Get course data based on ID
  const courseData = coursesData[id];

  // If course not found, redirect to 404 or courses page
  useEffect(() => {
    if (!courseData) {
      navigate('/courses');
    }
  }, [courseData, navigate]);

  // Show loading or return null if no data
  if (!courseData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  const toggleModule = (index) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-white overflow-x-hidden">
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-600 smooth-transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/courses" className="hover:text-red-600 smooth-transition">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{courseData.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-800 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium ${
              courseData.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
              courseData.category === 'Office' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {courseData.category}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text leading-tight">
              {courseData.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-700 font-medium">
                  {courseData.rating} ({courseData.reviewCount}+ reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{courseData.students}+ students</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl">
              {courseData.shortDesc}
            </p>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 smooth-transition">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white smooth-transition">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Content Area */}
            <div className="lg:col-span-8">
              {/* Tab Navigation */}
              <div className="border-b mb-8">
                <div className="flex gap-8 overflow-x-auto">
                  {['overview', 'kurikulum', 'instruktur', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-medium capitalize smooth-transition whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-b-2 border-red-600 text-red-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content - Overview */}
              {activeTab === 'overview' && (
                <div>
                  {/* What You'll Learn */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Apa yang akan Anda pelajari</h2>
                    <div ref={outcomesRef} className="grid md:grid-cols-2 gap-4">
                      {courseData.outcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 transition-all duration-500 ${
                            outcomesVisible.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                          }`}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Deskripsi Lengkap</h2>
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      {courseData.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                    <ul className="space-y-3">
                      {courseData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="text-red-600 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab Content - Kurikulum */}
              {activeTab === 'kurikulum' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Kurikulum Lengkap</h2>
                  <div className="space-y-4">
                    {courseData.curriculum.map((module, index) => (
                      <div key={index} className="bg-white border rounded-xl overflow-hidden">
                        <div
                          onClick={() => toggleModule(index)}
                          className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 smooth-transition"
                        >
                          <div>
                            <h3 className="font-bold text-lg mb-1">{module.moduleTitle}</h3>
                            <p className="text-sm text-gray-500">{module.lessonCount} lessons</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-600 smooth-transition ${
                              expandedModules.includes(index) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        {expandedModules.includes(index) && (
                          <div className="p-5 pt-0 border-t bg-gray-50">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center gap-3 py-3 border-b last:border-0"
                              >
                                <PlayCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="flex-1 text-gray-700">{lesson.title}</span>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content - Instruktur */}
              {activeTab === 'instruktur' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Instruktur</h2>
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <img
                        src={courseData.instructor.avatar}
                        alt={courseData.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{courseData.instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{courseData.instructor.title}</p>
                        <p className="text-gray-600 leading-relaxed mb-4">{courseData.instructor.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {courseData.instructor.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content - Reviews */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  <div className="grid gap-6">
                    {courseData.reviews.map((review, index) => (
                      <div key={index} className="bg-white border rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div
                ref={sidebarRef}
                className={`bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-24 transition-all duration-800 ${
                  sidebarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img
                    src={courseData.thumbnail}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-red-600">{courseData.price}</span>
                    <span className="text-xl text-gray-400 line-through">{courseData.originalPrice}</span>
                  </div>
                  <span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                    Diskon {courseData.discount}
                  </span>
                </div>

                <div className="border-t my-6"></div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 py-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-500">Durasi</span>
                      <p className="font-medium">{courseData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <Target className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-500">Level</span>
                      <p className="font-medium">{courseData.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-500">Bahasa</span>
                      <p className="font-medium">{courseData.language}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={`/checkout/${id}`}>
                  <button className="hero-gradient text-white w-full py-4 rounded-lg font-semibold btn-glow smooth-transition hover:shadow-lg">
                    Daftar Sekarang
                  </button>
                </Link>

                <div className="border-t my-6"></div>

                {/* What's Included */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Yang Anda Dapatkan:</h3>
                  <ul className="space-y-3">
                    {courseData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;