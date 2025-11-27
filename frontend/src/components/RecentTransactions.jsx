import React from "react";
import { Card } from "./ui/card";

export default function RecentTransactions({ items }) {
  if (!items || items.length === 0) return <div>No recent transactions</div>;

  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div
          key={it._id}
          className="p-3 bg-card rounded flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-muted-foreground">
              {it.category} • {new Date(it.date).toLocaleDateString()}
            </div>
          </div>
          <div className="font-bold">${it.price}</div>
        </div>
      ))}
    </div>
  );
}
