import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchMyBalance());
  }, [dispatch]);

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

        <table className="min-w-full text-sm">

          {/* HEADER */}
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((x) => (
              <tr
                key={x._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {x.type}
                </td>

                <td className="px-4 py-3 text-right text-blue-600 font-semibold">
                  ₹{x.amount}
                </td>

                <td className="px-4 py-3 text-center space-x-2">

                  {/* 🔥 ONLY TODAY EDIT/DELETE */}
                  {isToday(x.date) && (
                    <>
                      <button
                        onClick={() => handleEdit(x)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          dispatch(deleteBalance(x._id))
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}

                </td>

              </tr>
            ))}
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