import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBalance,
  deleteBalance,
  updateBalance,
} from "../redux/slices/balanceSlice";
import API from "../api/api";

const AdminBalancePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.balance);

  const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [staffId, setStaffId] = useState("");
const [staffs, setStaffs] = useState([]);

useEffect(() => {
  API.get("/users").then(res => setStaffs(res.data));
}, []);

 useEffect(() => {
  dispatch(fetchAllBalance({ from, to, staffId }));
}, [dispatch, from, to, staffId]);

  const handleEdit = (x) => {
    const amount = prompt("Amount", x.amount);
    if (!amount) return;

    dispatch(updateBalance({ id: x._id, data: { amount: Number(amount) } }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Balance</h2>

      <div className="flex gap-2 mb-4">

  <select value={staffId} onChange={(e)=>setStaffId(e.target.value)} className="border p-2 rounded">
    <option value="">All Staff</option>
    {staffs.map(s => (
      <option key={s._id} value={s._id}>{s.name}</option>
    ))}
  </select>

  <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="border p-2 rounded" />
  <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="border p-2 rounded" />

</div>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead className="bg-indigo-100">
  <tr>
    <th className="p-3 text-left">Date</th>
    <th className="p-3 text-left">Staff</th>
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
        <td className="p-3">{x.staffName}</td>
        <td className="p-3">{x.type}</td>

        <td className="p-3 text-right text-blue-600 font-semibold">
          ₹{x.amount}
        </td>

        <td className="p-3 text-center space-x-2">
          <button onClick={()=>handleEdit(x)} className="bg-yellow-500 px-2 py-1 text-white rounded">Edit</button>
          <button onClick={()=>dispatch(deleteBalance(x._id))} className="bg-red-500 px-2 py-1 text-white rounded">Delete</button>
        </td>

      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default AdminBalancePage;