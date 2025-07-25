import { Booking } from "../models/booking.model.js";
import { Hotel } from "../models/hotel.model.js";
import { Room } from "../models/room.model.js";


// 1. Check Availability (Utility Function)
export const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } catch (error) {
    console.error("Check Availability Error:", error.message);
    return false;
  }
};

// 2. API Route for Checking Availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 3. Create Booking Route
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // corrected: 60*60*24
    const totalPrice = nights * roomData.pricePerNight;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({ success: true, message: "Booking successful", booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 4. Get All Bookings of a User
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate({
        path: "room",
        populate: {
          path: "hotel",
          select: "name city address",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getHotelBookings = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // Find the hotel(s) owned by the logged-in user
    const hotel = await Hotel.findOne({ owner: ownerId });

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found for this owner" });
    }

    // Find all bookings associated with the hotel
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room user hotel")
      .sort({ createdAt: -1 });

      const totalBookings = bookings.length
      const totalRevenue = bookings.reduce((acc,booking)=>acc + booking.totalPrice,0)

    res.json({ success: true, dashboardData:{
        totalBookings, totalRevenue, bookings
    }});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

