import { User } from "../models/user.model.js";
import { json } from "express";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    await wHook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
    }
    res.json({ success: true, message: "Web hook Recieved" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error in web hook" });
  }
};
export default clerkWebhooks;
