import { Hotel } from "../models/hotel.model.js";
import { Room } from "../models/room.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    // Get hotel by current logged-in user's ID
    const hotel = await Hotel.findOne({ owner: req.auth?.userId });

    if (!hotel) {
      return res.status(404).json({ success: false, message: "No Hotel found for this user" });
    }


    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    const parsedAmenities = Array.isArray(amenities)
      ? amenities
      : JSON.parse(amenities); // Handle form-data stringified JSON

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: parsedAmenities,
      images,
    });

    res.status(201).json({ success: true, message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate(
        {
            path:"hotel",
            populate:{
                path:"owner",
                select:'image'
            }
        }
    ).sort({createdAt: -1})
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOwnerRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth?.userId });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found for this user" });
    }

    const rooms = await Room.find({ hotel: hotel._id.toString() }).populate("hotel");
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.status(200).json({
      success: true,
      message: `Room is now ${room.isAvailable ? "available" : "unavailable"}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}