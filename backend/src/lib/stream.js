import { StreamChat } from "stream-chat";
import "dotenv/config";

const apikey = process.env.STREAM_API_KEY;
const apisecret = process.env.STREAM_API_SECRET;

if (!apikey || !apisecret) {
  console.error("Stream apikey and apisecret is missing !");
}

const streamClient = StreamChat.getInstance(apikey, apisecret);
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error Upserting Stream User :", error);
  }
};

export const generatStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream Token :", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
