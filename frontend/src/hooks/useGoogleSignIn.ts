import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAdditionalUserInfo } from "firebase/auth";
import { registerUserToDB } from "../services/authService";
import { mapFirebaseError } from "../utils/errorMapper";

export const useGoogleSignIn = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided!");
  }

  const { GoogleSignIn } = authContext;

  const handleGoogleSignIn = async () => {
    //Google signIn & signUp
    try {
      const response = await GoogleSignIn();
      const additionalUserInfo = getAdditionalUserInfo(response);
      if (additionalUserInfo?.isNewUser) {
        //store new user to DB
        const name = additionalUserInfo?.profile?.name;
        const email = additionalUserInfo?.profile?.email;
        await registerUserToDB(name as string, email as string);
        return { success: true, error: null };
      }
    } catch (error: any) {
      const errorMessage = mapFirebaseError(error.code) || error.message;
      return { success: false, error: errorMessage };
    }
  };

  return { handleGoogleSignIn };
};
