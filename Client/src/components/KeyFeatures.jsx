// import React from 'react';
// import { Brain, Bell, Filter } from 'lucide-react';

// const KeyFeatures = () => {
//   const features = [
//     {
//       icon: <Brain className="w-12 h-12 text-yellow-400" />,
//       title: "AI-Powered Matching",
//       description: "Our AI algorithms help find the perfect candidate quickly and accurately based on your search parameters."
//     },
//     {
//       icon: <Bell className="w-12 h-12 text-yellow-400" />,
//       title: "Real-Time Updates",
//       description: "Stay updated with real-time notifications when candidates match your job criteria."
//     },
//     {
//       icon: <Filter className="w-12 h-12 text-yellow-400" />,
//       title: "Custom Filters",
//       description: "Refine your search using advanced filters such as skills, location, salary expectations, and more."
//     }
//   ];

//   return (
//     <div className="relative w-full bg-gray-100 py-16">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4">
//             <span className="text-black">Key</span>
//             <span className="text-[#6A38C2] ml-2">Features</span>
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Effortlessly navigate through the process and land your dream job.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index} 
//               className="bg-[#6A38C2] cursor-pointer rounded-lg border border-gray-700 p-6 hover:border-[#6A38C2] transition-all duration-300"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="mb-4 p-3 bg-gray-700 rounded-full">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KeyFeatures;

import React from 'react';



const KeyFeatures = () => {

  const features = [

    {

      title: "AI-Powered Matching",

      description: "Our AI algorithms help find the perfect candidate quickly and accurately based on your search parameters.",

      icon: (

        <path

          strokeLinecap="round"

          strokeLinejoin="round"

          strokeWidth="2"

          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"

        />

      )

    },

    {

      title: "Real-Time Updates",

      description: "Stay updated with real-time notifications when candidates match your job criteria.",

      icon: (

        <path

          strokeLinecap="round"

          strokeLinejoin="round"

          strokeWidth="2"

          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"

        />

      )

    },

    {

      title: "Custom Filters",

      description: "Refine your search using advanced filters such as skills, location, salary expectations, and more.",

      icon: (

        <path

          strokeLinecap="round"

          strokeLinejoin="round"

          strokeWidth="2"

          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"

        />

      )

    },

  ];



  return (

 
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-blue-200 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Key <span className="text-blue-600">Features</span>
          </h2>
          
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-300 hover:-translate-y-2 ${
                index % 2 === 0 ? 'lg:mt-12' : ''
              }`}
            >
              <div className="h-full p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-10 h-10 text-blue-600"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-blue-600">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );

};



export default KeyFeatures;

