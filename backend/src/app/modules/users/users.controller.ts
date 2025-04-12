import catchAsync from "../../utils/catchAsync";
import { errorResponse } from "../../utils/errorResponse";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./users.service";

//get users details by email
const fetchUserDetails = catchAsync(async (req, res) => {
  const email = req?.body?.email;
  const result = await userServices.getUserDetails(email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User details",
    data: result,
  });
});

//get users details by Id
const fetchUserDetailsById = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    sendResponse(res, errorResponse("Id not provided", 400));
  }
  const result = await userServices.getUserDetailsById(id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User details",
    data: result,
  });
});

//get users followings list
const getFollowingsList = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    sendResponse(res, errorResponse("Id not provided", 400));
  }
  const result = await userServices.getFollowingsList(id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Followings",
    data: result,
  });
});

//update following list
const updateFollowingsList = catchAsync(async (req, res) => {
  const { selfId, followingId } = req?.body;
  console.log(selfId,followingId);
  if (!selfId || !followingId) {
    sendResponse(res, errorResponse("Invalid Request", 400));
  }
  const result = await userServices.updateFollowingList(
    selfId as string,
    followingId as string
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Added to following list",
    data: result,
  });
});

//get users followers list
const getFollowersList = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    sendResponse(res, errorResponse("Id not provided", 400));
  }
  const result = await userServices.getFollowersList(id as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Followers",
    data: result,
  });
});

//update follwers list
const updateFollowersList = catchAsync(async (req, res) => {
  const { selfId, followerId } = req?.body;
  if (!selfId || !followerId) {
    sendResponse(res, errorResponse("Invalid Request", 400));
  }
  const result = await userServices.updateFollowersList(
    selfId as string,
    followerId as string
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Added to follower list",
    data: result,
  });
});

export const userControllers = {
  fetchUserDetails,
  fetchUserDetailsById,
  getFollowingsList,
  updateFollowingsList,
  getFollowersList,
  updateFollowersList,
};
