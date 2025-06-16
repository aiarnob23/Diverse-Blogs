import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://diverse-blogs-backend.vercel.app/api/",
  withCredentials: true,
});
