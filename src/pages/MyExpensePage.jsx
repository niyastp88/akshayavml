import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyExpenses,
  deleteExpense,
  updateExpense,
} from "../redux/slices/expenseSlice";

const MyExpensePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.expense);

  

  const today = new Date().toISOString().split("T")[0];

const [from, setFrom] = useState("");
const [to, setTo] = useState("");

 useEffect(() => {
  dispatch(fetchMyExpenses({ from, to }));
}, [dispatch, from, to]);

  const isToday = (d) =>
    new Date(d).toISOString().split("T")[0] === today;

  const handleEdit = (x) => {
    const amount = prompt("Amount", x.amount);
    if (!amount) return;

    dispatch(updateExpense({ id: x._id, data: { amount: Number(amount) } }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Expenses</h2>

      <div className="flex gap-2 mb-4">
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

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead className="bg-indigo-100">
  <tr>
    <th className="p-3 text-left">Date</th> {/* ✅ FIRST */}
    <th className="p-3 text-left">Expense</th>
    <th className="p-3 text-right">Amount</th>
    <th className="p-3 text-center">Action</th>
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
        <td className="p-3 text-gray-700 font-medium">
          {formattedDate}
        </td>

        <td className="p-3">{x.expenseName}</td>

        {/* ✅ RIGHT ALIGN */}
        <td className="p-3 text-right text-red-500 font-semibold">
          ₹{x.amount}
        </td>

        <td className="p-3 text-center space-x-2">
          {isToday(x.date) && (
            <>
              <button
                onClick={() => handleEdit(x)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteExpense(x._id))}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default MyExpensePage;