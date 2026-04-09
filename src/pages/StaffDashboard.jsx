import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffDashboard } from "../redux/slices/dashboardSlice";
import AttendanceButton from "../components/AttendanceButton";

const StaffDashboard = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStaffDashboard());
  }, [dispatch, user]);

  const todayCash = data?.today?.cash || 0;
  const todayGpay = data?.today?.gpay || 0;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6">

      {/* 🔥 WELCOME */}
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome {user?.name || "User"} 👋
      </h2>

      <AttendanceButton />

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <Card title="Today Cash" value={todayCash} color="bg-green-500" />
            <Card title="Today GPay" value={todayGpay} color="bg-blue-500" />

            <Card title="SBI Current" value={data?.balances?.sbiCurrent} color="bg-indigo-500" />
            <Card title="SBI Savings" value={data?.balances?.sbiSavings} color="bg-pink-500" />
            <Card title="Edistrict" value={data?.balances?.edistrict} color="bg-orange-500" />
            <Card title="PSA" value={data?.balances?.psa} color="bg-teal-500" />

          </div>

          {/* 🔥 IMPORTANT MESSAGE */}
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl shadow text-sm font-medium animate-fade-in">
            ഇന്ന് അക്ഷയയിൽ Cash = ₹{todayCash} , GPay = ₹{todayGpay} ഉണ്ടായിരിക്കേണ്ടതാണ്.
            ഇല്ലെങ്കിൽ <span className="font-bold">My Transactions</span> ൽ പോയി edit ചെയ്യുക.
          </div>
        </>
      )}

    </div>
  );
};


// 🔥 CARD
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg`}>
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-xl font-bold mt-1">
      ₹{value || 0}
    </h3>
  </div>
);


// 🔥 SKELETON CARD (better than shimmer)
const SkeletonCard = () => (
  <div className="p-4 rounded-xl bg-white shadow">
    <div className="h-4 w-24 bg-gray-300 rounded mb-3 animate-pulse"></div>
    <div className="h-6 w-32 bg-gray-400 rounded animate-pulse"></div>
  </div>
);

export default StaffDashboard;