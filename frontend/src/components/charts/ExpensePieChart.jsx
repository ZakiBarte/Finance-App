import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function ExpensePieChart({ data }) {
  const COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"];

  const safeData = Array.isArray(data) ? data : [];
  const formatted = safeData.map((item, index) => ({
    name: item.title,
    value: item.price,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatted}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            label
          >
            {formatted.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
