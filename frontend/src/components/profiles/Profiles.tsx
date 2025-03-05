import { useEffect, useState } from "react";
import { getUserDetails } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Profiles({ email }: { email: string }) {
  const [author, setAuthor] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const profileUser = await getUserDetails(email);
        setAuthor(profileUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [email]);

  if (!author) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Profile Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{author.name}</h2>
        <p className="text-gray-600">📧 {author.email}</p>
        <p className="text-gray-700 mt-2">{author.bio || "No bio available"}</p>
      </div>

      {/* Blog List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Blogs</h3>
        {author.blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          <div className="space-y-3">
            {author.blogs.map((blog: any, index: number) => (
              <div
                onClick={() => navigate(`/user/blog/${blog?._id}`)}
                key={index}
                className="p-4 cursor-pointer border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="text-sm text-blue-600 font-medium">
                  {blog.category}
                </span>
                <h4 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
