import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { mapFirebaseError } from "../utils/errorMapper";
import { registerUserToDB } from "../services/authService";

export const useRegisterUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { EmailPassSignUp } = authContext;

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      // Register user using Firebase
      const response = await EmailPassSignUp(email, password);
      const registeredEmail = response.user?.email;

      if (registeredEmail === email) {
        // Store registered user to DB
        await registerUserToDB(name, email);
        return { success: true, error: null };
      }
    } catch (error: any) {
      // Map Firebase error codes to user-friendly messages
      const errorMessage = mapFirebaseError(error.code) || error.message;
      return { success: false, error: errorMessage };
    }
  };

  return { registerUser };
};
