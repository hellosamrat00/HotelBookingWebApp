import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/Db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/user.routes.js";
import hotelRouter from "./routes/hotel.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/room.route.js";
import bookingRouter from "./routes/booking.routes.js";

connectDB();
connectCloudinary()

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("API WORKING"));
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
