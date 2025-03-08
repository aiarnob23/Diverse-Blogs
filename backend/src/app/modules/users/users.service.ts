import { User } from "./users.model";

//get user details by email
const getUserDetails = async (email: string) => {
  const result = await User.findOne({ email: email }).populate("blogs");
  return result;
};

//get users details by id
const getUserDetailsById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

//get following list
const getFollowingsList = async (id: string) => {
  const result = await User.find({ _id: id }, { followings: 1 });
  return result;
};

//update following list
const updateFollowingList = async (selfId: string, followingId: string) => {
  const result = await User.findByIdAndUpdate(
    selfId,
    { $addToSet: { followings: followingId } },
    { new: true }
  );
  if (result) {
    await User.findByIdAndUpdate(
      followingId,
      { $addToSet: { followers: selfId } },
      { new: true }
    );
    return result;
  }
  return null;
};

//get followers list
const getFollowersList = async (id: string) => {
  const result = await User.find({ _id: id }, { followers: 1 });
  return result;
};

//update followers list
const updateFollowersList = async (selfId: string, followerId: string) => {
  const result = await User.findByIdAndUpdate(
    selfId,
    { $addToSet: { followers: followerId } },
    { new: true }
  );
  if (result) {
    await User.findByIdAndUpdate(
      followerId,
      { $addToSet: { followings: selfId } },
      { new: true }
    );
    return result;
  }
  return null;
};

export const userServices = {
  getUserDetails,
  getUserDetailsById,
  getFollowingsList,
  updateFollowingList,
  getFollowersList,
  updateFollowersList,
};
