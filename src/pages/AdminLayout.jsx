import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearDashboard } from "../redux/slices/dashboardSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearDashboard());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* 🔥 NAVBAR */}
      <div className="backdrop-blur-md bg-white/70 shadow-lg px-4 py-4 rounded-b-2xl">

        {/* TOP */}
        <div className="flex justify-between items-center flex-wrap gap-2">

          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow hover:scale-105 transition"
          >
            Logout
          </button>

        </div>

        {/* MENU */}
        <div className="flex flex-wrap gap-3 mt-4 text-sm">

          <NavBtn to="/admin" color="from-green-400 to-green-600">
            Dashboard
          </NavBtn>

          <NavBtn to="/admin/report" color="from-indigo-500 to-indigo-700">
            Report
          </NavBtn>

          <NavBtn to="/admin/profit" color="from-orange-400 to-orange-600">
            Profit & Expense
          </NavBtn>

          <NavBtn to="/admin/staff-report" color="from-purple-500 to-purple-700">
            Staff Report
          </NavBtn>

          <NavBtn to="/admin/create-staff" color="from-green-500 to-emerald-700">
            Add Staff
          </NavBtn>

          <NavBtn to="/admin/balance-tx" color="from-yellow-400 to-yellow-600">
            Balance Report
          </NavBtn>

          <NavBtn to="/admin/expense" color="from-pink-500 to-rose-600">
            Expense Report
          </NavBtn>

          <NavBtn to="/admin/create-service" color="from-blue-500 to-blue-700">
            Add Service Category
          </NavBtn>

          <NavBtn to="/admin/balance" color="from-yellow-500 to-amber-700">
            Set Balance
          </NavBtn>

          <button
            onClick={() => navigate("/admin/create-expense")}
            className="btn-gradient from-green-400 to-green-600"
          >
            Add Expense Category
          </button>

          <button
            onClick={() => navigate("/admin/create-balance-type")}
            className="btn-gradient from-blue-400 to-blue-600"
          >
            Add Balance Category
          </button>

        </div>

        {/* USER */}
        <p className="text-xs text-gray-600 mt-3">
          Logged in as <span className="font-semibold">{user?.name}</span>
        </p>

      </div>

      {/* 🔥 CONTENT */}
      <div className="p-4">
        <Outlet />
      </div>

    </div>
  );
};

// 🔥 LINK BUTTON
const NavBtn = ({ to, children, color }) => (
  <Link
    to={to}
    className={`px-4 py-1.5 rounded-full text-white bg-gradient-to-r ${color} shadow-md hover:scale-105 hover:shadow-lg transition`}
  >
    {children}
  </Link>
);

// 🔥 BUTTON STYLE
const styles = `
.btn-gradient {
  padding: 6px 14px;
  border-radius: 999px;
  color: white;
  font-weight: 500;
  background: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}
.btn-gradient:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}

export default AdminLayout;