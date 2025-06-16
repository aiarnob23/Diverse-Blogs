import { useEffect, useState } from "react";
import {
  fetchFollowingsList,
  getUserDetailsById,
} from "../../services/userService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { FaUserCircle, FaUsers, FaSearch } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import Profiles from "../../components/profiles/Profiles";

export default function Following() {
  const email = Cookies.get("email");
  const [followings, setFollowings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);

  useEffect(() => {
    const getFollowingsList = async () => {
      setLoading(true);
      if (!email) {
        console.error("No email found in cookies.");
        setLoading(false);
        return;
      }

      setFollowings([]);

      try {
        const res = await fetchFollowingsList(email);
        if (!res?.data?.data?.[0]?.followings) {
          console.error("Error: No followings data found");
          setLoading(false);
          return;
        }

        const followingIds = res.data.data[0].followings;

        // Fetch all user details in parallel
        const usersPromises = followingIds.map(async (followingId: string) => {
          const userDetails = await getUserDetailsById(followingId);
          return userDetails?.data || null;
        });

        const users = await Promise.all(usersPromises);
        setFollowings(users.filter(Boolean));
      } catch (error) {
        console.error("Error fetching followings:", error);
      } finally {
        setLoading(false);
      }
    };

    getFollowingsList();
  }, [email]);

  const handleProfileClick = (userEmail: string) => {
    setProfileEmail(userEmail);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6">
              <FaUsers className="text-2xl sm:text-3xl text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              People You Follow
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Connect with the amazing people in your network and discover their latest content
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading your connections...</p>
              </div>
            ) : (
              <div className="p-4 sm:p-6 lg:p-8">
                {followings.length > 0 ? (
                  <>
                    {/* Stats Header */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm sm:text-base">
                            {followings.length}
                          </span>
                        </div>
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          Following {followings.length === 1 ? 'Person' : 'People'}
                        </span>
                      </div>
                    </div>

                    {/* Following List */}
                    <div className="space-y-3 sm:space-y-4">
                      {followings.map((user, index) => (
                        <div
                          key={index}
                          className="group flex items-center p-3 sm:p-4 lg:p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100 hover:shadow-md"
                          onClick={() => handleProfileClick(user.email)}
                        >
                          {/* Avatar */}
                          <div className="relative flex-shrink-0 mr-3 sm:mr-4 lg:mr-5">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              {user.name?.charAt(0)?.toUpperCase() || <FaUserCircle className="text-xl sm:text-2xl" />}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                          </div>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base lg:text-lg mb-1">
                              {user.name}
                            </h3>
                            {user.bio && (
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {user.bio}
                              </p>
                            )}
                            {user.email && (
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                {user.email}
                              </p>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0 ml-3 sm:ml-4">
                            <button className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                              <span className="hidden sm:inline">View Profile</span>
                              <span className="sm:hidden">View</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Empty State */
                  <div className="text-center py-12 sm:py-16 lg:py-20">
                    <div className="max-w-sm mx-auto">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                        <FaSearch className="text-3xl sm:text-4xl text-gray-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        No Following Yet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                        You haven't followed anyone yet. Start exploring and connect with amazing people to see their content here.
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <FaSearch className="mr-2 text-sm" />
                        <span className="text-sm sm:text-base">Discover People</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for profile view */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {profileEmail && <Profiles email={profileEmail} />}
      </Modal>
    </div>
  );
}