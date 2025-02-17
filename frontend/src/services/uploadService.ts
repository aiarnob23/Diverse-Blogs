
import { baseUrl } from "../utils/baseUrl";

export const uploadImageToDB = async (formData: FormData) => {
  try {
    const response = await baseUrl.post("uploads/image-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      return response;
  } catch (error) {
    console.error("Failed to upload cover image:", error);
    throw new Error("Could not store cover image in the database.");
  }
};
