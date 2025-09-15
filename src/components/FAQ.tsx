import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-0.5 bg-primary rounded-lg">
        <div className="bg-white rounded-lg overflow-hidden">
          {items.map((item, index) => (
            <div key={index} className="border-b border-primary last:border-b-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? 'rotate-90' : ''
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;