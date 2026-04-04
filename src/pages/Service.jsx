import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  resetServiceState,
} from "../redux/slices/serviceCreateSlice";
import { useNavigate } from "react-router-dom";

const CreateServicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.serviceCreate
  );

  const [form, setForm] = useState({
    name: "",
    hasCash: false,
    hasBank: false,
    hasEdistrict: false,
    hasPsa: false,
    hasBill: false,
    edistrictCharge: "",
    psaCharge: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Enter service name");
      return;
    }

    if (!form.hasCash && !form.hasBank) {
      alert("Select at least Cash or Bank");
      return;
    }

    dispatch(
      createService({
        ...form,
        edistrictCharge: Number(form.edistrictCharge) || 0,
        psaCharge: Number(form.psaCharge) || 0,
      })
    );
  };

  useEffect(() => {
    if (success) {
      alert("Service created successfully");

      setForm({
        name: "",
        hasCash: false,
        hasBank: false,
        hasEdistrict: false,
        hasPsa: false,
        hasBill: false,
        edistrictCharge: "",
        psaCharge: "",
      });

      dispatch(resetServiceState());
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-gray-800">
          Add Service
        </h2>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Name */}
        <input
          placeholder="Service Name"
          value={form.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        {/* CASH + BANK */}
        <div className="flex gap-4 flex-wrap">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasCash}
              onChange={(e) =>
                handleChange("hasCash", e.target.checked)
              }
            />
            Cash
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasBank}
              onChange={(e) =>
                handleChange("hasBank", e.target.checked)
              }
            />
            Bank
          </label>

        </div>

        {/* EDISTRICT */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.hasEdistrict}
            onChange={(e) =>
              handleChange("hasEdistrict", e.target.checked)
            }
          />
          <label>Edistrict</label>
        </div>

        {form.hasEdistrict && (
          <input
            type="number"
            placeholder="Edistrict Charge"
            value={form.edistrictCharge}
            onChange={(e) =>
              handleChange("edistrictCharge", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        )}

        {/* PSA */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.hasPsa}
            onChange={(e) =>
              handleChange("hasPsa", e.target.checked)
            }
          />
          <label>PSA</label>
        </div>

        {form.hasPsa && (
          <input
            type="number"
            placeholder="PSA Charge"
            value={form.psaCharge}
            onChange={(e) =>
              handleChange("psaCharge", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        )}

        {/* BILL */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.hasBill}
            onChange={(e) =>
              handleChange("hasBill", e.target.checked)
            }
          />
          <label>Has Bill (Auto Profit)</label>
        </div>

        {/* BUTTONS */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">
          {loading ? "Creating..." : "Create Service"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/report")}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateServicePage;