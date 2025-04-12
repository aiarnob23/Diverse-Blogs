import express from "express";
import { blogControllers } from "./blogs.controller";
import { verifyToken } from "../../middlewares/auth";

const router = express.Router();

// Routes for Blogs
router.get("/all-blogs", blogControllers.getAllBlogs);
router.post("/create-blog", verifyToken, blogControllers.createNewBlog);
router.post("/get-blogs/user", verifyToken, blogControllers.getUserBlogs);
router.get(`/blog-details/:id`, blogControllers.getBlogDetails);
router.get(`/search`, blogControllers.getBlogsBySearch);
router.patch("/edit-blog/:id", verifyToken, blogControllers.updateBlog);
router.delete("/delete-blog/:id", verifyToken, blogControllers.deleteBlog);

export const blogRoutes = router;
