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
      role === "admin" ? navigate("/admin") : navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input placeholder="Username" className="w-full border p-2"
          onChange={(e) => setForm({ ...form, username: e.target.value })} />

        <input type="password" placeholder="Password" className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="w-full bg-blue-600 text-white p-2">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;