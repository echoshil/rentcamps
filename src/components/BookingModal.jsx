import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Active', value: 24, color: 'hsl(var(--primary))' },
  { name: 'Pending', value: 8, color: 'hsl(var(--warning))' },
  { name: 'Completed', value: 45, color: 'hsl(var(--success))' },
  { name: 'Cancelled', value: 3, color: 'hsl(var(--destructive))' },
];

export default function BookingStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
