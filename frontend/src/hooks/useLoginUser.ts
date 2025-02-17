import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { mapFirebaseError } from "../utils/errorMapper";

export const useLoginUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { EmailPassLogIn } = authContext;

  const loginUser = async (
    email: string,
    password: string
  ) => {
    try {
      // Register user using Firebase
        const response = await EmailPassLogIn(email, password);
        console.log('login result' , response);
        return { success: true, error: null };
    } catch (error: any) {
        // Map Firebase error codes to user-friendly messages
        console.log(error);
      const errorMessage = mapFirebaseError(error.code) || error.message;
      return { success: false, error: errorMessage };
    }
  };

  return { loginUser };
};
