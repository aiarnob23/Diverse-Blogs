import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  profileImage?: string;
  blogs?: Types.ObjectId[];
  isVerified?: boolean;
  otp?: string;
  followers?: Types.ObjectId[];
  followings?: Types.ObjectId[];
};
