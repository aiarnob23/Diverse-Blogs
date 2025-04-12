import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, editBlog, fetchBlogDetails } from "../../services/blogService";

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBlogDetails = async () => {
      const blogDetails = await fetchBlogDetails(id);
      if (blogDetails) {
        setBlog(blogDetails);
        setTitle(blogDetails.title);
        setContent(blogDetails.content);
        setCategory(blogDetails.category);
        setCoverImage(blogDetails.coverImage);
      }
    };

    getBlogDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedBlog = { title, content, category, coverImage };

    try {
      await editBlog(id as string, updatedBlog);
      navigate(`/user/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        await deleteBlog(id as string);
        navigate("/user/profile");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (isLoading || !blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Image URL</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200"
      >
        Delete Blog
      </button>
    </div>
  );
}
