import express from"express"
import upload from "../middlewares/upload.middleware.js"
import { protect } from "../middlewares/auth.middleware.js"
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/room.controller.js"

const roomRouter= express.Router()

roomRouter.post("/",upload.array("images",4),protect,createRoom);
roomRouter.get("/",getRooms)
roomRouter.get("/owner",protect,getOwnerRooms);
roomRouter.post("/toggleAvailability",protect,toggleRoomAvailability)


export default roomRouter