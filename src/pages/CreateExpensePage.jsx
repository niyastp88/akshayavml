import { useState } from "react";
import API from "../api/api";

const CreateExpensePage = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return alert("Enter expense name");

    await API.post("/expenses", { name });

    alert("Expense added");
    setName("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">
        Create Expense Type
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          placeholder="Expense name (Rent, Salary...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Add
        </button>

      </form>
    </div>
  );
};

export default CreateExpensePage;