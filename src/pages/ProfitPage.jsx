import { useEffect, useState } from "react";
import API from "../api/api";

const ProfitPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [type, setType] = useState("today");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      let url = `/profit?type=${type}`;

      if (type === "custom") {
        url = `/profit?from=${from}&to=${to}`;
      }

      const res = await API.get(url);
      setData(res.data);
    } catch {
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, from, to]);

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold text-gray-800">
        Profit & Expense 📊
      </h2>

      {/* 🔥 FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 items-center">

        <FilterBtn active={type === "today"} onClick={() => setType("today")}>
          Today
        </FilterBtn>

        <FilterBtn active={type === "month"} onClick={() => setType("month")}>
          Monthly
        </FilterBtn>

        <FilterBtn active={type === "custom"} onClick={() => setType("custom")}>
          Date Wise
        </FilterBtn>

        {type === "custom" && (
          <div className="flex gap-2 ml-2">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        )}
      </div>

      {/* 🔥 LOADING ANIMATION */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="flex gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      ) : (
        /* 🔥 CARDS */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card title="Profit" value={data?.profit} color="bg-green-500" />
          <Card title="Expense" value={data?.expense} color="bg-red-500" />
          <Card title="Net" value={data?.net} color="bg-indigo-600" />

        </div>
      )}
    </div>
  );
};


// 🔥 FILTER BUTTON
const FilterBtn = ({ children, active, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-sm
      ${
        active
          ? "bg-black text-white scale-105"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
  >
    {children}
  </button>
);


// 🔥 CARD
const Card = ({ title, value, color }) => (
  <div
    className={`${color} text-white p-6 rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-lg`}
  >
    <p className="text-sm opacity-90">{title}</p>
    <h2 className="text-2xl font-bold mt-2">
      ₹{value || 0}
    </h2>
  </div>
);

export default ProfitPage;