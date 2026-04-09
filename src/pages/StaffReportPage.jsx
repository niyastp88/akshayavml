import { useEffect, useState } from "react";
import API from "../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StaffReportPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [staffId, setStaffId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  useEffect(() => {
    API.get("/users").then((res) => {
      setStaffs(res.data);
      setStaffLoading(false);
    });
  }, []);

  const fetchData = async () => {
    if (!staffId) return alert("Select staff");

    setLoading(true);
    try {
      const res = await API.get(
        `/transactions/staff-report?staffId=${staffId}&from=${from}&to=${to}`
      );
      setData(res.data);
    } catch {
      alert("Error");
    }
    setLoading(false);
  };

  // 🔥 TOTALS
  const totals = data.reduce(
    (acc, t) => {
      acc.cash += t.cashAmount || 0;
      acc.bank += t.bankAmount || 0;
      acc.splitCash += t.splitCash || 0;
      acc.gpay += t.gpayAmount || 0;
      acc.profit += t.profit || 0;
      return acc;
    },
    { cash: 0, bank: 0, splitCash: 0, gpay: 0, profit: 0 }
  );

  // 🔥 WORKING DAYS
  const getWorkingDays = () => {
    const start = new Date(from);
    const end = new Date(to);
    let count = 0;

    while (start <= end) {
      if (start.getDay() !== 0) count++;
      start.setDate(start.getDate() + 1);
    }

    return count || 1;
  };

  const workingDays = getWorkingDays();
  const target = workingDays * 500;

  // 🔥 COLOR
  const getColor = () => {
    if (totals.profit < target * 0.5) return "text-red-600";
    if (totals.profit < target) return "text-yellow-600";
    return "text-green-600";
  };

  const getBadge = () => {
    if (totals.profit < target * 0.5)
      return <span className="bg-red-100 text-red-600 px-2 py-1 rounded animate-pulse">LOW</span>;

    if (totals.profit < target)
      return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">MED</span>;

    return <span className="bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">GOOD</span>;
  };

  // 🔥 EXPORT EXCEL
  const exportExcel = () => {
    const sheet = [
      ...data,
      { serviceName: "TOTAL", ...totals },
    ];

    const ws = XLSX.utils.json_to_sheet(sheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "report.xlsx");
  };

  // 🔥 EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Service", "Cash", "Bank", "Split", "GPay", "Profit"]],
      body: [
        ...data.map((t) => [
          t.serviceName,
          t.cashAmount,
          t.bankAmount,
          t.splitCash,
          t.gpayAmount,
          t.profit,
        ]),
        ["TOTAL", totals.cash, totals.bank, totals.splitCash, totals.gpay, totals.profit],
      ],
    });

    doc.save("report.pdf");
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Staff Report 📊</h2>

      {/* STAFF LOAD */}
      {staffLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-2 flex-wrap bg-white p-4 rounded shadow">

          <select value={staffId} onChange={(e)=>setStaffId(e.target.value)} className="border p-2">
            <option value="">Select Staff</option>
            {staffs.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} />

          <button onClick={fetchData} className="bg-indigo-600 text-white px-3 py-2 rounded">
            Load
          </button>

          {data.length > 0 && (
            <>
              <button onClick={exportExcel} className="bg-green-600 text-white px-2 py-1 rounded">Excel</button>
              <button onClick={exportPDF} className="bg-red-600 text-white px-2 py-1 rounded">PDF</button>
            </>
          )}
        </div>
      )}

      {/* DATA */}
      {loading ? (
        <Loader />
      ) : data.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Service</th>
                <th className="p-3">Time</th>
                <th className="p-3">Payment</th>
                <th className="p-3 text-right">Cash</th>
                <th className="p-3 text-right">Bank</th>
                <th className="p-3 text-right">Received Cash</th>
                <th className="p-3 text-right">Received GPay</th>
                <th className="p-3 text-right">Profit</th>
              </tr>
            </thead>

            <tbody>
              {data.map((t, i) => (
                <tr key={t._id} className={i % 2 ? "bg-gray-50" : ""}>

                  <td className="p-3">{t.serviceName}</td>
                  <td className="p-3 text-center">{new Date(t.date).toLocaleTimeString()}</td>
                  <td className="p-3 text-center">{t.paymentType}</td>

                  <td className="p-3 text-right">₹{t.cashAmount}</td>
                  <td className="p-3 text-right">₹{t.bankAmount}</td>
                  <td className="p-3 text-right">₹{t.splitCash}</td>
                  <td className="p-3 text-right">₹{t.gpayAmount}</td>

                  <td className="p-3 text-right">₹{t.profit}</td>

                </tr>
              ))}
            </tbody>

            {/* TOTAL */}
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td colSpan="3" className="p-3 text-right">TOTAL</td>

                <td className="p-3 text-right">₹{totals.cash}</td>
                <td className="p-3 text-right">₹{totals.bank}</td>
                <td className="p-3 text-right">₹{totals.splitCash}</td>
                <td className="p-3 text-right">₹{totals.gpay}</td>

                <td className={`p-3 text-right ${getColor()}`}>
                  ₹{totals.profit}
                </td>
              </tr>
            </tfoot>

          </table>

          {/* STATUS */}
          <div className="p-4 flex justify-between items-center">

            <div>
              Target: ₹{target} ({workingDays} days)
            </div>

            <div className="flex items-center gap-2">
              {getBadge()}
              <span className={getColor()}>
                ₹{totals.profit}
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

const Loader = () => (
  <div className="flex justify-center py-10">
    <div className="flex gap-2">
      <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
      <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></span>
      <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></span>
    </div>
  </div>
);

export default StaffReportPage;