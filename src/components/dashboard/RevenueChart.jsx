import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          { month: "Jan", revenue: 1200000 },
          { month: "Feb", revenue: 900000 },
          { month: "Mar", revenue: 1500000 },
          { month: "Apr", revenue: 2000000 },
          { month: "May", revenue: 1700000 },
          { month: "Jun", revenue: 2200000 },
        ];

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `Rp ${v / 1000}k`} />
            <Tooltip
              formatter={(value) => [`Rp ${value.toLocaleString()}`, "Revenue"]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
