import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const faqs = [
    {
      question: "Do I need a credit card for the free trial?",
      answer: "No, you don't need a credit card to start your free trial. You can sign up and explore our features without any payment information."
    },
    {
      question: "What if I want to cancel my subscription?",
      answer: "You can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to the service until the end of your current billing period."
    },
    {
      question: "How does the matching algorithm work?",
      answer: "Our AI-powered matching algorithm analyzes job requirements and candidate profiles across multiple parameters including skills, experience, and preferences to find the most suitable matches."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. The pricing will be adjusted accordingly on your next billing cycle."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-blue-200 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-black">Frequently Asked</span>
            <span className="text-blue-600 ml-2">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className=" overflow-hidden border border-b-1 border-b-black mx-3"
            >
              <button
                className="w-full p-6 text-left  hover:bg-gray-750 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex bg-transperent justify-between items-center ">
                  <h3 className="text-lg font-semibold text-black">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-black transition-transform duration-200 ${
                      activeIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index 
                    ? 'max-h-48 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 bg-transparent text-black">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;