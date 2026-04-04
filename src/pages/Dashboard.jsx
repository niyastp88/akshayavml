import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../redux/slices/dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  // 🔥 UPDATED CHART DATA (INCLUDING PROFIT)
  const chartData = [
    {
      name: "Cash",
      amount: data?.today?.cash || 0,
    },
    {
      name: "GPay",
      amount: data?.today?.gpay || 0,
    },
    {
      name: "Profit",
      amount: data?.today?.profit || 0,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card title="Today Cash" value={data?.today?.cash} color="bg-green-500" />
        <Card title="Today GPay" value={data?.today?.gpay} color="bg-blue-500" />
        <Card title="Today Profit" value={data?.today?.profit} color="bg-yellow-500" />

        <Card title="Cash Balance" value={data?.balances?.cash} color="bg-purple-500" />
        <Card title="SBI Current Balance" value={data?.balances?.sbiCurrent} color="bg-indigo-500" />
        <Card title="SBI Savings Balance" value={data?.balances?.sbiSavings} color="bg-pink-500" />
        <Card title="Edistrict Balance" value={data?.balances?.edistrict} color="bg-orange-500" />
        <Card title="PSA Balance" value={data?.balances?.psa} color="bg-teal-500" />

      </div>

      {/* 🔥 CHART */}
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h3 className="font-semibold mb-3 text-gray-700">
          Today Collection Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

// 🔥 CARD COMPONENT (COLORFUL)
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded-xl shadow-md hover:scale-105 transition`}>
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-xl font-bold mt-1">
      ₹{value || 0}
    </h3>
  </div>
);

export default DashboardPage;