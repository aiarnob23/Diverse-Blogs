import { useEffect, useState } from "react";
import {
  fetchFollowingsList,
  getUserDetailsById,
} from "../../services/userService";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Following() {
  const email = Cookies.get("email");
  const [followings, setFollowings] = useState<string[]>([]);

  useEffect(() => {
    const getFollowingsList = async () => {
      if (!email) {
        console.error("No email found in cookies.");
        return;
      }

      setFollowings([]); 

      const res = await fetchFollowingsList(email);
      if (!res?.data?.data?.[0]?.followings) {
        console.error("Error: No followings data found");
        return;
      }

      const followingIds = res.data.data[0].followings;

      // Fetch all user details in parallel
      const users = await Promise.all(
        followingIds.map(async (followingId: string) => {
          const user = await getUserDetailsById(followingId);
          return user?.data?.name; 
        })
      );

      setFollowings(users.filter(Boolean)); 
    };

    getFollowingsList();
  }, [email]);

  return (
    <div>
      <h2>Following List</h2>
      <div>
        {followings.length > 0 ? (
          followings.map((following, index) => (
            <Link key={index} to="/">
              {following}
            </Link>
          ))
        ) : (
          <p>No followings found.</p>
        )}
      </div>
    </div>
  );
}
