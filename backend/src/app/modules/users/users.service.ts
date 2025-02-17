import { User } from "./users.model"

const getUserDetails = async (email: string) => {
    const result = await User.findOne({ email: email });
    return result;
}

export const userServices = {
    getUserDetails,
}