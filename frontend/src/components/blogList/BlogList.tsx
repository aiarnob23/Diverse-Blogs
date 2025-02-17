import { useEffect, useState } from "react";
import { useFetchBlogs } from "../../hooks/useFetchBlogs";
import BlogSkeleton from "../skeletons/BlogListSkeleton";
import { BlogCategories } from "../../utils/blogCategories";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  const { getBlogs, blogs, loading, error } = useFetchBlogs();
  const categories = BlogCategories;
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const getAllBlogs = async () => {
      let category = activeCategory !== "All" ? activeCategory : "";
      await getBlogs(category);
    };
    getAllBlogs();
  }, [activeCategory]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(dateString));
  };

  const sanitizeHtml = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (loading) return <BlogSkeleton />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold my-6 text-center">Blog</h1>

      {/* Categories */}
      <div className="flex items-center gap-4 justify-start flex-wrap">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(category ? category : "All")}
            className={`px-4 py-2 rounded-md transition ${
              activeCategory === category
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Lists */}
      {blogs?.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog: any, index: number) => (
            <li
              onClick={() => navigate(`/user/blog/${blog?._id}`)}
              key={index}
              className="border cursor-pointer rounded-lg shadow-lg bg-white p-4"
            >
              <div>
                <span className="text-sm text-blue-500 font-medium">
                  {blog.category}
                </span>
                <div className="mt-2">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
              <p className="text-gray-500 text-sm">{formatDate(blog.date)}</p>
              <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
              <p className="text-gray-500 text-sm">
                By <span className="">{blog.authorName}</span>
              </p>
              <p
                className="mt-2 text-ellipsis overflow-hidden line-clamp-2"
                dangerouslySetInnerHTML={sanitizeHtml(blog.content)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-6">No result found!</p>
      )}
    </div>
  );
}
