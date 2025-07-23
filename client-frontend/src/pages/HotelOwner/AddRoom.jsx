import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets.js";

const AddRoom = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "FreeWifi": false,
      "Free Breakfast": false,
      "Room services": false,
      "Mountain view": false,
      "Pool Access": false,
    },
  });
  return (
    <form>
      <Title
        title="Add room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
        align="left"
      />

      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
              className="max-h-13 cursor-pointer opacity-80"
            />
            <input
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              type="file"
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            ></input>
          </label>
        ))}
      </div>
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p class="mt-4 text-gray-800">
            Price <span class="text-xs">/night</span>
          </p>
          <input
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            type="number"
            value={input.pricePerNight}
            onChange={e=> setInput({...input,pricePerNight:e.target.value})}
          />
        </div>
      </div>
      <p className="text-gray-800 mt-4">Amenities</p>
      <div class="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
       {Object.keys(input.amenities).map((amenity,index)=>(
         <div key={index}>
          <input id={`amenities${index+1}`} type="checkbox" checked={input.amenities[amenity]} onChange={()=> setInput({...input,amenities:{...input.amenities,[amenity]:!input.amenities[amenity]}})} />
          <label for={`amenity${index+1}`}>{amenity} </label>
        </div>
       ))}
      </div>
      <button className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer">Add Room</button>
    </form>
  );
};

export default AddRoom;
