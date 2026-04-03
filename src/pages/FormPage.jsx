import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/slices/serviceSlice";
import { addTransaction } from "../redux/slices/transactionSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: services, loading: fetchLoading } = useSelector(
    (state) => state.services
  );

  const { loading, error } = useSelector(
    (state) => state.transactions
  );

  const { user } = useSelector((state) => state.auth);

  const [selectedService, setSelectedService] = useState(null);

  // 🔹 service inputs
  const [cashAmount, setCashAmount] = useState("");
  const [bankAmount, setBankAmount] = useState("");

  // 🔹 payment type
  const [paymentType, setPaymentType] = useState("");

  // 🔹 split inputs
  const [splitCash, setSplitCash] = useState("");
  const [splitGpay, setSplitGpay] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !paymentType) {
      alert("Select service & payment type");
      return;
    }

    const baseCash = Number(cashAmount) || 0;
    const baseBank = Number(bankAmount) || 0;

    const total = baseCash + baseBank;

    if (total === 0) {
      alert("Enter amount");
      return;
    }

    let finalCash = 0;
    let finalGpay = 0;

    if (paymentType === "cash") {
      finalCash = total;
    } else if (paymentType === "gpay") {
      finalGpay = total;
    } else {
      const c = Number(splitCash) || 0;
      const g = Number(splitGpay) || 0;

      if (c + g !== total) {
        alert("Split must equal total");
        return;
      }

      finalCash = c;
      finalGpay = g;
    }

    const confirm = window.confirm(
      `Total received amount is ${total}. Continue?`
    );

    if (!confirm) return;

   const res = await dispatch(
  addTransaction({
    serviceId: selectedService._id, // 🔥 MUST
    cashAmount: baseCash,
    bankAmount: baseBank,
    splitCash: finalCash,
    gpayAmount: finalGpay,
    paymentType,
  })
);

    if (res.meta.requestStatus === "fulfilled") {
      setSelectedService(null);
      setCashAmount("");
      setBankAmount("");
      setPaymentType("");
      setSplitCash("");
      setSplitGpay("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Welcome {user?.name}</h2>

          
        </div>

        {/* Card */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4 text-center">
            Add Transaction
          </h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {fetchLoading ? (
            <p>Loading services...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Service */}
              <select
                value={selectedService?._id || ""}
                onChange={(e) => {
                  const s = services.find(
                    (x) => x._id === e.target.value
                  );
                  setSelectedService(s);

                  setCashAmount("");
                  setBankAmount("");
                  setPaymentType("");
                  setSplitCash("");
                  setSplitGpay("");
                }}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Service</option>

                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Cash */}
              {selectedService?.hasCash && (
                <input
                  type="number"
                  placeholder="Cash Amount"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              )}

              {/* Bank */}
              {selectedService?.hasBank && (
                <input
                  type="number"
                  placeholder="Bank Amount"
                  value={bankAmount}
                  onChange={(e) => setBankAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              )}

              {/* Payment Type */}
              <div>
                <label className="font-medium">Payment Type</label>

                <div className="flex gap-4 mt-1">
                  <label>
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentType === "cash"}
                      onChange={(e) => setPaymentType(e.target.value)}
                    /> Cash
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="gpay"
                      checked={paymentType === "gpay"}
                      onChange={(e) => setPaymentType(e.target.value)}
                    /> GPay
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="both"
                      checked={paymentType === "both"}
                      onChange={(e) => setPaymentType(e.target.value)}
                    /> Cash + GPay
                  </label>
                </div>
              </div>

              {/* Split Inputs */}
              {paymentType === "both" && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Split Cash"
                    value={splitCash}
                    onChange={(e) => setSplitCash(e.target.value)}
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    placeholder="Split GPay"
                    value={splitGpay}
                    onChange={(e) => setSplitGpay(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
              )}

              {/* Submit */}
              <button className="w-full bg-indigo-600 text-white py-2 rounded">
                {loading ? "Submitting..." : "Submit"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;