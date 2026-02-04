import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //Excluding current user , means you can't recommend yourself
        { $_id: { $nin: currentUser.friends } }, //Excluding current friends means you can't recommend your friends
        { isOnboarded: true }, //Only recommend users who have completed onboarding
      ],
    });
    res.status(200).json({ data: recommendedUsers });
  } catch (error) {
    console.log("Error in getRecommendedUsers Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
export const getMyFriends = async (req, res) => {};
