import React from 'react';
import Works from "../assets/Girl.png"
import {motion} from "framer-motion"
import { CirclePlus, Search, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Register Your Profile',
      description: 'Employers and candidates create detailed profiles showcasing their skills, roles, and preferences.',
      icon: <CirclePlus />
    },
    {
      title: 'Search and Match',
      description: 'AI-powered search algorithms help employers find the best candidates based on job requirements.',
      icon: <Search />
    },
    {
      title: 'Connect with Talent',
      description: 'Once the right candidates are found, employers can directly reach out and hire the perfect match.',
      icon: <Zap />
    }
  ];

  return (
    // <div className="min-h-screen relative bg-gradient-to-b from-white to-blue-200 text-white p-8">
    //   <div className="max-w-6xl mx-auto">
    //     <motion.div className="text-center mb-12"
    //        initial={{ opacity: 0, y: -20 }}
    //        animate={{ opacity: 1, y: 0 }}
    //        transition={{ duration: 0.6 }}
    //     >
    //       <h2 className="text-4xl font-bold mb-4 text-black">
    //         How Aurjobs <span className="text-blue-600">Works</span>
    //       </h2>
    //       <p className="text-gray-600 text-lg">
    //       Our platform connects employers and candidates by streamlining the search and registration process with advanced AI algorithms.
    //         Effortlessly navigate through the process and land your dream job.
    //       </p>
    //     </motion.div>

    //     <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
    //       {/* Left side with illustration */}
    //       <div className="lg:w-1/2 relative">
    //         <motion.div className="relative"
    //         initial={{ opacity: 0, x: -150 }}
    //         animate={{ opacity: 1, x: 0 }}
    //         transition={{ duration: 0.9 }}
    //         >
    //           <img 
    //             src={Works}
    //             alt="Person working on laptop"
    //             className="w-full max-w-md mx-auto"
    //           />
              
    //           {/* Profile completion card */}
    //           <motion.div initial="hidden"
    //             animate="visible" className="absolute top-10 right-0 bg-gray-600/80 backdrop-blur-sm p-4 rounded-lg">
    //             <div className="flex flex-col items-center gap-2">
    //               <img
    //                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s"
    //                 alt="Profile avatar"
    //                 className="w-12 h-12 rounded-full hidden lg:block md:block"
    //               />
    //               <div className="text-center ">
    //                 <p className="text-sm font-medium">Complete your profile</p>
    //                 <p className="text-xs font-semibold text-gray-800">70% Completed</p>
    //               </div>
    //             </div>
    //           </motion.div>
    //         </motion.div>
    //       </div>

    //       {/* Right side with steps */}
    //       <div className="lg:w-1/2 space-y-6">
    //         {steps.map((step, index) => (
    //           <div 
    //             key={index}
    //             className="flex items-center cursor-pointer gap-4 p-4 hover:bg-gray-800/50 rounded-lg transition-all"
    //           >
    //             <div className="bg-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center">
    //               {step.icon}
    //             </div>
    //             <div>
    //               <h3 className="text-xl text-black font-semibold">{step.title}</h3>
    //               <p className="text-gray-700">{step.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen relative bg-gradient-to-b from-white to-blue-200 text-white p-4 sm:p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
          How Aurjobs <span className="text-blue-600">Works</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Our platform connects employers and candidates by streamlining the search and registration process with advanced AI algorithms.
          Effortlessly navigate through the process and land your dream job.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side with illustration */}
        <div className="w-full lg:w-1/2 relative">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <img
              src={Works}
              alt="Person working on laptop"
              className="w-full max-w-md mx-auto"
            />
            
            
            <motion.div 
                initial="hidden"
                animate="visible"
                className="absolute w-28 h-24 lg:h-32 top-4 right-4 sm:top-10 sm:right-0 bg-gray-600/80 backdrop-blur-sm rounded-lg shadow-lg  sm:w-auto"
              >
                <div className="flex items-center sm:flex-col sm:items-center p-2.5 sm:p-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s"
                    alt="Profile avatar"
                    className="hidden md:block lg:block w-10 h-10 sm:w-12 sm:h-12 rounded-full  flex-shrink-0"
                  />
                  <div className="ml-3 sm:ml-0 sm:mt-2 sm:text-center">
                    <p className="text-sm font-medium text-white">Complete your profile</p>
                    <p className="text-xs font-semibold text-gray-200">70% Completed</p>
                  </div>
                </div>
              </motion.div>
            
          </motion.div>
        </div>

        {/* Right side with steps */}
        <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 mt-12 sm:mt-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer gap-3 sm:gap-4 p-4 hover:bg-gray-800/50 rounded-lg transition-all"
            >
              <div className="bg-blue-600 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl text-black font-semibold">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default HowItWorks;