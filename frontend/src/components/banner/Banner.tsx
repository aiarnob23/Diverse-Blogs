import Navbar from "../navbar/Navbar";
import cover from "../../../public/images/banner/mountain-min.jpg";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div>
      <div
        className="hero h-[800px] w-[100%] relative"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="hero-overlay bg-opacity-50" />
        <div className="absolute top-0 w-full">
          <Navbar />
        </div>
        <div className="absolute  text-white text-center">
          <h2 className="text-4xl">Exploring the Wonders of Mountains</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Dive into a journey of breathtaking landscapes, serene peaks, and{" "}
            <br />
            the timeless beauty of nature's majestic creations.
          </p>
          <Link
            to={`user/blog/67f9ecdff5b9d152d4a0fb33`}
            className="text-gray-200"
          >
            . . . Read More
          </Link>
        </div>
        <div className="absolute text-gray-400 right-4 bottom-4">
          <p>Aminul Islam Arnob</p>
          <p>12 April, 2025</p>
          <p>10 mins read</p>
        </div>
      </div>
    </div>
  );
}
