import Navbar from "../navbar/Navbar";
import cover from "../../../public/images/banner/mountain-min.jpg";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div>
      <div
        className="hero min-h-screen lg:h-[800px] w-full relative"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="hero-overlay bg-opacity-50" />
        
        {/* Navbar */}
        <div className="absolute top-0 w-full z-10">
          <Navbar />
        </div>
        
        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Exploring the Wonders of Mountains
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dive into a journey of breathtaking landscapes, serene peaks, and
              the timeless beauty of nature's majestic creations.
            </p>
            
            <div className="pt-4">
              <Link
                to={`user/blog/67f9ecdff5b9d152d4a0fb33`}
                className="inline-flex items-center text-gray-200 hover:text-white transition-colors duration-300 text-sm sm:text-base md:text-lg font-medium"
              >
                <span className="mr-2">Read More</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Author Info */}
        <div className="hidden md:blockabsolute bottom-4 right-4 text-gray-300 text-right text-xs sm:text-sm">
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 space-y-1">
            <p className="font-medium">Aminul Islam Arnob</p>
            <p className="text-gray-400">31 December, 2024</p>
            <p className="text-gray-400">10 mins read</p>
          </div>
        </div>
        
        {/* Mobile Author Info - Alternative positioning for small screens */}
        <div className="absolute bottom-4 left-4 right-4 text-gray-300 text-center text-xs sm:hidden">
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-3 space-y-1">
            <p className="font-medium">Aminul Islam Arnob</p>
            <p className="text-gray-400">31 December, 2024 • 10 mins read</p>
          </div>
        </div>
      </div>
    </div>
  );
}