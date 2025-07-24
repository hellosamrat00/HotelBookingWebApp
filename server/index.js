import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/Db.js"; 
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebHooks.js";


connectDB();

const app = express();


app.use(cors());
app.use(express.json()); 
app.use(clerkMiddleware())

app.use("/api/clerk",clerkWebhooks)

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("API WORKING"));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
