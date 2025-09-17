import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in-bounce">
      <a 
        href="https://api.whatsapp.com/send?phone=6285782763529" 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full flex items-center gap-3 shadow-lg hover:shadow-2xl smooth-transition hover-lift group btn-interactive pulse-border"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
        <span className="hidden sm:inline font-medium text-white">Chat WhatsApp</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </a>
    </div>
  );
};

export default WhatsAppButton;