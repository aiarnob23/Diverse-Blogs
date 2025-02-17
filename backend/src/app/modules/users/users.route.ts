import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router();

router.post('/user-details', userControllers.fetchUserDetails);

export const UserRoutes = router;