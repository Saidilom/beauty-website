"use client"

import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem { question: string; answer: string; }
interface FAQSection {
  title?: string;
  description?: string;
  questions: FAQItem[];
}

interface FAQProps {
  section: FAQSection;
}

export const FAQ: FC<FAQProps> = ({ section }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const questions = Array.isArray(section?.questions) ? section.questions : [];

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <section id="faq" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            {section?.title || ""}
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {section?.description || ""}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {questions.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 pr-2 sm:pr-4">{item.question}</h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-purple-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t bg-gray-50">
                      <p className="text-gray-600 leading-relaxed pt-2 sm:pt-4 text-sm sm:text-base">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
