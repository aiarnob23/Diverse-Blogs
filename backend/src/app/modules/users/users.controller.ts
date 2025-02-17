import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./users.service";

const fetchUserDetails = catchAsync(async (req, res) => {
    const email = req?.body?.email;
    const result = await userServices.getUserDetails(email);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User details",
        data:result,
    })
})

export const userControllers = {
    fetchUserDetails,
}