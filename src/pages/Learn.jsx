import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  PlayCircle, CheckCircle, ChevronLeft, ChevronRight, 
  BookOpen, Clock, Download, Menu, X, Award
} from 'lucide-react';

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([0, 1, 2]);

  // Course data berdasarkan ID
  const coursesData = {
    "1": {
      id: "1",
      title: "Programming Fundamentals",
      instructor: "Asep Surahmat M.Kom",
      thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Python Basics",
          lessons: [
            { id: 0, title: "Introduction to Python", duration: "15 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "Variables & Data Types", duration: "25 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "Control Flow", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 3, title: "Functions", duration: "28 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Object-Oriented Programming",
          lessons: [
            { id: 4, title: "Introduction to OOP", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 5, title: "Classes & Objects", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 6, title: "Inheritance", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    },
    "3": {
      id: "3",
      title: "Microsoft Office Mastery",
      instructor: "Dewi Lestari M.M",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Microsoft Word",
          lessons: [
            { id: 0, title: "Word Basics", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "Document Formatting", duration: "25 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "Mail Merge", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Microsoft Excel",
          lessons: [
            { id: 3, title: "Excel Basics", duration: "20 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 4, title: "Formulas & Functions", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 5, title: "Pivot Tables", duration: "40 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    },
    "4": {
      id: "4",
      title: "Network Administration",
      instructor: "Joko Widodo S.Kom",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
      modules: [
        {
          moduleTitle: "Module 1: Network Fundamentals",
          lessons: [
            { id: 0, title: "Introduction to Networking", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 1, title: "OSI Model", duration: "45 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 2, title: "TCP/IP Protocol", duration: "40 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        },
        {
          moduleTitle: "Module 2: Cisco Configuration",
          lessons: [
            { id: 3, title: "Cisco IOS Basics", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
            { id: 4, title: "Router Configuration", duration: "45 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" }
          ]
        }
      ]
    }
  };

  const courseData = coursesData[id];

  useEffect(() => {
    if (!courseData) {
      navigate('/dashboard');
    }
  }, [courseData, navigate]);

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Flatten all lessons
  const allLessons = courseData.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLesson];
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const markAsComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goToPrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToNext = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <style>{`
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .lesson-active { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
      `}</style>

      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard"
                className="text-gray-300 hover:text-white smooth-transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-white font-bold text-lg">{courseData.title}</h1>
                <p className="text-gray-400 text-sm">by {courseData.instructor}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-red-500 font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full smooth-transition"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Video Player Area */}
        <div className="flex-1">
          <div className="aspect-video bg-black">
            <iframe
              src={currentLessonData.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-gray-800 p-6">
            <h2 className="text-white text-2xl font-bold mb-2">
              {currentLessonData.title}
            </h2>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentLessonData.duration}
              </span>
              <span>Lesson {currentLesson + 1} dari {allLessons.length}</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={goToPrevious}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={markAsComplete}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 smooth-transition font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                {completedLessons.includes(currentLesson) ? 'Completed' : 'Mark as Complete'}
              </button>

              <button
                onClick={goToNext}
                disabled={currentLesson === allLessons.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto max-h-screen`}>
          <div className="p-4">
            <h3 className="text-white font-bold text-lg mb-4">Course Content</h3>
            
            <div className="space-y-4">
              {courseData.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-750">
                    <h4 className="text-white font-semibold">{module.moduleTitle}</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      {module.lessons.length} lessons
                    </p>
                  </div>
                  
                  <div className="divide-y divide-gray-600">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson.id)}
                        className={`w-full text-left p-4 hover:bg-gray-600 smooth-transition ${
                          currentLesson === lesson.id ? 'lesson-active' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={`font-medium mb-1 ${
                              currentLesson === lesson.id ? 'text-white' : 'text-gray-300'
                            }`}>
                              {lesson.title}
                            </h5>
                            <p className={`text-sm ${
                              currentLesson === lesson.id ? 'text-gray-200' : 'text-gray-500'
                            }`}>
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Course Completion */}
            {progress === 100 && (
              <div className="mt-6 bg-green-600 rounded-lg p-4 text-center">
                <Award className="w-12 h-12 text-white mx-auto mb-2" />
                <h4 className="text-white font-bold mb-2">Selamat!</h4>
                <p className="text-white text-sm mb-4">
                  Anda telah menyelesaikan kursus ini
                </p>
                <Link
                  to="/my-courses?tab=completed"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100 smooth-transition font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download Sertifikat
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;