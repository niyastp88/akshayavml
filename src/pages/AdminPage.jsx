import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../redux/slices/reportSlice";

const AdminPage = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.report
  );

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  useEffect(() => {
    dispatch(fetchReport({ from, to }));
  }, [dispatch, from, to]);

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">

        <h2 className="text-xl font-bold text-gray-700">
          Report
        </h2>

        <div className="flex gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-2 py-1 rounded"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

      </div>

      {/* States */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && data?.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

          <table className="w-full text-sm">

            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Service</th>
                <th className="p-3">In</th>
                <th className="p-3">Out</th>
                <th className="p-3">Cash</th>
                <th className="p-3">SBI Current</th>
                <th className="p-3">SBI Savings</th>
                <th className="p-3">Edistrict</th>
                <th className="p-3">PSA</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">

                  <td className="p-3">{row.date}</td>
                  <td className="p-3 font-medium">{row.serviceName}</td>
                  <td className="p-3 text-green-600">{row.in}</td>
                  <td className="p-3 text-red-500">{row.out || 0}</td>
                  <td className="p-3">{row.cashBalance}</td>
                  <td className="p-3">{row.sbiCurrent}</td>
                  <td className="p-3">{row.sbiSavings}</td>
                  <td className="p-3">{row.edistrict}</td>
                  <td className="p-3">{row.psa}</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {!loading && data?.length === 0 && (
        <p className="text-gray-500">No data found</p>
      )}

    </div>
  );
};

export default AdminPage;