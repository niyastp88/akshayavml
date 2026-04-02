import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const FormPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [bankAmount, setBankAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data);
      } catch (err) {
        setError("Failed to load services");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const service = services.find((s) => s._id === e.target.value);
    setSelectedService(service);
    setBankAmount("");
    setCashAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService) return;

    const bank = Number(bankAmount) || 0;
    const cash = Number(cashAmount) || 0;
    const total = bank + cash;

    const confirm = window.confirm(
      `Total received amount is ${total}. Do you want to continue?`
    );

    if (!confirm) return;

    try {
      setLoading(true);
      setError("");

      await API.post("/transactions", {
        serviceName: selectedService.name,
        bankAmount: bank,
        cashAmount: cash,
      });

      // reset
      setSelectedService(null);
      setBankAmount("");
      setCashAmount("");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-4">

      {/* Main Container */}
      <div className="w-full max-w-lg">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
            Akshaya Service
          </h1>

          <Link
            to="/admin"
            className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition"
          >
            Admin
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8">

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add Transaction
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          {fetchLoading ? (
            <p className="text-center text-gray-500">
              Loading services...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Service Select */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Service
                </label>
                <select
                  value={selectedService?._id || ""}
                  onChange={handleServiceChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bank */}
              {selectedService?.hasBank && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bank Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter bank amount"
                    value={bankAmount}
                    onChange={(e) => setBankAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition"
                  />
                </div>
              )}

              {/* Cash */}
              {selectedService?.hasCash && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Cash Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter cash amount"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-yellow-500 outline-none transition"
                  />
                </div>
              )}

              {/* Submit */}
              <button
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow hover:bg-indigo-700 transition duration-200"
              >
                {loading ? "Submitting..." : "Submit Transaction"}
              </button>

            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Simple Accounting System
        </p>

      </div>
    </div>
  );
};

export default FormPage;