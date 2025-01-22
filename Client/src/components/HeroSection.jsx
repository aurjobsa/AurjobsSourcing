import React from 'react'
import { motion } from "framer-motion"

const HeroSection = () => {
    return (
        // <section className='relative  flex items-center justify-center h-[90vh]'>
        //     <motion.div className='text-center max-w-7xl mx-auto'
        //         initial={{ opacity: 0, x: 100 }}
        //         animate={{ opacity: 1, x: 0 }}
        //         exit={{ opacity: 0, x: -100 }}
        //         transition={{ duration: 0.3 }}>
        //         <div className='flex flex-col gap-5 my-10'>
        //             <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        //             <h1 className='text-6xl font-bold'>Find the Best<br /> Talent with <span className='text-[#6A38C2]'>AI-Powered Search</span></h1>
        //             <p className='font-medium text-gray-700'>Discover top talent quickly with our AI-driven <br /> recruitment platform. Streamline your hiring process and find the perfect match today.</p>
        //             <button className="bg-[#6A38C2] flex px-8 py-4  shadow-lg rounded-lg items-center gap-4 mx-auto">
        //                 <span className='text-white text-2xl font-semibold'>Start Free Trial</span>
        //             </button>

        //         </div>
        //     </motion.div>
        // </section>
        <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-white">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Find the Best Talent with{' '}
              <span className="text-custom-deep-blue bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                AI-Powered Search
              </span>
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover top talent quickly with our AI-driven recruitment platform. Streamline your hiring process and find the perfect match today.
          </p>
          
          <div className="pt-4 sm:pt-6">
            <button className="transform hover:scale-105 transition-all duration-300 ease-in-out
              bg-gradient-to-r from-blue-500 to-blue-600 
              text-white font-semibold 
              py-3 sm:py-4 px-6 sm:px-8 
              rounded-lg text-base sm:text-lg
              hover:from-blue-600 hover:to-blue-700 
              shadow-md hover:shadow-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default HeroSection
