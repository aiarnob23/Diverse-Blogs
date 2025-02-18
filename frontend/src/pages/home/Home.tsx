import Banner from "../../components/banner/Banner";
import BlogList from "../../components/blogList/BlogList";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const handlePostBlog = async () => {
    window.location.replace("/user/create-blog");
  };
  return (
    <div className="relative">
      <Banner />
      <div className="max-w-[1280px] mx-auto">
        <BlogList category={"All"}/>
      </div>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handlePostBlog}
          className="bg-purple-300 rounded-md p-1"
        >
          <FiPlus size={30} />
        </button>
      </div>
    </div>
  );
}
