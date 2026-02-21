import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFirendRequest,
  getFriendRequests,
  getOutgoingFriendReq,
  acceptFriendRequest,
  requestReject,
} from "../controllers/user.controller.js";
const router = express.Router();

//Apply authentication middleware to all the routes defined below this line
router.use(protectRoute);

router.get("/", getRecommendedUsers);

router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFirendRequest);

router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);

router.get("/outgoing-friend-requests", getOutgoingFriendReq);

router.delete("/friend-request/:id/reject", requestReject);

//TODO: Add route for rejecting friend request and removing friend
export default router;
