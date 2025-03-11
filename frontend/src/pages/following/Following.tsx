import { useEffect, useState } from "react";
import {
  fetchFollowingsList,
  getUserDetailsById,
} from "../../services/userService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            People You Follow
          </h2>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {followings.length > 0 ? (
                  followings.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleProfileClick(user.email)}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xl font-bold mr-4 border-2 border-white shadow">
                        {user.name?.charAt(0) || <FaUserCircle />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 hover:text-blue-600">
                          {user.name}
                        </h3>
                        {user.bio && (
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {user.bio}
                          </p>
                        )}
                      </div>
                      <button className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                        View Profile
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaUserCircle className="text-5xl mx-auto text-gray-300 mb-2" />
                    <p>You're not following anyone yet.</p>
                    <p className="text-sm mt-1">
                      When you follow someone, they'll appear here.
                    </p>
                    <Link
                      to="/explore"
                      className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    >
                      Explore Users
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for profile view - reusing the same modal component from Blog */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {profileEmail && <Profiles email={profileEmail} />}
      </Modal>
    </div>
  );
}
