import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import JWT from "jsonwebtoken";

//**********Singup Controller For the Singup Route**********//

export const SignupController = async (req, res) => {
  //   console.log(req);
  let { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Field Are Required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must Be At Least 6 Characters" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Are Already Existing ,Please Try Another" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    //Directly Save Data into DB with create() Method
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    //Create the Stream User
    try {
      await upsertStreamUser({
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user Created for ${newUser.fullName}`);
    } catch (err) {
      console.log("Error Creating for stream ");
    }

    const token = JWT.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error is signup Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//********** Login Controller Logic For the Login Route **********//
export const LoginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    //Cheack Email IN DB
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email " });

    const isPasswordCorrect = await user.matchPassword(password);
    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid  password " });

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login Controller", error.message);
    res.status(500).json({ message: "Internal Error" });
  }
};
export const LogoutController = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout Successful" });
};

export const onboard = async (req, res) => {
  // console.log(req.user);
  try {
    const userId = req.user;
    // console.log(userId);
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All Fields Are Required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean), //It removes falsey values only gives true values
        data: req.body,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId._id,
      { ...req.body, isOnboarded: true },
      {
        new: true,
      },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error in Onboarding Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
