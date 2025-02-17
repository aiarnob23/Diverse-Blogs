import mongoose, { model, Schema } from "mongoose";
import { TBlog } from "../blogs/blogs.interface";

const blogSchema = new Schema<TBlog>({
  authorName: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  category: {
    type:String,
  },
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required:true,
  },
  comments: {
    type: String,
    required: false,
  },
});

export const Blog = model<TBlog>("Blog", blogSchema);
