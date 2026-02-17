import express from "express";
import CookiParser from "cookie-parser";
// const router = express.Router({ mergeParams: true });
// import User from "./models/User.js";
import "dotenv/config";
import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/user.route.js";
import chatRoutes from "./Routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(CookiParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(User.prototype.methods);
//********This is Best Way********//
// console.log(this);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
