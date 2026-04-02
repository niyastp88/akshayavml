import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/reports?date=${date}`);
      setData(res.data.data);
    } catch (err) {
      setError("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [date]);

  // 🔥 Excel Export (CSV)
  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = [
      "Service",
      "Cash In",
      "Out",
      "Cash Balance",
      "Debit",
      "Credit",
      "Bank Balance",
    ];

    const rows = data.map((row) => [
      row.serviceName,
      row.cashIn,
      "",
      row.cashBalance,
      row.bankDebit,
      "",
      row.bankBalance,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Report
        </h2>

        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Export Excel
          </button>

          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back
          </Link>
        </div>
      </div>

      {/* 📅 Date Filter */}
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        />
      </div>

      {/* 🔄 States */}
      {loading && (
        <p className="text-blue-600 font-medium">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      {!loading && data.length === 0 && (
        <p className="text-gray-500">No data found</p>
      )}

      {/* 📊 Table */}
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left border-collapse">

            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-bold">Service</th>
                <th className="px-4 py-3 font-bold">Cash In</th>
                <th className="px-4 py-3 font-bold">Out</th>
                <th className="px-4 py-3 font-bold">Cash Balance</th>
                <th className="px-4 py-3 font-bold">Debit</th>
                <th className="px-4 py-3 font-bold">Credit</th>
                <th className="px-4 py-3 font-bold">Bank Balance</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {row.serviceName}
                  </td>

                  <td className="px-4 py-3 text-green-600 font-semibold">
                    {row.cashIn}
                  </td>

                  <td className="px-4 py-3 text-gray-400">-</td>

                  <td className="px-4 py-3 font-semibold">
                    {row.cashBalance}
                  </td>

                  <td className="px-4 py-3 text-red-600 font-semibold">
                    {row.bankDebit}
                  </td>

                  <td className="px-4 py-3 text-gray-400">-</td>

                  <td className="px-4 py-3 font-semibold">
                    {row.bankBalance}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;