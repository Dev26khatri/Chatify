import express from "express";
import CookiParser from "cookie-parser";
// const router = express.Router({ mergeParams: true });
// import User from "./models/User.js";
import "dotenv/config";
import authRoutes from "./Routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;
app.use(CookiParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(User.prototype.methods);
//********This is Best Way********//
// console.log(this);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
