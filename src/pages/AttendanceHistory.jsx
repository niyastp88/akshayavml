import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAttendance } from "../redux/slices/attendanceSlice";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getMyAttendance());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Attendance</h2>

      <div className="space-y-2">
        {history.map((item) => (
          <div key={item._id} className="p-3 bg-white rounded shadow">
            <p>Date: {item.date}</p>
            <p>In: {new Date(item.checkIn).toLocaleTimeString()}</p>
            <p>
              Out:{" "}
              {item.checkOut
                ? new Date(item.checkOut).toLocaleTimeString()
                : "Not yet"}
            </p>
            <p>Hours: {item.totalHours || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceHistory;