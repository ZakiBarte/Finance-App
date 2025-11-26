import { useEffect, useState } from "react";
import { useExpenseStore } from "../../store/expenseStore";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function ExpensesPage() {
  const { expenses, fetchExpenses, addExpense, deleteExpense, updateExpense } = useExpenseStore();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) return;
    if (editingId) {
      updateExpense(editingId, { title, price: Number(price), category, date });
      setEditingId(null);
    } else {
      addExpense({ title, price: Number(price), category, date });
    }
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setPrice(expense.price);
    setEditingId(expense._id);
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <Card className="max-w-md mx-auto p-6 mb-6">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Expense" : "Add Expense"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-transparent">
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-md border px-3 py-2 bg-transparent" />
            <Button type="submit" className="w-full">{editingId ? "Update" : "Add"}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto space-y-3">
          {expenses && Array.isArray(expenses) && expenses.map((expense) => (
          <Card key={expense._id} className="flex justify-between items-center p-4">
            <div>
              <h2 className="font-bold">{expense.title}</h2>
              <p>${expense.price} {expense.category ? `• ${expense.category}` : ""}</p>
              {expense.date && <p className="text-sm text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(expense)}>
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteExpense(expense._id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
