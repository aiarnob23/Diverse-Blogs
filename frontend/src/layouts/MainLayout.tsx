import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

   
export default function MainLayout() {
  return (
      <div className="max-w-[1280px] mx-auto"> 
          <Navbar />
          <Outlet />
          <Footer/>
      </div>
  );
}