import { useEffect, useState } from "react";
import API from "../axios";

export default function Dashboard() {
  const [finances, setFinances] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFinances = async () => {
    setLoading(true);
    try {
      const res = await API.get("/finance");
      setFinances(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  const addFinance = async () => {
    if (!title.trim() || !price.trim()) return alert("Please enter a title and a price");
    try {
      await API.post("/finance", { title, price });
      setTitle("");
      setPrice("");
      fetchFinances();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFinance = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await API.delete(`/finance/delete/${id}`);
    fetchFinances();
  };

  const editFinance = async (id) => {
    const newPrice = prompt("Enter the new price");
    if (!newPrice) return;
    await API.put(`/finance/editingId/${id}`, { price: newPrice });
    fetchFinances();
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-lg p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-200">
            Finance Manager
          </h1>
          <div className="text-sm text-gray-500"></div>
        </header>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-gray-100">
          <input
            className="col-span-2 input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="input-field text-gray-100"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="md:col-span-3 flex gap-2">
            <button
              onClick={addFinance}
              className="btn text-white hover:opacity-90 border w-17 rounded border-black hover:bg-gray-700"
            >
              Add
            </button>

            <button
              onClick={fetchFinances}
              className="btn border w-18 border-black hover:bg-gray-700 transition text-gray-100 rounded"
            >
              Refresh
            </button>

            <div className="ml-auto text-sm text-gray-500 flex items-center">
              {loading ? "Loading..." : `${finances.length} items`}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {finances.length === 0 && !loading && (
            <div className="text-center py-8 text-white">
              No data found
            </div>
          )}

          {finances.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-200">{item.title}</div>
                <div className="text-sm text-gray-500">Price: {item.price}</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editFinance(item._id)}
                  className="text-gray-100 btn border px-3 py-1 hover:bg-gray-700 transition rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFinance(item._id)}
                  className="w-15 btn bg-gray-100 text-slate-950 rounded hover:bg-gray-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-6 text-xs text-gray-400">
          Track your money
        </footer>
      </div>
    </div>
  );
}
