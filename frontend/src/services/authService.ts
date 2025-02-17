import { baseUrl } from "../utils/baseUrl";

export const registerUserToDB = async (name: string, email: string) => {
  try {
    await baseUrl.post("auth/register", { name, email });
  } catch (error) {
    console.error("Failed to register user to DB:", error);
    throw new Error("Could not store user in the database.");
  }
};

