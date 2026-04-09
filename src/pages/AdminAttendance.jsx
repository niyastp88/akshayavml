import { useEffect, useState } from "react";
import API from "../api/api";

const AdminAttendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await API.get("/attendance/all");

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setData(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold text-gray-800">
        Attendance Report 🧑‍💼
      </h2>

      {/* 🔥 LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="flex gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

          <table className="min-w-full text-sm text-gray-700">

            {/* 🔥 HEADER */}
            <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Check In</th>
                <th className="px-4 py-3">Check Out</th>
                <th className="px-4 py-3">Hours</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Browser</th>
                <th className="px-4 py-3">IP</th>
              </tr>
            </thead>

            {/* 🔥 BODY */}
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              ) : (
                data.map((a, i) => (
                  <tr
                    key={a._id}
                    className={`border-t transition hover:bg-gray-100 ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{a.staffName}</td>

                    <td className="px-4 py-3">
                      {new Date(a.date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-green-600 font-semibold">
                      {new Date(a.checkIn).toLocaleTimeString()}
                    </td>

                    <td className="px-4 py-3 text-red-500 font-semibold">
                      {a.checkOut
                        ? new Date(a.checkOut).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td className="px-4 py-3 font-bold">
                      {a.totalHours || 0} h
                    </td>

                    <td className="px-4 py-3">
                      {a.deviceInfo?.device || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {a.deviceInfo?.browser || "-"}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {a.deviceInfo?.ip || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;