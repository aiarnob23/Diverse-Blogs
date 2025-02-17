import config from "../../config";
import { User } from "../users/users.model";
import { TRegisterUser } from "./auth.interface";
import { createToken } from "./auth.utils";

//create user
const createNewUser = async (userPayload: TRegisterUser) => {
  const result = await User.create(userPayload);
  return result;
};

//login user to get token
const loginUser = async (email: string) => {
  const result = createToken({ email }, config.secret as string, '7d');
  return result;
}

//get users OTP
const getUsersOTP = async (email: string) => {
  const result = await User.findOne({ email: email }).select({ otp: 1 });
  return result;
}

//update users OTP
const updateUsersOTP = async (email: string, OTP: string) => {
  const result = await User.findOneAndUpdate({ email: email }, { otp: OTP },{new:true}).select({email:1});
  return result;
}

//get users verification status
const getUsersVerificationStatus = async (email: string) => {
  const result = User.findOne({ email: email }).select({ isVerified: 1 });
  return result;
}

//update users verification status
const updateUsersVerificationStatus = async (email: string) => {
  const result = await User.findOneAndUpdate({ email: email }, { isVerified: true },{new:true}).select({email:1, isVerified:1});
  return result;
}

export const authServices = {
  createNewUser,
  loginUser,
  getUsersOTP,
  updateUsersOTP,
  getUsersVerificationStatus,
  updateUsersVerificationStatus,
};