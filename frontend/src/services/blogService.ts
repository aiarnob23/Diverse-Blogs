import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie";
import { renderLoginPage } from "../utils/renderLoginPage";

const token = Cookies.get("accessToken");
const author = Cookies.get("email");

// Create new blog
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

// Fetch user based blogs
export const fetchUserBasedBlogs = async () => {
  if (!token || !author) {
    renderLoginPage();
    return;
  }
  try {
    const response = await baseUrl.post(
      "blogs/get-blogs/user",
      { email: author },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response?.data?.data[0]?.blogs;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return null;
  }
};

// Fetch blog details
export const fetchBlogDetails = async (id: any) => {
  try {
    const response = await baseUrl.get(`blogs/blog-details/${id}`, {
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

// Fetch all blogs or category-based blogs
export const fetchAllBlogs = async (
  category: any,
  currentPage: number,
  blogPerPage: number
) => {
  try {
    const response = await baseUrl.get(
      `blogs/all-blogs?category=${category}&page=${currentPage}&blogs=${blogPerPage}`,
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

// Fetch blogs by search term
export const fetchBlogsBySearchTerm = async (searchTerm: any) => {
  try {
    const response = await baseUrl.get(`blogs/search?searchTerm=${searchTerm}`);
    const result = response?.data?.data || [];
    return result;
  } catch (error) {
    console.error("Failed to fetch search results!");
    return null;
  }
};

// Edit existing blog (update)
export const editBlog = async (id: string, updatedBlog: any) => {
  if (!token || !author) {
    renderLoginPage();
    return;
  }
  try {
    const response = await baseUrl.patch(`blogs/edit-blog/${id}`, updatedBlog, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to update blog", error);
    throw new Error("Could not update blog.");
  }
};

// Delete blog
export const deleteBlog = async (id: string) => {
  if (!token || !author) {
    renderLoginPage();
    return;
  }
  try {
    const response = await baseUrl.delete(`blogs/delete-blog/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to delete blog", error);
    throw new Error("Could not delete blog.");
  }
};
 