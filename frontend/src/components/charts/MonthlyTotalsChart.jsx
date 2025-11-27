import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function MonthlyTotalsChart({ data }) {
  // data: array of { _id: { year, month }, total }
  const formatted = (data || []).map((d) => ({
    name: `${d._id.year}-${String(d._id.month).padStart(2, "0")}`,
    total: d.total,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#F59E0B"
            fill="#F59E0B"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
