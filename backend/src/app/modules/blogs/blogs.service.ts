import { User } from "../users/users.model";
import { userServices } from "../users/users.service";
import { TBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";

// Post new blog
const postNewBlog = async (payload: TBlog) => {
  const author = await userServices.getUserDetails(payload.authorEmail);
  const authorName = author?.name;

  const updatedPayload = { ...payload, authorName };

  const blog = await Blog.create(updatedPayload);

  if (blog?._id) {
    const updatedUser = await User.findOneAndUpdate(
      { email: blog?.authorEmail },
      { $push: { blogs: blog?._id } },
      { new: true }
    );
    return { blog, updatedUser };
  }
};

// Get blogs by search term
const getBlogsBySearchTerm = async (searchTerm: any) => {
  if (searchTerm === "" || searchTerm === null) {
    return [];
  }
  const result = await Blog.find({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
    ],
  }).sort({ date: -1 });
  return result;
};

// Get all blogs
const getBLogs = async (category: any, page: any, blogs: any) => {
  let filter = {};
  let currentPage = page || 1;
  let limit = blogs || 18;

  if (category) {
    filter = { category };
  }

  const totalBLogs = await Blog.countDocuments(filter);
  const result = await Blog.find(filter)
    .skip((+currentPage - 1) * +limit)
    .limit(+limit)
    .sort({ date: -1 });

  return { result, totalBLogs };
};

// Get blogs using user email
const findUserBlogs = async (email: string) => {
  const blogs = await User.find({ email: email }, { blogs: 1 }).populate(
    "blogs"
  );
  return blogs;
};

// Get single blog details
const getBlogDetails = async (id: any) => {
  const blog = await Blog.findById(id);
  return blog;
};

// Update blog (partial update)
const updateBLog = async (id: any, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Delete blog
const deleteBLog = async (id: any) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServices = {
  postNewBlog,
  findUserBlogs,
  getBlogDetails,
  getBLogs,
  getBlogsBySearchTerm,
  updateBLog,
  deleteBLog,
};
