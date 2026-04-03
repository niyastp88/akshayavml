import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const StaffLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-4 py-3 flex justify-between items-center">

        <h1 className="font-bold text-indigo-600">
          Staff Panel
        </h1>

        <div className="flex gap-2 text-sm">

          <Link
            to="/staff/add"
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Add Transaction
          </Link>

          <Link
            to="/staff/my-transactions"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            My Transactions
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Page */}
      <div className="p-4">
        <Outlet />
      </div>

    </div>
  );
};

export default StaffLayout;