import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Booked", value: 65 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 15 },
];

const COLORS = ["#4f46e5", "#22c55e", "#ef4444"];

const BookingStatusChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Booking Status</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingStatusChart;
