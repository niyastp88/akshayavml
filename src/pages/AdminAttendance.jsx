import { useEffect, useState } from "react";
import API from "../api/api"; // 🔥 use API (important)

const AdminAttendance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/attendance/all");

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Report</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Date</th>
            <th>In</th>
            <th>Out</th>
            <th>Hours</th>
            <th>Device</th>
<th>Browser</th>
<th>IP</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a._id} className="text-center border-t">
              <td>{a.staffName}</td>
              <td>{a.date}</td>
              <td>{new Date(a.checkIn).toLocaleTimeString()}</td>
              <td>
                {a.checkOut
                  ? new Date(a.checkOut).toLocaleTimeString()
                  : "-"}
              </td>
              <td>{a.totalHours || 0}</td>
              <td>{a.deviceInfo?.device}</td>
<td>{a.deviceInfo?.browser}</td>
<td>{a.deviceInfo?.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAttendance;