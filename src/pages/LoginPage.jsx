import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.user.role;
      role === "admin" ? navigate("/admin/report") : navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-blue-200 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            Akshaya Login
          </h1>
          
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              } required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              } required
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        

      </div>
    </div>
  );
};

export default LoginPage;