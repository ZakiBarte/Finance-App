import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useExpenseStore } from "../../store/expenseStore";
import { Button } from "../../components/ui/button";

import ExpenseBarChart from "../../components/charts/ExpenseBarChart";
import ExpensePieChart from "../../components/charts/ExpensePieChart";
import MonthlyTotalsChart from "../../components/charts/MonthlyTotalsChart";
import CategoryDonutChart from "../../components/charts/CategoryDonutChart";
import RecentTransactions from "../../components/RecentTransactions";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { expenses, fetchExpenses, fetchSummary } = useExpenseStore();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchExpenses();
    (async () => {
      const s = await fetchSummary();
      setSummary(s);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = Array.isArray(expenses)
    ? expenses.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
    : 0;

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || user?.email}
        </h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      {/* Summary */}
      <div className="bg-card p-5 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p>
          Total Expenses: <span className="font-bold">${total}</span>
        </p>
        <Link
          to="/expenses"
          className="inline-block mt-3 bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Manage Expenses
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-card p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Monthly Totals</h3>
          <MonthlyTotalsChart data={summary?.monthly} />
        </div>

        <div className="bg-card p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">By Category</h3>
          <CategoryDonutChart data={summary?.byCategory} />
        </div>

        <div className="col-span-2 bg-card p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Expenses Bar Chart</h3>
          <ExpenseBarChart data={expenses} />
        </div>

        <div className="bg-card p-5 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
          <RecentTransactions items={summary?.recent} />
        </div>
      </div>
    </div>
  );
}
