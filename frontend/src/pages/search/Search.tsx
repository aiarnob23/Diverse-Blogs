import { useEffect, useState } from "react";
import { fetchBlogsBySearchTerm } from "../../services/blogService";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (searchTerm.trim() === "") {
        setBlogs([]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchBlogsBySearchTerm(searchTerm);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Format date to more readable format
  const formatDate = (dateString : any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto p-4">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for blogs..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog : any) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/user/blog/${blog._id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.coverImage || "https://via.placeholder.com/400"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-tr-md">
                    {blog.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        {blog.authorName.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-700">
                        {blog.authorName}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(blog.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : searchTerm.trim() !== "" ? (
            <div className="col-span-full text-center p-8 text-gray-500">
              No blogs found matching "{searchTerm}". Try a different search
              term.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
