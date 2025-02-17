import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post('/register', authControllers.createNewUser);
router.post('/login', authControllers.loginUser);
router.post('/send-OTP', authControllers.sendOTP);
router.post('/verify-OTP', authControllers.verifyOTP);

export const AuthRoutes = router;