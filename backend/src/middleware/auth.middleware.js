import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Person - No Token Provided ",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    //"-password" Meaning that remove the password for the safety
    // console.log(decode);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not Founded" });
    }
    // console.log(user.email);
    // console.log(user.password);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error at Protect Route Middleware", error);
    res.status(500).json({ message: "Internal Error " });
  }
};
