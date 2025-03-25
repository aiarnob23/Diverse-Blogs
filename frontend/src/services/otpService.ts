import { baseUrl } from "../utils/baseUrl";
//send otp
export const sendOTP = async (email: string) => {
  try {
    const response = await baseUrl.post("auth/send-OTP", { email });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//verify otp
export const verifyOTP = async (email: string, OTP: string) => {
  try {
    const response = await baseUrl.post("auth/verify-OTP", { email, OTP });
    return response;
  } catch (error) {
    console.log(error);
  }
};
