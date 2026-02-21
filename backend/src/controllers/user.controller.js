import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      // $and operator is used to combine multiple conditions in a query. and all conditions must be true for a document to be included in the result set.
      //ex.
      // 1. NOT me //condition 1
      // 2. NOT already my friend //condition 2
      // 3. Have completed onboarding //condition 3
      $and: [
        { _id: { $ne: currentUserId } }, //Excluding current user , means you can't recommend yourself
        { _id: { $nin: currentUser.friends } }, //Excluding current friends means you can't recommend your friends
        { isOnboarded: true }, //Only recommend users who have completed onboarding
      ],
    }).select("-password");
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
export const sendFirendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    //prevent sending firend request to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send friend request to yourself :)" });
    }

    //Check if recipient user exists
    const recipintUser = await User.findById(recipientId);
    if (!recipintUser) {
      return res.status(404).json({ message: "Recipint User not found" });
    }
    //Check if already friends
    if (recipintUser.friends.includes(myId)) {
      return res.status(400).json({ message: "User is Already Your Firend " });
    }
    const existsingRequest = await FriendRequest.findOne({
      //$or operator is use for logical or operation in a query.
      //Atleast one of the conditions must be true
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existsingRequest) {
      return res
        .status(400)
        .json({ message: "Friend Request already exists between you two" });
    }
    //Avoid "new" keyword when use "create" method of mongoose
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(200).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFirendRequest Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    //Find the friend request by its ID
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not found" });
    }

    //Check if the logged-in user is the recipient of the friend request
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //Update both users' friend lists
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    //$addToSet operator is used to add a value to an array only if it doesn't already exist in the array. It prevents duplicate entries in the array.
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log("Error in acceptFriendRequest Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    //Find all incoming friend requests for the logged-in user (means curent user is recipient) and populate the sender's details
    const incomingReq = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage",
    );

    //Find all accepted friend requests for the logged-in user (means current user is recipient) and populate the sender's details
    const acceptedReq = await FriendRequest.find({
      recipient: req.user._id,
      status: "accepted",
    }).populate("sender", "fullName profilePic ");
    res.status(200).json({ incomingReq, acceptedReq });
  } catch (error) {
    console.log("Error in getFriendRequests Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const getOutgoingFriendReq = async (req, res) => {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage",
    );
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReq Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const requestReject = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request Not founded" });
    }
    await FriendRequest.findByIdAndDelete(request._id);
    res.status(201).json({ message: "Friend Request Rejected", data: request });
  } catch (err) {
    console.log("Error Throwing at Request Reject controller");
    res.status(500).json({ message: "Internal Error" });
  }
};
