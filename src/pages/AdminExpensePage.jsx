import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllExpenses,
  deleteExpense,
  updateExpense,
} from "../redux/slices/expenseSlice";
import API from "../api/api";

const AdminExpensePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.expense);

  const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [staffId, setStaffId] = useState("");
const [staffs, setStaffs] = useState([]);

useEffect(() => {
  const fetchStaff = async () => {
    const res = await API.get("/users");
    setStaffs(res.data);
  };

  fetchStaff();
}, []);

  useEffect(() => {
  dispatch(fetchAllExpenses({ from, to, staffId }));
}, [dispatch, from, to, staffId]);

  const handleEdit = (x) => {
    const name = prompt("Expense name", x.expenseName);
    const amount = prompt("Amount", x.amount);
    if (!name || !amount) return;

    dispatch(
      updateExpense({
        id: x._id,
        data: { expenseName: name, amount: Number(amount) },
      })
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Expenses</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <div className="flex flex-wrap gap-2 mb-4">

  <select
    value={staffId}
    onChange={(e) => setStaffId(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">All Staff</option>

    {staffs.map((s) => (
      <option key={s._id} value={s._id}>
        {s.name}
      </option>
    ))}
  </select>

  <input
    type="date"
    value={from}
    onChange={(e) => setFrom(e.target.value)}
    className="border p-2 rounded"
  />

  <input
    type="date"
    value={to}
    onChange={(e) => setTo(e.target.value)}
    className="border p-2 rounded"
  />

</div>
        <table className="min-w-full text-sm">

          <thead className="bg-indigo-100">
  <tr>
    <th className="px-4 py-3 text-left">Date</th> {/* ✅ FIRST */}
    <th className="px-4 py-3 text-left">Staff</th>
    <th className="px-4 py-3 text-left">Expense</th>
    <th className="px-4 py-3 text-right">Amount</th>
    <th className="px-4 py-3 text-center">Action</th>
  </tr>
</thead>

<tbody>
  {data.map((x) => {
    const d = new Date(x.date);
    const formattedDate = `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;

    return (
      <tr key={x._id} className="border-t hover:bg-gray-50">
        
        {/* ✅ DATE */}
        <td className="px-4 py-3 text-gray-700 font-medium">
          {formattedDate}
        </td>

        <td className="px-4 py-3">{x.staffName}</td>

        <td className="px-4 py-3">{x.expenseName}</td>

        {/* ✅ RIGHT ALIGN */}
        <td className="px-4 py-3 text-right text-red-500 font-semibold">
          ₹{x.amount}
        </td>

        <td className="px-4 py-3 text-center space-x-2">
          <button
            onClick={() => handleEdit(x)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => dispatch(deleteExpense(x._id))}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminExpensePage;