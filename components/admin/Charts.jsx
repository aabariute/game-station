"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Charts({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="month_year"
          stroke="var(--color-neutral-500)"
          fontSize={15}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--color-neutral-500)"
          fontSize={15}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="4" />
        <Bar
          dataKey="total_sales"
          stroke="var(--color-indigo-800)"
          fill="var(--color-indigo-700)"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
