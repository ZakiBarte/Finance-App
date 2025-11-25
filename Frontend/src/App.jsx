import { useState } from "react";

function App() {
  const [finances, setFinances] = useState([
    { id: 1, title: "Salary", price: 1500 },
    { id: 2, title: "Rent", price: 500 },
  ]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  // إضافة أو تعديل مؤقت (Mock)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || price === "") return;

    if (editingId) {
      setFinances((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, title, price: Number(price) } : item
        )
      );
      setEditingId(null);
    } else {
      setFinances((prev) => [
        ...prev,
        { id: Date.now(), title, price: Number(price) },
      ]);
    }

    setTitle("");
    setPrice("");
  };

  // حذف مؤقت
  const handleDelete = (id) => {
    setFinances((prev) => prev.filter((item) => item.id !== id));
  };

  // تعديل مؤقت
  const handleEdit = (finance) => {
    setTitle(finance.title);
    setPrice(finance.price);
    setEditingId(finance.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Finance Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Finance" : "Add Finance"}
        </button>
      </form>

      <div className="max-w-md mx-auto">
        {finances.length === 0 ? (
          <p className="text-center text-gray-500">No finance records.</p>
        ) : (
          finances.map((finance) => (
            <div
              key={finance.id}
              className="bg-white p-4 mb-3 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{finance.title}</h2>
                <p className="text-gray-700">${finance.price}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(finance)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(finance.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;