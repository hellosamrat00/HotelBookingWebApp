import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets.js";

const Dashboard = () => {
  const [dashboarddata, setDashboardData] = useState(dashboardDummyData);
  return (
    <div>
      <Title
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
        align="left"
      />

      <div className="flex gap-4 my-8">
        <div class="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div class="flex flex-col sm:ml-4 font-medium">
            <p class="text-blue-500 text-lg">Total Bookings</p>
            <p class="text-neutral-400 text-base">
              {dashboarddata.totalBookings}
            </p>
          </div>
        </div>
        <div class="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div class="flex flex-col sm:ml-4 font-medium">
            <p class="text-blue-500 text-lg">Total Revenue</p>
            <p class="text-neutral-400 text-base">
              $ {dashboarddata.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>
      <div class="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th class="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th class="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th class="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            {dashboarddata.bookings.map((item,index)=>(
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>
                 <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                 $ {item.totalPrice}
                </td>
                <td className="py-3 px-4 flex border-t border-gray-300 text-center">
                  <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-200 text-green-600':"bg-red-200 text-yellow-500"}`}>
                    {item.isPaid ? "Completed" :"Pending"}
                  </button>
                </td>
                

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
