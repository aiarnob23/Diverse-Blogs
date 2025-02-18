import { User } from "../users/users.model";
import { TBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";

//post new blog
const postNewBlog = async (payload: TBlog) => {
  const blog = await Blog.create(payload);
    console.log("Created blog:", blog);

  if (blog?._id) {
    const updatedUser = await User.findOneAndUpdate(
      { email: blog?.authorEmail }, 
      { $push: { blogs: blog?._id } }, 
      { new: true } 
    );

    console.log("Updated user:", updatedUser);
    return { blog, updatedUser };
  }
};

//get all blogs
const getBLogs = async (category:any, page:any, blogs:any) => {
  let filter = {}; 
  let currentPage = page || 1;
  let limit = blogs || 18;
  console.log(currentPage, limit);
  if (category) {
    filter = { category };
  }
  const totalBLogs = await Blog.countDocuments(filter);
  const result = await Blog.find(filter)
    .skip((+currentPage - 1) * +limit)
    .limit(+limit)
    .sort({ date: -1 });
  console.log(result);
  return { result, totalBLogs};
}

//get blogs using user email
const findUserBlogs = async (email: string) => {
  const blogs = await User.find({ email: email }, { blogs: 1 }).populate("blogs");
  console.log(blogs);
  return blogs;
}

//get single blogs details
const getBlogDetails = async (id: any) => {
  const blog = await Blog.findById(id);
  return blog;
}

export const blogServices = {
  postNewBlog,
  findUserBlogs,
  getBlogDetails,
  getBLogs,
};
