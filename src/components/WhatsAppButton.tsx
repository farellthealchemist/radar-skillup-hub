import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-6 z-50">
      <a 
        href="https://api.whatsapp.com/send?phone=6285782763529" 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:animate-bounce group"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;