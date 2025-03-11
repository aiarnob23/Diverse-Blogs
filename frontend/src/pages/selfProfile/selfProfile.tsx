import { useEffect, useState } from "react";
import { fetchUserBasedBlogs } from "../../services/blogService";
import { useCookies } from "react-cookie";
import { getUserDetails } from "../../services/userService";
import {
  FaUser,
  FaEdit,
  FaPenNib,
  FaUserPlus,
  FaCalendarAlt,
  FaEllipsisV,
  FaBookmark,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

export default function SelfProfile() {
  const [blogs, setBlogs] = useState<any>([]);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["email"]);
  const [activeTab, setActiveTab] = useState("posts");
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
  }, [cookies.email]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
            <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-all">
              <FaEdit />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="relative px-6 pt-16 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 w-32 h-32 bg-white rounded-full p-1 shadow-xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                <FaUser className="text-5xl text-indigo-600" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white border-4 border-white hover:bg-blue-700 transition-colors">
                <FaEdit className="text-xs" />
              </button>
            </div>

            {/* User Details */}
            <div className="ml-36 flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {author?.name ?? "Guest User"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {author?.bio || "No bio yet. Tell the world about yourself!"}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => navigate("/user/create-blog")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPenNib className="mr-2" />
                  Write a Blog
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <FaPenNib className="text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {author?.blogs?.length ?? 0}
                </p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                <FaUserPlus className="text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {author?.followers?.length ?? 0}
                </p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
            </div>

            <Link to="/user/following" className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <FaUserPlus className="text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {author?.followings?.length ?? 0}
                </p>
                <p className="text-sm text-gray-600">Followings</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="mt-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "posts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Your Posts
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "saved"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Saved Posts
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "drafts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("drafts")}
            >
              Drafts
            </button>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading your content...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Content based on active tab */}
          {!loading && !error && activeTab === "posts" && (
            <div>
              {blogs.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {blogs.map((blog: any) => (
                    <div
                      key={blog._id || blog.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() =>
                        navigate(`/user/blog/${blog?._id || blog.id}`)
                      }
                    >
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <FaPenNib className="text-3xl text-gray-400" />
                          </div>
                        )}

                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add dropdown menu logic here
                            }}
                            className="p-2 bg-black bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-all"
                          >
                            <FaEllipsisV />
                          </button>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2 py-1">
                            {blog.category || "Uncategorized"}
                          </span>
                          <div className="flex items-center text-gray-500 text-xs">
                            <FaCalendarAlt className="mr-1" />
                            <span>
                              {blog.date
                                ? new Date(blog.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )
                                : "No date"}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {blog.excerpt ||
                            blog.content
                              ?.replace(/<[^>]*>/g, "")
                              .slice(0, 150) + "..." ||
                            "No content"}
                        </p>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaBookmark className="mr-1" />
                              {blog.saves || 0}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/user/edit-blog/${blog?._id || blog.id}`
                              );
                            }}
                            className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow">
                  <FaPenNib className="text-5xl mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No blogs yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Share your thoughts and ideas with the world by creating
                    your first blog post.
                  </p>
                  <button
                    onClick={() => navigate("/user/create-blog")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    Write Your First Blog
                  </button>
                </div>
              )}
            </div>
          )}

          {!loading && !error && activeTab === "saved" && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow">
              <FaBookmark className="text-5xl mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No saved posts yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                When you save posts you like, they'll appear here for easy
                access.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Explore Posts
              </button>
            </div>
          )}

          {!loading && !error && activeTab === "drafts" && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow">
              <FaPenNib className="text-5xl mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No drafts found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Drafts you save will appear here so you can continue working on
                them later.
              </p>
              <button
                onClick={() => navigate("/user/create-blog")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Start Writing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
