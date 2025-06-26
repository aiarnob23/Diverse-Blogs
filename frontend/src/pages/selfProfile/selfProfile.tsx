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
  FaCog
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile-first container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-6 lg:mb-8">
          
          {/* Cover Photo - Responsive height */}
          <div className="relative h-32 sm:h-48 lg:h-56 bg-gradient-to-r from-blue-500 to-blue-200">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-200 group">
              <FaEdit className="text-sm sm:text-base group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Settings button - mobile only */}
            <button className="absolute top-3 right-14 sm:hidden p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-200">
              <FaCog className="text-sm" />
            </button>
          </div>

          {/* Profile Info Section - Responsive layout */}
          <div className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6">
            
            {/* Avatar - Responsive sizing */}
            <div className="absolute -top-10 sm:-top-16 lg:-top-20 left-4 sm:left-6 lg:left-8">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-white rounded-full p-1 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                  <FaUser className="text-2xl sm:text-4xl lg:text-5xl text-indigo-600" />
                </div>
                <button className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 p-1.5 sm:p-2 bg-blue-600 rounded-full text-white border-2 sm:border-4 border-white hover:bg-blue-700 transition-colors shadow-lg">
                  <FaEdit className="text-xs sm:text-sm" />
                </button>
              </div>
            </div>

            {/* User Details - Responsive layout */}
            <div className="ml-24 sm:ml-36 lg:ml-44 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    {author?.name ?? "Guest User"}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 line-clamp-2">
                    {author?.bio || "No bio yet. Tell the world about yourself!"}
                  </p>
                </div>

                {/* Action buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:shrink-0">
                  <button
                    onClick={() => navigate("/user/create-blog")}
                    className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    <FaPenNib className="mr-2 text-sm" />
                    <span className="hidden sm:inline">Write a Blog</span>
                    <span className="sm:hidden">Write</span>
                  </button>
                  
                  <button className="hidden sm:flex items-center justify-center px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base">
                    <FaCog className="mr-2 text-sm" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar - Responsive grid */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 sm:mr-3">
                  <FaPenNib className="text-sm sm:text-lg" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    {author?.blogs?.length ?? 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Posts</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 sm:mr-3">
                  <FaUserPlus className="text-sm sm:text-lg" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    {author?.followers?.length ?? 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Followers</p>
                </div>
              </div>

              <Link 
                to="/user/following" 
                className="flex items-center justify-center sm:justify-start hover:bg-white hover:bg-opacity-50 rounded-lg p-2 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 sm:mr-3">
                  <FaUserPlus className="text-sm sm:text-lg" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    {author?.followings?.length ?? 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Following</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="space-y-6">
          
          {/* Tabs - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === "posts"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                <div className="flex items-center justify-center sm:justify-start">
                  <FaPenNib className="mr-0 sm:mr-2 text-sm" />
                  <span className="hidden sm:inline">Your Posts</span>
                  <span className="sm:hidden">Posts</span>
                </div>
              </button>
              
              <button
                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === "saved"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("saved")}
              >
                <div className="flex items-center justify-center sm:justify-start">
                  <FaBookmark className="mr-0 sm:mr-2 text-sm" />
                  <span className="hidden sm:inline">Saved Posts</span>
                  <span className="sm:hidden">Saved</span>
                </div>
              </button>
              
              <button
                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === "drafts"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("drafts")}
              >
                <div className="flex items-center justify-center sm:justify-start">
                  <FaEdit className="mr-0 sm:mr-2 text-sm" />
                  <span className="hidden sm:inline">Drafts</span>
                  <span className="sm:hidden">Drafts</span>
                </div>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-sm sm:text-base text-gray-500">Loading your content...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-red-700">
              <p className="text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-sm underline hover:text-red-800 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Posts Content */}
          {!loading && !error && activeTab === "posts" && (
            <div>
              {blogs.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {blogs.map((blog: any) => (
                    <div
                      key={blog._id || blog.id}
                      className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => navigate(`/user/blog/${blog?._id || blog.id}`)}
                    >
                      {/* Blog Image */}
                      <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <FaPenNib className="text-2xl sm:text-3xl text-gray-400" />
                          </div>
                        )}

                        {/* More options */}
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add dropdown menu logic here
                            }}
                            className="p-2 bg-black bg-opacity-20 backdrop-blur-sm text-white rounded-full hover:bg-opacity-40 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <FaEllipsisV className="text-sm" />
                          </button>
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="p-4 sm:p-6">
                        {/* Category and Date */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2 py-1">
                            {blog.category || "Uncategorized"}
                          </span>
                          <div className="flex items-center text-gray-500 text-xs">
                            <FaCalendarAlt className="mr-1" />
                            <span>
                              {blog.date
                                ? new Date(blog.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "No date"}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                          {blog.excerpt ||
                            blog.content?.replace(/<[^>]*>/g, "").slice(0, 150) + "..." ||
                            "No content"}
                        </p>

                        {/* Stats and Actions */}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center hover:text-yellow-500 transition-colors">
                              <FaBookmark className="mr-1" />
                              {blog.saves || 0}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/user/edit-blog/${blog?._id}`);
                            }}
                            className="text-blue-600 text-sm hover:text-blue-800 flex items-center font-medium transition-colors"
                          >
                            <FaEdit className="mr-1" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 lg:py-20 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                  <div className="max-w-md mx-auto px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <FaPenNib className="text-2xl sm:text-3xl text-blue-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                      No blogs yet
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      Share your thoughts and ideas with the world by creating your first blog post.
                    </p>
                    <button
                      onClick={() => navigate("/user/create-blog")}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm sm:text-base transform hover:-translate-y-0.5"
                    >
                      Write Your First Blog
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Saved Posts Tab */}
          {!loading && !error && activeTab === "saved" && (
            <div className="text-center py-12 sm:py-16 lg:py-20 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              <div className="max-w-md mx-auto px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FaBookmark className="text-2xl sm:text-3xl text-yellow-500" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  No saved posts yet
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  When you save posts you like, they'll appear here for easy access.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm sm:text-base transform hover:-translate-y-0.5"
                >
                  Explore Posts
                </button>
              </div>
            </div>
          )}

          {/* Drafts Tab */}
          {!loading && !error && activeTab === "drafts" && (
            <div className="text-center py-12 sm:py-16 lg:py-20 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              <div className="max-w-md mx-auto px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FaPenNib className="text-2xl sm:text-3xl text-gray-500" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  No drafts found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Drafts you save will appear here so you can continue working on them later.
                </p>
                <button
                  onClick={() => navigate("/user/create-blog")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm sm:text-base transform hover:-translate-y-0.5"
                >
                  Start Writing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}