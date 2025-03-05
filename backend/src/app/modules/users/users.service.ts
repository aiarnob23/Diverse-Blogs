import { User } from "./users.model"

//get user details
const getUserDetails = async (email: string) => {
    const result = await User.findOne({ email: email }).populate("blogs");
    return result;
}

//get following lists
// const getFollowingLists = async()

export const userServices = {
    getUserDetails,
}