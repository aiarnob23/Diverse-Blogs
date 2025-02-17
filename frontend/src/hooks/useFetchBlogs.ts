import { useState } from "react";
import { fetchAllBlogs } from "../services/blogService";

export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBlogs = async (selectedCategory: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllBlogs(selectedCategory);
      setBlogs(response);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { getBlogs ,blogs, loading, error };
};
