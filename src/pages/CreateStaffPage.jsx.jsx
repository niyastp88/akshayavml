import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStaff, resetStatus } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const CreateStaffPage = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createStaff(form));
  };

  useEffect(() => {
    if (success) {
      alert("Staff created successfully");
      setForm({ username: "", name: "", password: "" });
      dispatch(resetStatus());
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Create Staff
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Creating..." : "Create Staff"}
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

export default CreateStaffPage;