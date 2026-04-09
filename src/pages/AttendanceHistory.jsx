import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAttendance } from "../redux/slices/attendanceSlice";

const AttendanceHistory = () => {
  const dispatch = useDispatch();

  const { history, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getMyAttendance());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold text-gray-800">
        My Attendance 📅
      </h2>

      {/* 🔥 LOADING */}
      {loading ? (
        <div className="space-y-6">

          {/* bouncing animation */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>

          {/* skeleton cards */}
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        </div>
      ) : history?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No Attendance Data 😴
        </div>
      ) : (
        <div className="grid gap-4">

          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-4 transition hover:shadow-lg hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">
                  {new Date(item.date).toLocaleDateString()}
                </p>

                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {item.totalHours || 0} hrs
                </span>
              </div>

              <div className="flex justify-between text-sm mt-2">

                <div className="text-green-600 font-medium">
                  ⏰ In:{" "}
                  {new Date(item.checkIn).toLocaleTimeString()}
                </div>

                <div className="text-red-500 font-medium">
                  ⏰ Out:{" "}
                  {item.checkOut
                    ? new Date(item.checkOut).toLocaleTimeString()
                    : "Not yet"}
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};


// 🔥 SKELETON CARD
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-xl shadow animate-pulse">
    <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
    <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 w-32 bg-gray-300 rounded"></div>
  </div>
);

export default AttendanceHistory;