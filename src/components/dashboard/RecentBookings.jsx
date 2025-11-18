import React from "react";

const RecentBookings = () => {
  const bookings = [
    {
      id: "BK001",
      customer: "Budi Santoso",
      item: "Tenda Dome 4 Orang",
      date: "2025-01-12",
      status: "Completed",
    },
    {
      id: "BK002",
      customer: "Siti Rahma",
      item: "Sleeping Bag Premium",
      date: "2025-01-13",
      status: "Pending",
    },
    {
      id: "BK003",
      customer: "Andi Wijaya",
      item: "Kompor Portable",
      date: "2025-01-14",
      status: "Cancelled",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-3">Booking ID</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Item</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-3">{b.id}</td>
                <td className="py-2 px-3">{b.customer}</td>
                <td className="py-2 px-3">{b.item}</td>
                <td className="py-2 px-3">{b.date}</td>
                <td
                  className={`py-2 px-3 font-semibold ${
                    b.status === "Completed"
                      ? "text-green-600"
                      : b.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {b.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
