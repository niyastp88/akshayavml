import { useEffect, useState } from "react";
import API from "../api/api";

const OpeningBalancePage = () => {
  const [form, setForm] = useState({
    openingCash: "",
    openingSbiCurrentBank: "",
    openingSbiSavingsBank: "",
    openingEdistrict: "",
    openingPSA: "",
  });

  // 🔥 LOAD EXISTING BALANCE
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await API.get("/balance");

        if (res.data) {
          setForm({
            openingCash: res.data.openingCash || "",
            openingSbiCurrentBank: res.data.openingSbiCurrentBank || "",
            openingSbiSavingsBank: res.data.openingSbiSavingsBank || "",
            openingEdistrict: res.data.openingEdistrict || "",
            openingPSA: res.data.openingPSA || "",
          });
        }
      } catch (err) {
        console.log("Failed to load balance");
      }
    };

    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/balance", {
      ...form,
      openingCash: Number(form.openingCash),
      openingSbiCurrentBank: Number(form.openingSbiCurrentBank),
      openingSbiSavingsBank: Number(form.openingSbiSavingsBank),
      openingEdistrict: Number(form.openingEdistrict),
      openingPSA: Number(form.openingPSA),
    });

    alert("Balance Saved ✅");
  };

  const inputStyle =
    "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Opening Balance
        </h2>

        {/* CASH */}
        <div>
          <label className={labelStyle}>Cash</label>
          <input
            type="number"
            value={form.openingCash}
            onChange={(e) =>
              setForm({ ...form, openingCash: e.target.value })
            }
            className={inputStyle}
          />
        </div>

        {/* SBI CURRENT */}
        <div>
          <label className={labelStyle}>SBI Current Bank</label>
          <input
            type="number"
            value={form.openingSbiCurrentBank}
            onChange={(e) =>
              setForm({
                ...form,
                openingSbiCurrentBank: e.target.value,
              })
            }
            className={inputStyle}
          />
        </div>

        {/* SBI SAVINGS */}
        <div>
          <label className={labelStyle}>SBI Savings Bank</label>
          <input
            type="number"
            value={form.openingSbiSavingsBank}
            onChange={(e) =>
              setForm({
                ...form,
                openingSbiSavingsBank: e.target.value,
              })
            }
            className={inputStyle}
          />
        </div>

        {/* EDISTRICT */}
        <div>
          <label className={labelStyle}>Edistrict</label>
          <input
            type="number"
            value={form.openingEdistrict}
            onChange={(e) =>
              setForm({
                ...form,
                openingEdistrict: e.target.value,
              })
            }
            className={inputStyle}
          />
        </div>

        {/* PSA */}
        <div>
          <label className={labelStyle}>PSA</label>
          <input
            type="number"
            value={form.openingPSA}
            onChange={(e) =>
              setForm({ ...form, openingPSA: e.target.value })
            }
            className={inputStyle}
          />
        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Balance
        </button>
      </form>
    </div>
  );
};

export default OpeningBalancePage;