import Banner from "../../components/banner/Banner";
import BlogList from "../../components/blogList/BlogList";
import {
FaPen
} from "react-icons/fa";

export default function Home() {
  const handlePostBlog = async () => {
    window.location.replace("/user/create-blog");
  };
  return (
    <div className="relative">
      <Banner />
      <div className="max-w-[1280px] mx-auto ">
        <BlogList category={"All"}/>
      </div>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handlePostBlog}
          className="bg-gray-200 p-2 rounded-lg"
        >
          <FaPen size={20} />
        </button>
      </div>
    </div>
  );
}
