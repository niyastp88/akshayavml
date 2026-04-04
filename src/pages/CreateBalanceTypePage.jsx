import { useState } from "react";
import API from "../api/api";

const CreateBalanceTypePage = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return alert("Enter name");

    await API.post("/add-balance", { name });

    alert("Balance type added");
    setName("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">
        Create Balance Type
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          placeholder="SBI Current Deposit / PSA Load"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Add
        </button>

      </form>
    </div>
  );
};

export default CreateBalanceTypePage;