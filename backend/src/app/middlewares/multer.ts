import multer, { StorageEngine } from "multer";
import { Request, Response, NextFunction } from "express";

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// Create the upload instance
const upload = multer({ storage });

// Export the upload middleware
export default upload;
