import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  roomsDummyData,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setmainIage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setmainIage(room.images[0]);
  }, [id]);
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">{room.roomType}</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="" srcset="" />
          <span> {room.hotel.address}</span>
        </div>
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => {
                return (
                  <img
                    className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                      mainImage == image ? "outline outline-orange-700" : ""
                    }`}
                    onClick={() => {
                      setmainIage(image);
                    }}
                    src={image}
                    key={index}
                  ></img>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium"> $ {room.pricePerNight}/night</p>
        </div>

        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div class="flex flex-col">
              <label for="checkInDate" class="font-medium">
                Check-In
              </label>
              <input
                id="checkInDate"
                min="2025-07-23"
                class="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-In"
                required=""
                type="date"
              />
            </div>
            <div class="flex flex-col">
              <label for="checkOutDate" class="font-medium">
                Check-Out
              </label>
              <input
                id="checkOutDate"
                disabled=""
                class="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-Out"
                required=""
                type="date"
              />
            </div>
            <div class="flex flex-col">
              <label for="guests" class="font-medium">
                Guests
              </label>
              <input
                id="guests"
                class="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="0"
                required=""
                type="number"
                value="1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availability
          </button>
        </form>

        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => {
            return (
              <div className="flex items-start gap-2">
                <img src={spec.icon} alt="" className="w-6.5" />
                <div>
                  <p className="text-base">{spec.title}</p>
                  <p className="text-gray-500">{spec.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <img
              src={room.hotel.owner.image}
              alt="Host "
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            />
          </div>
          <div>
            <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
