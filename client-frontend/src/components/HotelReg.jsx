import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [city, setCity] = useState();
  const onSumitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "/api/hotel/",
        { name, contact, address, city },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
        onSubmit={onSumitHandler}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.regImage}
          alt=""
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt=""
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>
          <div class="w-full mt-4">
            <label for="name" class="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              placeholder="Type here"
              class="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required=""
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="w-full mt-4">
            <label for="name" class="font-medium text-gray-500">
              Phone Number
            </label>
            <input
              placeholder="Type here"
              class="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required=""
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div class="w-full mt-4">
            <label for="name" class="font-medium text-gray-500">
              Address
            </label>
            <textarea
              placeholder="Type here"
              class="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required=""
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="w-full mt-4 max-w-60 mr-auto">
            <label for="city" class="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              class="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="Dubai">Dubai</option>
              <option value="Singapore">Singapore</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
            </select>
          </div>
          <button class="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
