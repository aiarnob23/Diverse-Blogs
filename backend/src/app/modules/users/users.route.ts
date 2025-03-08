import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router();

router.post('/user-details', userControllers.fetchUserDetails);
router.get(`/user-details-by-id/:id`, userControllers.fetchUserDetailsById);
router.get(`/following-list/:id`, userControllers.getFollowingsList);
router.get(`/followers-list/:id`, userControllers.getFollowersList);
router.patch(`/followings`, userControllers.updateFollowingsList);
router.patch(`/followers`, userControllers.updateFollowersList);

export const UserRoutes = router;