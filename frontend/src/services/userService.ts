import { baseUrl } from "../utils/baseUrl";

// Get user details by email
export const getUserDetails = async (email: string) => {
  try {
    const response = await baseUrl.post("user/user-details", {
      email: email,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get user details by id
export const getUserDetailsById = async (id: string) => {
  try {
    const response = await baseUrl.get(`user/user-details-by-id/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update following list
export const followUser = async (selfId:string, followingId:string) => {
  try {
    const response = await baseUrl.patch(`user/followings`, {
      selfId: selfId,
      followingId:followingId
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get followings list
export const fetchFollowingsList = async (email: string) => {
  try {
    const response = await getUserDetails(email);
    if (!response || !response._id) {
      throw new Error("User not found or invalid email");
    }
    const id = response._id;
    const res = await baseUrl.get(`user/following-list/${id}`);
    return res;
  } catch (error) {
    console.error("Error fetching followings list:", error);
    return null;
  }
};
