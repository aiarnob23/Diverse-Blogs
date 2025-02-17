import catchAsync from "../../utils/catchAsync";
import { generateOTP } from "../../utils/generateOTP";
import { emailOTP } from "../../utils/sendEmail";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

//create new user
const createNewUser = catchAsync(async (req, res) => {
  const payload = req?.body;
  console.log(payload);
  const result = await authServices.createNewUser(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});

//login user to get token
const loginUser = catchAsync(async (req, res) => {
  const payload = req?.body?.email;
  console.log('req aise ' , payload);
  const result = await authServices.loginUser(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});


//send OTP
const sendOTP = catchAsync(async (req, res) => {
  const email = req?.body?.email;
  const OTP = generateOTP(6);
  const result = await authServices.updateUsersOTP(email, OTP);
  if (result) {
    emailOTP(email, OTP);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Please verify your email",
      data: result,
    });
  }
});
//verify OTP
const verifyOTP = catchAsync(async (req, res) => {
  const email = req?.body?.email;
  const OTP = req?.body?.OTP;
  const result = await authServices.getUsersOTP(email);
  if (result?.otp == OTP && OTP != "") {
    await authServices.updateUsersOTP(email, "");
    const result = await authServices.updateUsersVerificationStatus(email);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Email address verified",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "Invalid code",
      data: null,
    });
  }
});

export const authControllers = {
  createNewUser,
  loginUser,
  sendOTP,
  verifyOTP,
};
