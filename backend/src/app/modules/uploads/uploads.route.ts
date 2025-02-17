import express from "express";
import upload from "../../middlewares/multer";
import { uploadControllers } from "./uploads.controller";

const router = express.Router();
router.post("/image-upload", upload.single("image"), uploadControllers.handleUploadImage)


export const UploadRoutes = router;