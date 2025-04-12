import { useEffect, useState } from "react";
import { getUserDetails, followUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Profiles({ email }: { email: string }) {
  const [author, setAuthor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("blogs");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["email"]);
  const [selfInfo, setSelfInfo] = useState<any>(null);


  useEffect(() => {
    const getUser = async () => {
      try {
        const selfProfile = await getUserDetails(cookies.email);
        const profileUser = await getUserDetails(email);

        setAuthor(profileUser);
        setSelfInfo(selfProfile);

        // Check if current user is following the profile owner
        if (selfProfile?.followings && profileUser?._id) {
          const isAlreadyFollowing =
            Array.isArray(selfProfile.followings) &&
            selfProfile.followings.some((id: string) => id === profileUser._id);
          setIsFollowing(isAlreadyFollowing);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    getUser();
  }, [email, cookies.email]);

  // Handle follow/unfollow action
  const handleFollowToggle = async () => {
    if (!author?._id || !selfInfo) return;

    setIsLoading(true);
    try {
      await followUser(selfInfo._id, author._id);
      setIsFollowing(!isFollowing);

      // Update followers/following counts
      if (isFollowing) {
        setAuthor({
          ...author,
          followers: Array.isArray(author.followers)
            ? author.followers.filter((id: string) => id !== selfInfo._id)
            : [],
        });
      } else {
        setAuthor({
          ...author,
          followers: [
            ...(Array.isArray(author.followers) ? author.followers : []),
            selfInfo._id,
          ],
        });
      }
    } catch (err) {
      console.error("Error toggling follow status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading skeleton 
  if (!author) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // checking if viewing own profile
  const isOwnProfile = cookies.email === author.email;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="h-20 mb-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl shadow-lg"></div>

        <div className="px-6 pb-5  relative">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-4 sm:mb-0">
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-xl hover:scale-110 transition-all duration-300 ease-in-out">
                {author.name.charAt(0)}
              </div>
            </div>

            {/* Name, email, and follow button */}
            <div className="sm:ml-6 flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-semibold text-gray-800">
                {author.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{author.email}</p>

              {/* Follow button */}
              {!isOwnProfile && (
                <button
                  onClick={handleFollowToggle}
                  disabled={isLoading}
                  className={`mt-3 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                    isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  ) : isFollowing ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-around mt-6 py-3 border-t border-b border-gray-200">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            {Array.isArray(author.blogs) ? author.blogs.length : 0}
          </p>
          <p className="text-xs text-gray-500 uppercase">Blogs</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            {Array.isArray(author.followers) ? author.followers.length : 0}
          </p>
          <p className="text-xs text-gray-500 uppercase">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            {Array.isArray(author.followings) ? author.followings.length : 0}
          </p>
          <p className="text-xs text-gray-500 uppercase">Following</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="px-6 py-4 border-b">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`py-2 px-4 font-medium text-lg transition-all duration-300 ${
              activeTab === "blogs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2 px-4 font-medium text-lg transition-all duration-300 ${
              activeTab === "about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-4">
        {activeTab === "blogs" && (
          <div>
            {!Array.isArray(author.blogs) || author.blogs.length === 0 ? (
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
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No blogs yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This user hasn't published any blogs.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {author.blogs.map((blog: any, index: number) => (
                  <div
                    onClick={() => navigate(`/user/blog/${blog?._id}`)}
                    key={index}
                    className="p-5 bg-gray-50 border rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {blog.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="py-4">
            <p className="text-gray-600 text-lg">
              This is {author.name}'s profile. They have written{" "}
              {Array.isArray(author.blogs) ? author.blogs.length : 0} blogs and
              have{" "}
              {Array.isArray(author.followers) ? author.followers.length : 0}{" "}
              followers.
            </p>

            {/* Additional about information */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Member since
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {author.createdAt
                  ? new Date(author.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
