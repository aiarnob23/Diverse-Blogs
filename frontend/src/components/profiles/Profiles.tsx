import { useEffect, useState } from "react";
import { getUserDetails } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Profiles({ email }: { email: string }) {
  const [author, setAuthor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("blogs");
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

  if (!author)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden">
      {/* Header with avatar and stats */}
      <div className="relative">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {/* Profile info with avatar overlapping the banner */}
        <div className="px-6 pb-5">
          <div className="flex flex-col sm:flex-row">
            {/* Avatar */}
            <div className="relative -mt-12 mb-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-gray-500 text-2xl font-bold">
                {author.name.charAt(0)}
              </div>
            </div>

            {/* Name and email */}
            <div className="sm:ml-4 flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {author.name}
              </h2>
              <p className="text-gray-600 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {author.email}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex justify-around mt-4 py-3 border-t border-b border-gray-100">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {author.blogs?.length || 0}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Blogs
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {author?.followers?.length || 0}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {author?.followings?.length || 0}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Following
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "blogs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {activeTab === "blogs" && (
          <div>
            {author.blogs && author.blogs.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No blogs
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No blogs have been published yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {author.blogs &&
                  author.blogs.map((blog: any, index: number) => (
                    <div
                      onClick={() => navigate(`/user/blog/${blog?._id}`)}
                      key={index}
                      className="p-3 cursor-pointer border rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {blog.category}
                          </span>
                          <h4 className="mt-1 text-base font-medium text-gray-900 group-hover:text-blue-600">
                            {blog.title}
                          </h4>
                        </div>
                        <svg
                          className="h-5 w-5 text-gray-400 group-hover:text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="py-4">
            <p className="text-gray-600">
              This is {author.name}'s profile. They have written{" "}
              {author.blogs?.length || 0} blogs and have{" "}
              {author.followers?.length || 0} followers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
