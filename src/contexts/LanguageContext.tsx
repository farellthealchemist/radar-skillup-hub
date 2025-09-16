import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Kami',
    'nav.courses': 'Kursus',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontak',
    'nav.register': 'Daftar Sekarang',
    
    // Hero Section
    'hero.company': 'PT. Radar Teknologi Komputer Education',
    'hero.tagline': 'Media Meningkatkan Skill dalam Bidang IT',
    'hero.cta.courses': 'Paket Belajar',
    'hero.cta.how': 'Bagaimana Caranya?',
    
    // Features
    'features.title': 'Tingkatkan Skill IT Kamu di Radar Education',
    'features.subtitle': 'KEUNGGULAN KAMI DALAM MELAYANI ANDA',
    'features.elementary.title': 'SD - PERGURUAN TINGGI',
    'features.elementary.desc': 'Radar education membuka pembelajaran dari pendidikan SD s/d Perguruan Tinggi.',
    'features.flexible.title': 'BELAJAR FLEKSIBEL',
    'features.flexible.desc': 'Pembelajaran Fleksibel yang memungkinkan akses materi kapan pun dimana pun melalui perangkat digital. Selain itu, ada juga pendekatan belajar mandiri yang memberikan ruang bagi seseorang untuk mengatur waktu belajar sesuai dengan kebutuhan dan tingkat pemahaman mereka.',
    'features.certificate.title': 'SERTIFIKAT',
    'features.certificate.desc': 'Sertifikat sering kali dianggap sebagai tambahan yang bernilai pada resume atau portofolio seseorang karena menunjukkan dedikasi, pencapaian, dan kompetensi yang dimiliki oleh pemilik sertifikat tersebut.',
    
    // Courses
    'courses.title': 'Daftar Kelas yang Kami Buka',
    'courses.programming.title': 'Pemrograman',
    'courses.programming.desc': 'Pelajari dasar-dasar pemrograman dan bahasa pemrograman populer seperti Python atau Java. Bangun keterampilan dalam merancang dan menyelesaikan masalah melalui coding efisien.',
    'courses.scratch.title': 'Scratch',
    'courses.scratch.desc': 'Temukan dunia pemrograman dengan cara yang kreatif melalui pelatihan Scratch. Buat proyek animasi, permainan, dan multimedia tanpa menulis kode, memahami konsep dasar algoritma, dan logika pemrograman.',
    'courses.office.title': 'Office',
    'courses.office.desc': 'Tingkatkan efisiensi dan keahlian di kantor dengan pelatihan Office. Kuasai aplikasi seperti Word, Excel, dan PowerPoint untuk membuat dokumen profesional, analisis data, dan presentasi visual yang mengesankan.',
    'courses.networking.title': 'Jaringan',
    'courses.networking.desc': 'Explore dunia jaringan dengan pelatihan ini, memahami konsep dasar jaringan, keamanan, dan administrasi sistem. Peserta akan belajar cara merancang, mengelola, dan memecahkan masalah dalam infrastruktur jaringan untuk mendukung kebutuhan modern perusahaan.',
    'courses.learnMore': 'Selengkapnya',
    
    // Testimonials
    'testimonials.title': 'Testimoni',
    'testimonials.sarah.text': 'Tempat kursus ini benar-benar bagus! Instruktur sangat ramah dan sabar dalam menjelaskan setiap konsep. Saya sekarang memiliki pemahaman yang lebih baik tentang dunia komputer dan merasa lebih siap untuk melanjutkan studi di perguruan tinggi.',
    'testimonials.sarah.name': 'Sarah',
    'testimonials.sarah.role': 'Pelajar',
    'testimonials.daniel.text': 'Saya sangat puas mengikuti kursus di sini. Instruktur sangat kompeten dan materi yang diajarkan sangat relevan dengan perkembangan IT. Saya merasa lebih percaya diri dalam menghadapi tugas kuliah setelah mengikuti kursus ini.',
    'testimonials.daniel.name': 'Daniel',
    'testimonials.daniel.role': 'Mahasiswa',
    'testimonials.maria.text': 'Tempat kursus ini memberikan pengalaman belajar yang sangat baik. Materi disampaikan dengan cara yang mudah dipahami, dan fasilitas yang tersedia sangat memadai. Saya telah meningkatkan keterampilan teknis saya dan merasa lebih siap untuk menghadapi tugas-tugas ke depannya.',
    'testimonials.maria.name': 'Maria',
    'testimonials.maria.role': 'Mahasiswa',
    
    // Instructors
    'instructors.title': 'Pengajar',
    'instructors.asep': 'Asep Surahmat M.Kom',
    'instructors.rizqi': 'Rizqi Darmawan',
    'instructors.role': 'Pengajar',
    
    // FAQ
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.background.q': 'Bagaimana jika tidak memiliki latar belakang IT?',
    'faq.fullstack.q': 'Apakah ada kelas FullStack Web Development?',
    'faq.payment.q': 'Apakah pembayaran dapat dilakukan dengan cara mencicil?',
    'faq.kids.q': 'Apakah ada kelas coding untuk anak SD?',
    'faq.job.q': 'Apakah setelah mengikuti kursus ini bisa dapat pekerjaan di bidang IT?',
    
    // Contact
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Terhubung dengan Radar Education Center, info, trend programming, promo, dan lainnya',
    'contact.phone.placeholder': 'Nomor Handphone',
    'contact.send': 'Kirim',
    
    // About
    'about.title': 'Tentang Kami',
    'about.description': 'Radar Education Center merupakan pusat pendidikan yang didedikasikan untuk memajukan keterampilan dan pengetahuan kamu di bidang IT. Sebagai mitra dalam perjalanan pendidikan kamu, Radar Education Center menawarkan pengalaman belajar yang inovatif dan berorientasi pada praktik, membantu kamu mempersiapkan diri untuk tantangan yang terus berkembang di dunia IT.',
    
    // Footer
    'footer.company': 'Company',
    'footer.hours': 'Jam Buka PT Radar',
    'footer.contact': 'Kontak Kami',
    'footer.monday': 'Senin : 10.00–20.00',
    'footer.tuesday': 'Selasa : 10.00–20.00',
    'footer.wednesday': 'Rabu : 10.00–20.00',
    'footer.thursday': 'Kamis : 10.00–20.00',
    'footer.friday': 'Jumat : 10.00–20.00',
    'footer.saturday': 'Sabtu : 10.00–16.00',
    'footer.sunday': 'Minggu : Tutup',
    'footer.rights': '© 2024 Radar Education Center All Rights Reserved.',
    
    // WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.courses': 'Courses',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.register': 'Register Now',
    
    // Hero Section
    'hero.company': 'PT. Radar Computer Technology Education',
    'hero.tagline': 'Media to Enhance IT Skills',
    'hero.cta.courses': 'Course Packages',
    'hero.cta.how': 'How Does It Work?',
    
    // Features
    'features.title': 'Enhance Your IT Skills at Radar Education',
    'features.subtitle': 'OUR ADVANTAGES IN SERVING YOU',
    'features.elementary.title': 'ELEMENTARY - UNIVERSITY',
    'features.elementary.desc': 'Radar education opens learning from elementary education to university level.',
    'features.flexible.title': 'FLEXIBLE LEARNING',
    'features.flexible.desc': 'Flexible learning that allows access to materials anytime, anywhere through digital devices. In addition, there is also a self-directed learning approach that provides space for individuals to manage their learning time according to their needs and level of understanding.',
    'features.certificate.title': 'CERTIFICATE',
    'features.certificate.desc': 'Certificates are often considered a valuable addition to someone\'s resume or portfolio as they demonstrate the dedication, achievement, and competence possessed by the certificate holder.',
    
    // Courses
    'courses.title': 'List of Classes We Offer',
    'courses.programming.title': 'Programming',
    'courses.programming.desc': 'Learn the fundamentals of programming and popular programming languages like Python or Java. Build skills in designing and solving problems through efficient coding.',
    'courses.scratch.title': 'Scratch',
    'courses.scratch.desc': 'Discover the world of programming creatively through Scratch training. Create animation, game, and multimedia projects without writing code, understanding basic concepts of algorithms and programming logic.',
    'courses.office.title': 'Office',
    'courses.office.desc': 'Improve efficiency and expertise in the office with Office training. Master applications like Word, Excel, and PowerPoint to create professional documents, data analysis, and impressive visual presentations.',
    'courses.networking.title': 'Networking',
    'courses.networking.desc': 'Explore the world of networking with this training, understanding basic networking concepts, security, and system administration. Participants will learn how to design, manage, and troubleshoot network infrastructure to support modern business needs.',
    'courses.learnMore': 'Learn More',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.sarah.text': 'This course place is really good! The instructor is very friendly and patient in explaining every concept. I now have a better understanding of the computer world and feel more prepared to continue my studies in college.',
    'testimonials.sarah.name': 'Sarah',
    'testimonials.sarah.role': 'Student',
    'testimonials.daniel.text': 'I am very satisfied taking courses here. The instructor is very competent and the material taught is very relevant to IT developments. I feel more confident in facing college assignments after taking this course.',
    'testimonials.daniel.name': 'Daniel',
    'testimonials.daniel.role': 'University Student',
    'testimonials.maria.text': 'This course place provides a very good learning experience. The material is delivered in an easy-to-understand way, and the available facilities are very adequate. I have improved my technical skills and feel more prepared to face future tasks.',
    'testimonials.maria.name': 'Maria',
    'testimonials.maria.role': 'University Student',
    
    // Instructors
    'instructors.title': 'Instructors',
    'instructors.asep': 'Asep Surahmat M.Com',
    'instructors.rizqi': 'Rizqi Darmawan',
    'instructors.role': 'Instructor',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.background.q': 'What if I don\'t have an IT background?',
    'faq.fullstack.q': 'Are there FullStack Web Development classes?',
    'faq.payment.q': 'Can payment be made in installments?',
    'faq.kids.q': 'Are there coding classes for elementary students?',
    'faq.job.q': 'Can I get a job in IT after taking this course?',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Connect with Radar Education Center, info, programming trends, promos, and more',
    'contact.phone.placeholder': 'Phone Number',
    'contact.send': 'Send',
    
    // About
    'about.title': 'About Us',
    'about.description': 'Radar Education Center is an educational center dedicated to advancing your skills and knowledge in the IT field. As a partner in your educational journey, Radar Education Center offers innovative and practice-oriented learning experiences, helping you prepare for the ever-evolving challenges in the IT world.',
    
    // Footer
    'footer.company': 'Company',
    'footer.hours': 'PT Radar Opening Hours',
    'footer.contact': 'Contact Us',
    'footer.monday': 'Monday : 10.00–20.00',
    'footer.tuesday': 'Tuesday : 10.00–20.00',
    'footer.wednesday': 'Wednesday : 10.00–20.00',
    'footer.thursday': 'Thursday : 10.00–20.00',
    'footer.friday': 'Friday : 10.00–20.00',
    'footer.saturday': 'Saturday : 10.00–16.00',
    'footer.sunday': 'Sunday : Closed',
    'footer.rights': '© 2024 Radar Education Center All Rights Reserved.',
    
    // WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};