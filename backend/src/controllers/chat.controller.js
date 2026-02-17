import { generatStreamToken } from "../lib/stream.js";
export const getStreamToken = async (req, res) => {
  try {
    const token = generatStreamToken(req.user._id.toString());
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken Controller", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
