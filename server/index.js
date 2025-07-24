import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/Db.js";
import clerkWebhooks from "./controllers/clerkWebHooks.js";

connectDB();
const app = express();

app.use(cors());
app.use(express.json()); // only for normal routes

// raw body middleware only for Clerk webhook route
app.post("/api/clerk/events", express.raw({ type: "*/*" }), clerkWebhooks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
