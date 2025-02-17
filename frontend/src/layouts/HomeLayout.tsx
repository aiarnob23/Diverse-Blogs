import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function HomeLayout() {
  return (
    <div className="">
      <Outlet />
      <Footer />
    </div>
  );
}
