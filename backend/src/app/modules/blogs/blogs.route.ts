import express from "express";
import { blogControllers } from "./blogs.controller";
import { verifyToken } from "../../middlewares/auth";

const router = express.Router();

router.get('/all-blogs', blogControllers.getAllBlogs);
router.post('/create-blog', verifyToken, blogControllers.createNewBlog);
router.post('/get-blogs/user', verifyToken, blogControllers.getUserBlogs);
router.get(`/blog-details/:id`, blogControllers.getBlogDetails);
router.get(`/search`, blogControllers.getBlogsBySearch);

export const blogRoutes = router;