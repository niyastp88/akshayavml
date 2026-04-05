import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyTransactions,
  deleteTransaction,
  updateTransaction,
} from "../redux/slices/transactionSlice";

const MyTransactionsPage = () => {
  const dispatch = useDispatch();

  const { myTransactions, loading } = useSelector(
    (state) => state.transactions
  );

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  useEffect(() => {
    dispatch(fetchMyTransactions({ from, to }));
  }, [dispatch, from, to]);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this transaction?");
    if (!confirm) return;

    await dispatch(deleteTransaction(id));
    dispatch(fetchMyTransactions({ from, to }));
  };

  // 🔥 EDIT
  const handleEdit = async (t) => {
    const newCash = prompt("Enter cash amount", t.cashAmount);
    const newBank = prompt("Enter bank amount", t.bankAmount);
    const newSplitCash = prompt("Enter split cash", t.splitCash || 0);
    const newGpay = prompt("Enter GPay amount", t.gpayAmount || 0);
    const newType = prompt(
      "Enter payment type (cash / gpay / both)",
      t.paymentType || "cash"
    );

    if (
      newCash === null ||
      newBank === null ||
      newSplitCash === null ||
      newGpay === null ||
      newType === null
    )
      return;

    await dispatch(
      updateTransaction({
        id: t._id,
        data: {
          cashAmount: Number(newCash),
          bankAmount: Number(newBank),
          splitCash: Number(newSplitCash),
          gpayAmount: Number(newGpay),
          paymentType: newType,
        },
      })
    );

    dispatch(fetchMyTransactions({ from, to }));
  };

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-gray-800">
          My Transactions
        </h2>

        <div className="flex gap-2">
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
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-blue-600">Loading...</p>
      ) : myTransactions?.length > 0 ? (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-sm border-collapse">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Time</th> {/* 🔥 NEW */}
                <th className="p-3 border">Payment</th>
                <th className="p-3 border text-right">Cash</th>
                <th className="p-3 border text-right">Bank</th>
                <th className="p-3 border text-right">Received Cash</th>
                <th className="p-3 border text-right">GPay</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {myTransactions.map((t) => {
                const d = new Date(t.date);

                const txDate = d.toISOString().split("T")[0];

                const isToday = txDate === today;

                const time = d.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border font-medium">
                      {t.serviceName}
                    </td>

                    {/* 🔥 TIME */}
                    <td className="p-3 border text-gray-600 font-medium">
                      {time}
                    </td>

                    <td className="p-3 border text-purple-600 font-semibold capitalize">
                      {t.paymentType || "-"}
                    </td>

                    <td className="p-3 border text-green-600 font-semibold text-right">
                      ₹{t.cashAmount}
                    </td>

                    <td className="p-3 border text-blue-600 font-semibold text-right">
                      ₹{t.bankAmount || 0}
                    </td>

                    <td className="p-3 border text-orange-500 font-semibold text-right">
                      ₹{t.splitCash || 0}
                    </td>

                    <td className="p-3 border text-indigo-600 font-semibold text-right">
                      ₹{t.gpayAmount || 0}
                    </td>

                    <td className="p-3 border text-center space-x-2">

                      {isToday ? (
                        <>
                          <button
                            onClick={() => handleEdit(t)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(t._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Locked
                        </span>
                      )}

                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

      ) : (
        <p className="text-gray-500">No data</p>
      )}
    </div>
  );
};

export default MyTransactionsPage;