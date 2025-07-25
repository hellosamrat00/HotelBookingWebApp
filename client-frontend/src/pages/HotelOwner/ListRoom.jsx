import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast"; // Make sure this is imported!

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken } = useAppContext();

  const fetchRooms = async () => {
    try {
      const response = await axios.get("/api/room", {
        headers: {
          Authorization: `Bearer ${await getToken()}`, // ✅ Await token
        },
      });
      if (response.data.success) {
        setRooms(response.data.rooms);
      } else {
        console.error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/room/toggleAvailability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`, // ✅ Await token here too
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRooms(); // ✅ refresh updated room data
      } else {
        toast.error(data.message || "Toggle failed");
      }
    } catch (err) {
      toast.error("Error toggling availability");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <Title
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
        align="left"
      />
      <p className="text-gray-500 mt-8">Total Hotels</p>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">Price / night</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
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
                  <label className="relative inline-flex items-center cursor-pointer text-gray-950 gap-3">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      onChange={() => toggleAvailability(item._id)}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
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
