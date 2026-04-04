import { useEffect, useState } from "react";
import API from "../api/api";

const AddExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    API.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selected || !amount) return alert("Fill all fields");

    await API.post("/expenses/add", {
      expenseName: selected,
      amount: Number(amount),
    });

    alert("Expense added");
    setSelected("");
    setAmount("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Expense</option>
          {expenses.map((e) => (
            <option key={e._id}>{e.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddExpensePage;