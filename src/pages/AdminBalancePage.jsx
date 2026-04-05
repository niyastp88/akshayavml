import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBalance,
  deleteBalance,
  updateBalance,
} from "../redux/slices/balanceSlice";

const AdminBalancePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.balance);

  useEffect(() => {
    dispatch(fetchAllBalance());
  }, []);

  const handleEdit = (x) => {
    const amount = prompt("Amount", x.amount);
    if (!amount) return;

    dispatch(updateBalance({ id: x._id, data: { amount: Number(amount) } }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Balance</h2>

      <table className="min-w-full text-sm bg-white shadow rounded">
        <thead className="bg-indigo-100">
          <tr>
            <th className="p-3 text-left">Staff</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((x) => (
            <tr key={x._id} className="border-t">
              <td className="p-3">{x.staffName}</td>
              <td className="p-3">{x.type}</td>
              <td className="p-3 text-right">₹{x.amount}</td>

              <td className="p-3 text-center space-x-2">
                <button onClick={() => handleEdit(x)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => dispatch(deleteBalance(x._id))} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBalancePage;