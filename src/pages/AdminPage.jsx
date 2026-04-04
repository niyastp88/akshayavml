import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../redux/slices/reportSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminPage = () => {
  const dispatch = useDispatch();

  const { data, totals, loading, error } = useSelector(
  (state) => state.report
);

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  useEffect(() => {
    dispatch(fetchReport({ from, to }));
  }, [dispatch, from, to]);

  // 🔥 EXCEL DOWNLOAD (CSV)
  const exportExcel = () => {
    if (!data.length) return;

    const headers = [
      "Date",
      "Service",
      "In",
      "Out",
      "Cash",
      "SBI Current",
      "SBI Savings",
      "Edistrict",
      "PSA",
    ];

    const rows = data.map((r) => [
      r.date,
      r.serviceName,
      r.in,
      r.out || 0,
      r.cashBalance,
      r.sbiCurrent,
      r.sbiSavings,
      r.edistrict,
      r.psa,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "report.csv";
    link.click();
  };

  // 🔥 PDF DOWNLOAD
  const exportPDF = () => {
    if (!data.length) return;

    const doc = new jsPDF();

    doc.text("Akshaya Report", 14, 10);

    const tableData = data.map((r) => [
      r.date,
      r.serviceName,
      r.in,
      r.out || 0,
      r.cashBalance,
      r.sbiCurrent,
      r.sbiSavings,
      r.edistrict,
      r.psa,
    ]);

    autoTable(doc, {
      head: [[
        "Date",
        "Service",
        "In",
        "Out",
        "Cash",
        "SBI Current",
        "SBI Savings",
        "Edistrict",
        "PSA",
      ]],
      body: tableData,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("report.pdf");
  };

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Report
        </h2>

        <div className="flex flex-wrap gap-2">

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />

          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
          >
            PDF
          </button>

        </div>

      </div>

      {/* States */}
      {loading && (
        <p className="text-blue-500 font-medium">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      <div className="flex flex-wrap gap-3 mb-4">

  <div className="bg-green-100 px-4 py-2 rounded font-semibold">
    Cash: ₹{totals?.cash || 0}
  </div>

  <div className="bg-blue-100 px-4 py-2 rounded font-semibold">
    GPay: ₹{totals?.gpay || 0}
  </div>

  <div className="bg-yellow-100 px-4 py-2 rounded font-semibold">
    Profit: ₹{totals?.profit || 0}
  </div>

</div>

      {/* Table */}
      {!loading && data?.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border">

          <table className="min-w-full text-sm text-left">

            <thead className="bg-indigo-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Service</th>
                <th className="px-4 py-3 border text-right">In</th>
                <th className="px-4 py-3 border text-right">Out</th>
                <th className="px-4 py-3 border text-right">Cash</th>
                <th className="px-4 py-3 border text-right">SBI Current</th>
                <th className="px-4 py-3 border text-right">SBI Savings</th>
                <th className="px-4 py-3 border text-right">Edistrict</th>
                <th className="px-4 py-3 border text-right">PSA</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{row.date}</td>
                  <td className="px-4 py-3 border">{row.serviceName}</td>
                  <td className="px-4 py-3 border text-right text-green-600">
                    ₹{row.in}
                  </td>
                  <td className="px-4 py-3 border text-right text-red-500">
                    ₹{row.out || 0}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    ₹{row.cashBalance}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    ₹{row.sbiCurrent}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    ₹{row.sbiSavings}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    ₹{row.edistrict}
                  </td>
                  <td className="px-4 py-3 border text-right">
                    ₹{row.psa}
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