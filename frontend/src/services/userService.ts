import { baseUrl } from "../utils/baseUrl";

//get user details by email
export const getUserDetails = async (email: string) => {
    console.log(email);
  try {
    const response = await baseUrl.post("user/user-details", {
      email:email,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

//get user details by id
export const getUserDetailsById = async (id: string) => {
  try {
    console.log(id);
    const response = await baseUrl.get(`user/user-details-by-id/${id}`);
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}


//get followings list
export const fetchFollowingsList = async (email: string) => {
  try {
    console.log(email);
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
