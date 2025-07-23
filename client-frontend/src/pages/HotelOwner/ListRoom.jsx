import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);
  return (
    <div>
      <Title
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
        align="left"
      />
      <p className="text-gray-500 mt-8">Total Hotels</p>
      <div class="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table class="w-full">
          <thead class="bg-gray-50 ">
            <tr>
              <th class="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th class="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th class="py-3 px-4 text-gray-800 font-medium">Price / night</th>
              <th class="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
              {rooms.map((item,index)=>(
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                 <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                 $ {item.pricePerNight}
                </td>
                 <td className="py-3 px-4 border-t border-gray-300 text-red-500 text-center">
                 <label htmlFor="" className="relative inline-flex items-center cursor-pointer text-gray-950 gap-3">
                  <input type="checkbox" className="sr-only peer" checked={item.isAvailable} />
                  <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200">

                  </div>
                  <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"
                   ></span>
                 </label>
                </td>
                
                
                

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
