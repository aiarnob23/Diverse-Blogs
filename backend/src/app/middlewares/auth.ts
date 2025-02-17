import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Extend the Request interface locally in this file
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = (
  req: CustomRequest, // Use the extended CustomRequest type
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  console.log("Authorization token:", token);

  if (!token) {
    console.log("No token provided");
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      redirectTo: "/auth/login",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.secret as string) as
      | string
      | JwtPayload;
    console.log("Decoded token:", decoded);

    // Attach user info to the request
    req.user = decoded;

    next(); // Call the next middleware
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({
      success: false,
      message: "Forbidden access",
      redirectTo: "/auth/login",
    });
    return;
  }
};

