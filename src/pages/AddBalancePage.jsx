import { useEffect, useState } from "react";
import API from "../api/api";

const AddBalancePage = () => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    API.get("/add-balance").then((res) => setTypes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !amount) return alert("Fill all");

    await API.post("/balance-tx", {
      type,
      amount: Number(amount),
    });

    alert("Balance updated");
    setAmount("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">
        Add Balance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Type</option>

          {types.map((t) => (
            <option key={t._id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddBalancePage;