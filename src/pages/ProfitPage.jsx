import { useEffect, useState } from "react";
import API from "../api/api";

const ProfitPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [type, setType] = useState("today");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      let url = `/profit?type=${type}`;

      if (type === "custom") {
        url = `/profit?from=${from}&to=${to}`;
      }

      const res = await API.get(url);
      setData(res.data);
    } catch {
      alert("Failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, from, to]);

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Profit & Expense</h2>

      {/* 🔥 FILTER */}
      <div className="flex flex-wrap gap-2">

        <button onClick={() => setType("today")} className="bg-blue-500 text-white px-3 py-1 rounded">
          Today
        </button>

        <button onClick={() => setType("month")} className="bg-green-500 text-white px-3 py-1 rounded">
          Monthly
        </button>

        <button onClick={() => setType("custom")} className="bg-purple-500 text-white px-3 py-1 rounded">
          Date Wise
        </button>

        {type === "custom" && (
          <>
            <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="border p-2 rounded"/>
            <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="border p-2 rounded"/>
          </>
        )}

      </div>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card title="Profit" value={data?.profit} color="bg-green-500" />
        <Card title="Expense" value={data?.expense} color="bg-red-500" />
        <Card title="Net" value={data?.net} color="bg-indigo-600" />

      </div>

    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow`}>
    <p>{title}</p>
    <h2 className="text-2xl font-bold mt-2">₹{value || 0}</h2>
  </div>
);

export default ProfitPage;