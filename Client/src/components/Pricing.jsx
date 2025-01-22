import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Trial Plan",
      price: "Free",
      duration: "",
      features: [
        "1 Hour Access",
        "Max 10 Profiles",
        "All Features"
      ],
      buttonText: "Start Trial",
      highlighted: false
    },
    {
      name: "Monthly Plan",
      price: "₹8000",
      duration: "/month",
      features: [
        "Unlimited Profile Searches",
        "All Features",
        "Priority Support"
      ],
      buttonText: "Start Now",
      highlighted: true
    },
    {
      name: "Yearly Plan",
      price: "₹64000",
      duration: "/year",
      features: [
        "Unlimited Profile Searches",
        "All Features",
        "Priority Support"
      ],
      buttonText: "Start Free Trial",
      highlighted: false
    }
  ];

  return (
    <div name="pricing" className="relative w-full bg-gradient-to-b from-white to-blue-200 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-black">Choose Your</span>
            <span className="text-blue-600 ml-2">Plan</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Select the perfect plan for your recruitment needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-lg p-8 transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-white transform hover:-translate-y-2' 
                  : 'bg-blue-600'
              }`}
            >
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${
                  plan.highlighted ? 'text-gray-900' : 'text-white'
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-gray-900' : 'text-white'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${
                    plan.highlighted ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {plan.duration}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Check className={`w-5 h-5 ${
                        plan.highlighted ? 'text-gray-900' : 'text-white'
                      }`} />
                      <span className={
                        plan.highlighted ? 'text-gray-900' : 'text-gray-300'
                      }>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-gray-800'
                      : 'bg-white text-gray-900 '
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
