import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 Navbar */}
      <div className="bg-white shadow px-4 py-3 flex flex-wrap items-center justify-between">

        <h1 className="font-bold text-lg text-indigo-600">
          Admin Panel
        </h1>

        <div className="flex flex-wrap gap-2 text-sm">

          <Link to="/admin" className="px-3 py-1 bg-green-600 text-white rounded">
            Dashboard
          </Link>

          <Link to="/admin/report" className="px-3 py-1 bg-indigo-600 hover:bg-indigo-800 text-white rounded transition duration-300">
            Report
          </Link>
          <Link to="/admin/staff-report" className="bg-purple-600 text-white px-3 py-1 rounded">
  Staff Report
</Link>

          <Link to="/admin/create-staff" className="px-3 py-1 bg-green-600 text-white rounded">
            Add Staff
          </Link>
          <Link to="/admin/balance-tx" className="px-3 py-1 bg-yellow-600 text-white rounded">
            Balance Report
          </Link>
          <Link to="/admin/expense" className="px-3 py-1 bg-indigo-600 hover:bg-indigo-800 text-white rounded transition duration-300">
            Expense Report
          </Link>

          <Link to="/admin/create-service" className="px-3 py-1 bg-blue-600 text-white rounded">
            Add Service
          </Link>

          <Link to="/admin/balance" className="px-3 py-1 bg-yellow-600 text-white rounded">
            Set Balance
          </Link>

          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => navigate("/admin/create-expense")}>
  Expense Types
</button>

<button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate("/admin/create-balance-type")}>
  Balance Types
</button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>

        </div>

        <p className="text-xs text-gray-500 mt-1 w-full">
          Logged in as {user?.name}
        </p>

      </div>

      {/* 🔥 Page Content */}
      <div className="p-4">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;