import { useEffect, useState } from "react";
import API from "../api/api";

const StaffReportPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [staffId, setStaffId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  // 🔥 fetch staff list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await API.get("/users");
        setStaffs(res.data);
      } catch (err) {
        console.log("Staff fetch error");
      }
    };

    fetchStaff();
  }, []);

  // 🔥 fetch report
  const fetchData = async () => {
    if (!staffId) {
      alert("Select staff");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/transactions/staff-report?staffId=${staffId}&from=${from}&to=${to}`
      );

      setData(res.data);
    } catch (err) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this transaction?");
    if (!confirm) return;

    try {
      await API.delete(`/transactions/${id}`);
      fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  // 🔥 EDIT
  const handleEdit = async (t) => {
    const newCash = prompt("Enter cash amount", t.cashAmount);
    const newBank = prompt("Enter bank amount", t.bankAmount);

    if (newCash === null || newBank === null) return;

    try {
      await API.put(`/transactions/${t._id}`, {
        cashAmount: Number(newCash),
        bankAmount: Number(newBank),
      });

      fetchData();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="p-4">

      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Staff Report
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 bg-white p-4 rounded shadow">

        <select
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Select Staff</option>

          {staffs.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

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

        <button
          onClick={fetchData}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Load Report
        </button>

      </div>

      {/* Loading */}
      {loading && <p className="text-blue-600">Loading...</p>}

      {/* No Data */}
      {!loading && data.length === 0 && (
        <p className="text-gray-500">No data found</p>
      )}

      {/* Table */}
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded">

          <table className="w-full text-sm border-collapse">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Cash</th>
                <th className="p-3 border">Bank</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border font-medium">
                    {t.serviceName}
                  </td>

                  <td className="p-3 border text-green-600 font-semibold">
                    ₹{t.cashAmount}
                  </td>

                  <td className="p-3 border text-blue-600 font-semibold">
                    ₹{t.bankAmount || 0}
                  </td>

                  <td className="p-3 border text-center space-x-2">

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

export default StaffReportPage;