// import React from 'react';
// import { Sparkles, ArrowRight } from 'lucide-react';

// const GetStarted = () => {
//   return (
//     <div className="w-full bg-gray-900 py-20">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Background Gradient Effect */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl" />
          
//           {/* Content Container */}
//           <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 overflow-hidden">
//             {/* Decorative Elements */}
//             <div className="absolute top-0 right-0 -mt-8 -mr-8">
//               <Sparkles className="w-24 h-24 text-yellow-400/20" />
//             </div>
//             <div className="absolute bottom-0 left-0 -mb-8 -ml-8 rotate-180">
//               <Sparkles className="w-24 h-24 text-yellow-400/20" />
//             </div>

//             {/* Main Content */}
//             <div className="text-center space-y-8">
//               <h2 className="text-4xl md:text-5xl font-bold">
//                 <span className="text-white">Get Started with </span>
//                 <span className="text-yellow-400">Aurjobs</span>
//                 <span className="text-white"> Today</span>
//               </h2>
              
//               <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
//                 Start your free trial and experience the future of recruitment. 
//                 Sign up now and find top talent faster!
//               </p>

//               {/* CTA Button */}
//               <div className="pt-4">
//                 <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transform hover:-translate-y-1">
//                   Sign Up Now
//                   <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
//                 </button>
//               </div>

//               {/* Trust Indicators */}
//               <div className="flex justify-center items-center space-x-8 pt-8 text-gray-400">
//                 <div className="flex items-center">
//                   <span className="text-yellow-400 font-bold mr-2">14-day</span> free trial
//                 </div>
//                 <div className="h-4 w-px bg-gray-700" />
//                 <div className="flex items-center">
//                   <span className="text-yellow-400 font-bold mr-2">No</span> credit card required
//                 </div>
//                 <div className="h-4 w-px bg-gray-700" />
//                 <div className="flex items-center">
//                   <span className="text-yellow-400 font-bold mr-2">Cancel</span> anytime
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetStarted;

import React from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import Particle from './Particle';

const GetStarted = () => {
  return (
    <>
    {/* <Particle/> */}
      <div className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Animated Background Elements */}
        <div className="relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-cyan-400/20 animate-gradient-x" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          </div>
          
          {/* Floating Elements */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute hidden md:block w-2 h-2 bg-cyan-400 rounded-full
                ${i === 0 ? 'top-12 right-12 animate-float-slow' : ''}
                ${i === 1 ? 'top-24 left-12 animate-float-slower' : ''}
                ${i === 2 ? 'bottom-12 right-24 animate-float' : ''}
              `}
            />
          ))}

          {/* Main Container */}
          <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_50px_0_rgba(34,211,238,0.1)]">
            {/* Decorative Icons */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 animate-pulse">
              <Star className="w-24 h-24 text-cyan-400/20" />
            </div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 rotate-180 animate-pulse delay-150">
              <Sparkles className="w-24 h-24 text-cyan-400/20" />
            </div>

            {/* Content */}
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-gradient-x">
                Get Started with Aurjobs Today
              </h2>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Start your free trial and experience the future of recruitment. 
                Sign up now and find top talent faster!
              </p>

              {/* Animated CTA Button */}
              <div className="pt-8">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-400 hover:to-blue-400 transform hover:-translate-y-1 hover:shadow-[0_0_30px_0_rgba(34,211,238,0.3)]">
                  <span className="relative">
                    Sign Up Now
                    <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 pt-8 text-gray-400">
                {[
                  { highlight: "14-day", text: "free trial" },
                  { highlight: "No", text: "credit card required" },
                  { highlight: "Cancel", text: "anytime" }
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
                      <span className="text-cyan-400 font-bold mr-2">{item.highlight}</span> 
                      {item.text}
                    </div>
                    {index < 2 && <div className="hidden md:block h-4 w-px bg-gray-700" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// Add these custom animations to your Tailwind config
const customConfig = {
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
};

export default GetStarted;




