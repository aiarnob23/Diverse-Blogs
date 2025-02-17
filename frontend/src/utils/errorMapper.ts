export const mapFirebaseError = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "The email address you provided is already in use.";
    case "auth/invalid-email":
      return "The email address format is invalid. Please enter a valid email.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    case "auth/user-not-found":
      return "No user found with the provided email. Please check and try again.";
    case "auth/wrong-password":
      return "The password you entered is incorrect. Please try again.";
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completing the process.";
    case "auth/network-request-failed":
      return "Network error occurred. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many unsuccessful attempts. Please try again later.";
    case "auth/operation-not-allowed":
      return "This authentication method is currently disabled. Please contact support.";
    case "auth/invalid-credential":
      return "Check your email and password again.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
