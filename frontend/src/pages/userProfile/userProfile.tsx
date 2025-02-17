import { useEffect, useState } from "react";
import { fetchUserBasedBlogs } from "../../services/blogService";
import { useCookies } from "react-cookie";
import { getUserDetails } from "../../services/userService";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function UserProfile() {
  const [blogs, setBlogs] = useState<any>([]);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["email"]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchUserBasedBlogs();
        const profileUser = await getUserDetails(cookies.email);
        setAuthor(profileUser);
        setBlogs(data);
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Profile Card */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
          <FaUserLarge className="text-4xl text-gray-600" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold">
          {author?.name ?? "Guest User"}
        </h2>
        <p className="text-gray-500">{author?.followers ?? 0} Followers</p>
        <p className="text-gray-500">{author?.followings ?? 0} Following</p>
        <p className="text-gray-500">{author?.blogs?.length ?? 0} Blogs</p>
      </div>

      {/* Loading & Error States */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Blog List */}
      {!loading && !error && (
        <div className="mt-6">
          {blogs.length > 0 ? (
            <>
              <h3 className="text-lg font-semibold">Your Blogs:</h3>
              <ul className="mt-2 space-y-2">
                {blogs.map((blog: any) => (
                  <li
                    key={blog.id}
                    onClick={() => navigate(`/user/blog/${blog?._id}`)}
                    className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition cursor-pointer"
                  >
                    {blog.title}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center mt-4">
              <p className="text-gray-500">You currently have no blogs.</p>
              <a
                href="/user/create-blog"
                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                Write a Blog
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
