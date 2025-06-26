import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetails } from "../../services/blogService";
import Blog from "../../components/blogView/BlogView";
import BlogLoadingSkeleton from "../../components/skeletons/BlogSkeleton";


export default function ReadBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogDetails = async () => {
      setLoading(true); 
      try {
        const data = await fetchBlogDetails(id);
        setBlog(data); 
      } catch (err) {
        setError("Error fetching blog details"); 
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      getBlogDetails();
    }
  }, [id]);

  //  loading skeleton 
  if (loading) {
    return <BlogLoadingSkeleton />;
  }

  //  error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }


  if (!blog) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
            <p className="text-gray-600 mb-4">Sorry, the blog you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => window.history.back()} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Blog blog={blog} />;
}