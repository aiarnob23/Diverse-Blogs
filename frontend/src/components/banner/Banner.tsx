import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";


export default function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <div
        className="hero min-h-[400px] lg:min-h-screen w-full relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="hero-overlay bg-opacity-50" />
        
        <div className="absolute top-0 w-full z-10">
          <Navbar />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6  md:space-y-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl text-slate-200 lg:text-5xl xl:text-6xl font-bold leading-tight transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              Exploring the Wonders of Mountains
            </h2>
            
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              Dive into a journey of breathtaking landscapes, serene peaks, and
              the timeless beauty of nature's majestic creations.
            </p>
            
            <div className={`pt-4 transform transition-all duration-1000 delay-600 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <a
                href="/user/blog/67f9ecdff5b9d152d4a0fb33"
                className="inline-flex items-center text-gray-200 hover:text-white transition-colors duration-300 text-sm sm:text-base md:text-lg font-medium"
              >
                <span className="mr-2">Read More</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className={`hidden md:block absolute bottom-4 right-4 text-gray-300 text-right text-xs sm:text-sm transform transition-all duration-1000 delay-900 ease-out ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        }`}>
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 space-y-1">
            <p className="font-medium">Aminul Islam Arnob</p>
            <p className="text-gray-400">31 December, 2024</p>
            <p className="text-gray-400">10 mins read</p>
          </div>
        </div>
        
        <div className={`absolute bottom-4 left-4 right-4 text-gray-300 text-center text-xs sm:hidden transform transition-all duration-1000 delay-900 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-3 space-y-1">
            <p className="font-medium">Aminul Islam Arnob</p>
            <p className="text-gray-400">31 December, 2024 • 10 mins read</p>
          </div>
        </div>
      </div>
    </div>
  );
}