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

  const handleFollowToggle = async () => {
    if (!author?._id || !selfInfo) return;

    setIsLoading(true);
    try {
      await followUser(selfInfo._id, author._id);
      setIsFollowing(!isFollowing);

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

  if (!author) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden">
          <div className="h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="px-4 sm:px-6 pb-6 relative">
            <div className="flex flex-col items-center space-y-4 animate-pulse">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 -mt-10 sm:-mt-12 lg:-mt-16"></div>
              <div className="space-y-3 text-center w-full max-w-xs">
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded w-20 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = cookies.email === author.email;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden">
        <div className="relative">
          <div className="h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="px-4 sm:px-6 pb-6 relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative -mt-10 sm:-mt-12 lg:-mt-16 mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-4 border-white flex items-center justify-center text-white font-bold shadow-xl hover:scale-105 transition-transform duration-300 text-lg sm:text-xl lg:text-3xl">
                  {author.name.charAt(0)}
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {author.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">{author.email}</p>

                {!isOwnProfile && (
                  <button
                    onClick={handleFollowToggle}
                    disabled={isLoading}
                    className={`inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 min-w-[100px] ${
                      isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
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

        <div className="grid grid-cols-3 py-4 sm:py-6 border-t border-gray-200">
          <div className="text-center px-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {Array.isArray(author.blogs) ? author.blogs.length : 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
              Blogs
            </p>
          </div>
          <div className="text-center px-2 border-x border-gray-200">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {Array.isArray(author.followers) ? author.followers.length : 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
              Followers
            </p>
          </div>
          <div className="text-center px-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {Array.isArray(author.followings) ? author.followings.length : 0}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
              Following
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                activeTab === "blogs"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Blogs
              {activeTab === "blogs" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 font-semibold text-sm sm:text-base transition-all duration-300 relative ${
                activeTab === "about"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              About
              {activeTab === "about" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 min-h-[200px]">
          {activeTab === "blogs" && (
            <div>
              {!Array.isArray(author.blogs) || author.blogs.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg
                    className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                    No blogs yet
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    This user hasn't published any blogs.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {author.blogs.map((blog: any, index: number) => (
                    <div
                      onClick={() => navigate(`/user/blog/${blog?._id}`)}
                      key={index}
                      className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 cursor-pointer transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                        {blog.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="py-4 space-y-6">
              <div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  This is {author.name}'s profile. They have written{" "}
                  {Array.isArray(author.blogs) ? author.blogs.length : 0} blogs and
                  have{" "}
                  {Array.isArray(author.followers) ? author.followers.length : 0}{" "}
                  followers.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 uppercase tracking-wide">
                    Member since
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {author.createdAt
                      ? new Date(author.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Unknown date"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}