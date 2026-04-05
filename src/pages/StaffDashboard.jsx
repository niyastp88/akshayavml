import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffDashboard } from "../redux/slices/dashboardSlice";

const StaffDashboard = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStaffDashboard());
  }, [dispatch, user]);

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6">

      {/* 🔥 WELCOME */}
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome {user?.name || "User"} 👋
      </h2>

      {/* 🔥 SHIMMER */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <Card title="Today Cash" value={data?.today?.cash} color="bg-green-500" />
          <Card title="Today GPay" value={data?.today?.gpay} color="bg-blue-500" />

          <Card title="SBI Current" value={data?.balances?.sbiCurrent} color="bg-indigo-500" />
          <Card title="SBI Savings" value={data?.balances?.sbiSavings} color="bg-pink-500" />
          <Card title="Edistrict" value={data?.balances?.edistrict} color="bg-orange-500" />
          <Card title="PSA" value={data?.balances?.psa} color="bg-teal-500" />

        </div>
      )}

    </div>
  );
};

// 🔥 REAL CARD
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded-xl shadow hover:scale-105 transition`}>
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-xl font-bold mt-1">
      ₹{value || 0}
    </h3>
  </div>
);

// 🔥 SHIMMER CARD
const ShimmerCard = () => (
  <div className="p-4 rounded-xl bg-white shadow animate-pulse">
    <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
    <div className="h-6 w-32 bg-gray-400 rounded"></div>
  </div>
);

export default StaffDashboard;