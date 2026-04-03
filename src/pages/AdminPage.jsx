import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../redux/slices/reportSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, totals, loading, error } = useSelector(
    (state) => state.report
  );

  const { user } = useSelector((state) => state.auth);

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  useEffect(() => {
    dispatch(fetchReport({ from, to }));
  }, [from, to]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Header */}
      <div className="flex justify-between mb-3">
        <h2 className="font-semibold">
          Admin - {user?.name}
        </h2>

        <div className="flex gap-2">

          <button
            onClick={() => navigate("/create-staff")}
            className="bg-indigo-600 text-white px-2 py-1 rounded text-sm"
          >
            + Staff
          </button>

          <button
            onClick={() => navigate("/create-service")}
            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
          >
            + Service
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Totals */}
      <div className="flex gap-3 mb-3 text-sm font-semibold">
        <div className="bg-green-100 px-3 py-1 rounded">
          Cash: {totals?.cash || 0}
        </div>

        <div className="bg-blue-100 px-3 py-1 rounded">
          GPay: {totals?.gpay || 0}
        </div>

        <div className="bg-gray-200 px-3 py-1 rounded">
          Total: {totals?.total || 0}
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex gap-2 mb-3">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-1"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-1"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && data?.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded">

          <table className="w-full border text-sm">

            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Service</th>
                <th className="border p-2">In</th>
                <th className="border p-2">Out</th>
                <th className="border p-2">Cash Balance</th>
                <th className="border p-2">Debit</th>
                <th className="border p-2">Credit</th>
                <th className="border p-2">Bank Balance</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">

                  <td className="border p-2">{row.date}</td>

                  <td className="border p-2">
                    {row.serviceName}
                  </td>

                  <td className="border p-2 text-green-600 font-semibold">
                    {row.in}
                  </td>

                  <td className="border p-2">-</td>

                  <td className="border p-2">
                    {row.cashBalance}
                  </td>

                  <td className="border p-2 text-red-600">
                    {row.debit}
                  </td>

                  <td className="border p-2">-</td>

                  <td className="border p-2">
                    {row.bankBalance}
                  </td>

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