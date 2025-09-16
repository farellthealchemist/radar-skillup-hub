import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://api.whatsapp.com/send?phone=6285782763529"
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-bounce"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">{t('whatsapp.chat')}</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;