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
