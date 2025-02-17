import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetails } from "../../services/blogService";
import Blog from "../../components/blogView/BlogView";

export default function ReadBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null); // Default to null instead of an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogDetails = async () => {
      setLoading(true); // Ensure loading state is true before fetch
      try {
        const data = await fetchBlogDetails(id);
        setBlog(data); // Set the fetched blog data
      } catch (err) {
        setError("Error fetching blog details"); // Error handling message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (id) {
      getBlogDetails();
    }
  }, [id]); // Re-run when the `id` changes

  if (loading) {
    return <div>Loading...</div>; // Optional: loading message
  }

  if (error) {
    return <div>{error}</div>; // Error message if fetching fails
  }

  return (
    <div>
      {blog ? (
        <Blog blog={blog} />
      ) : (
        <div>No blog found</div> // Optional: message if no blog data found
      )}
    </div>
  );
}
