import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetails } from "../../services/blogService";
import Blog from "../../components/blogView/BlogView";

// A simple skeleton loader component
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-header"></div>
    <div className="skeleton-content"></div>
    <div className="skeleton-footer"></div>
  </div>
);

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

  if (loading) {
    return (
      <div className="loading-container">
        <SkeletonLoader /> {/* Using the skeleton loader to prevent layout shift */}
      </div>
    ); 
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    ); 
  }

  return (
    <div className="blog-container">
      {blog ? (
        <Blog blog={blog} />
      ) : (
        <div className="no-blog">No blog found</div>
      )}
    </div>
  );
}
