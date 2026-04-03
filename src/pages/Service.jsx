import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService, resetServiceState } from "../redux/slices/serviceCreateSlice";
import { useNavigate } from "react-router-dom";

const CreateServicePage = () => {
  const [form, setForm] = useState({
    name: "",
    hasBank: false,
    hasCash: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.serviceCreate
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.hasBank && !form.hasCash) {
      alert("Select at least one (Bank or Cash)");
      return;
    }

    dispatch(createService(form));
  };

  useEffect(() => {
    if (success) {
      alert("Service created successfully");
      setForm({ name: "", hasBank: false, hasCash: false });
      dispatch(resetServiceState());
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Add Service
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Name */}
        <input
          placeholder="Service Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        {/* Checkboxes */}
        <div className="flex gap-4">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasBank}
              onChange={(e) =>
                setForm({ ...form, hasBank: e.target.checked })
              }
            />
            Bank
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasCash}
              onChange={(e) =>
                setForm({ ...form, hasCash: e.target.checked })
              }
            />
            Cash
          </label>

        </div>

        {/* Button */}
        <button className="w-full bg-green-600 text-white p-2 rounded">
          {loading ? "Creating..." : "Create Service"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="w-full bg-gray-400 text-white p-2 rounded"
        >
          Back
        </button>

      </form>
    </div>
  );
};

export default CreateServicePage;