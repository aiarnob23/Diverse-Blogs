import { uploadImageToDB } from "../services/uploadService";

export const useUpload = () => {
  const uploadImage = async (formData: FormData) => {
    try {
      const response = await uploadImageToDB(formData);
      console.log(response);
      return { success: true, error: null , imageUrl: response?.data?.data?.url };
    } catch (error: any) {
      const errorMessage = error?.message;
      return { success: false, error: errorMessage };
    }
  };

  return { uploadImage };
};
