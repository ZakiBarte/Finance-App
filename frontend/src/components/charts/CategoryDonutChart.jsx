import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function CategoryDonutChart({ data }) {
  const formatted = (data || []).map((d) => ({
    name: d._id || "Uncategorized",
    value: d.total,
  }));
  const COLORS = [
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#8B5CF6",
    "#F97316",
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
          >
            {formatted.map((entry, index) => (
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
}
