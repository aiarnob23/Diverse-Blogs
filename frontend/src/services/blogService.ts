import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie";
import { renderLoginPage } from "../utils/renderLoginPage";

const token = Cookies.get("accessToken");
const author = Cookies.get("email");

//create new blog
export const createNewBlog = async (blog: any) => {
  if (!token || !author) {
    renderLoginPage();
    return;
  }
  try {
    const response = await baseUrl.post(
      "blogs/create-blog",
      { ...blog, author },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to post new blog:", error);
    throw new Error("Could not store new blog.");
  }
};

//fetch user based blogs
export const fetchUserBasedBlogs = async () => {
  if (!token || !author) {
    renderLoginPage();
    return;
  }
  try {
    const response = await baseUrl.post(
      "blogs/get-blogs/user",
      {email:author},
      {
        headers: {
          Authorization:`${token}`,
        },
      }
    )
    return response?.data?.data[0]?.blogs;
  }
  catch (error) {
    console.error("Failed to fetch blogs", error);
    return null;
  }
}

//fetch blogs details
export const fetchBlogDetails = async (id:any) => {
  try {
    const response = await baseUrl.get(
      `blogs/blog-details/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return null;
  }
};

//fetch all blogs or category based blogs
export const fetchAllBlogs = async (category: any) => {
  try {
    const response = await baseUrl.get(`blogs/all-blogs?category=${category}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return null;
  }
};
