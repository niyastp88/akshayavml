import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBalance,
  deleteBalance,
  updateBalance,
} from "../redux/slices/balanceSlice";

const MyBalancePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.balance);

  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState("");
const [to, setTo] = useState("");

useEffect(() => {
  dispatch(fetchMyBalance({ from, to }));
}, [dispatch, from, to]);

 
  const isToday = (d) =>
    new Date(d).toISOString().split("T")[0] === today;

  const handleEdit = (x) => {
    const amount = prompt("Enter amount", x.amount);
    if (!amount) return;

    dispatch(
      updateBalance({
        id: x._id,
        data: { amount: Number(amount) },
      })
    );
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Balance
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

        <div className="flex gap-2 mb-4">
  <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="border p-2 rounded" />
  <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="border p-2 rounded" />
</div>

        <table className="min-w-full text-sm">

          {/* HEADER */}
          <thead className="bg-indigo-100">
  <tr>
    <th className="p-3 text-left">Date</th>
    <th className="p-3 text-left">Type</th>
    <th className="p-3 text-right">Amount</th>
    <th className="p-3 text-center">Action</th>
  </tr>
</thead>

<tbody>
  {data.map((x) => {
    const d = new Date(x.date);
    const formattedDate = `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;

    return (
      <tr key={x._id} className="border-t hover:bg-gray-50">

        <td className="p-3">{formattedDate}</td>

        <td className="p-3">{x.type}</td>

        <td className="p-3 text-right text-blue-600 font-semibold">
          ₹{x.amount}
        </td>

        <td className="p-3 text-center">
          {isToday(x.date) && (
            <>
              <button onClick={()=>handleEdit(x)} className="bg-yellow-500 px-2 py-1 text-white rounded">Edit</button>
              <button onClick={()=>dispatch(deleteBalance(x._id))} className="bg-red-500 px-2 py-1 text-white rounded">Delete</button>
            </>
          )}
        </td>

      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-gray-500 mt-4">
          No balance data found
        </p>
      )}
    </div>
  );
};

export default MyBalancePage;