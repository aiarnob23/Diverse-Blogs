import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blogs.service";

//create new blog
const createNewBlog = catchAsync(async (req, res) => {
  const payload = req?.body;
    const result = await blogServices.postNewBlog(payload);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog Posted",
        data:result,
    })
})

//get blogs using email
const getUserBlogs = catchAsync(async (req, res) => {
  const email = req?.body?.email;
  const result = await blogServices.findUserBlogs(email);
  sendResponse(res, {
    success:true,
    statusCode: 200,
    message: "Blogs fetched successfully",
    data:result,
  })
})

//get blog details 
const getBlogDetails = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await blogServices.getBlogDetails(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog details fetched successfully",
    data: result,
  });
})

//get all blogs 
const getAllBlogs = catchAsync(async (req, res) => {
  const { category , page, blogs } = req?.query || null;
  const result = await blogServices.getBLogs(category , page, blogs);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blogs search results",
    data: result,
  })

})

//get blogs by search-term
const getBlogsBySearch = catchAsync(async (req, res) => {
  const searchTerm = req?.query?.searchTerm || "";
  const result = await blogServices.getBlogsBySearchTerm(searchTerm);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Search Results",
    data:result,
  })
})


export const blogControllers = {
  createNewBlog,
  getUserBlogs,
  getBlogDetails,
  getAllBlogs,
  getBlogsBySearch,
}