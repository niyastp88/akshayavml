import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";

import AdminLayout from "./pages/AdminLayout";
import AdminPage from "./pages/AdminPage";
import CreateStaffPage from "./pages/Staff";
import CreateServicePage from "./pages/Service";
import BalancePage from "./pages/OpeingBalancePage";
import StaffLayout from "./pages/StaffLayout";
import MyTransactionsPage from "./pages/MyTransactionsPage";
import StaffReportPage from "./pages/StaffReportPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />
        
        <Route path="/staff" element={<StaffLayout />}>

  <Route path="add" element={<FormPage />} />
  <Route path="my-transactions" element={<MyTransactionsPage />} />

</Route>

        {/* 🔥 Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="report" element={<AdminPage />} />
          <Route path="create-staff" element={<CreateStaffPage />} />
          <Route path="staff-report" element={<StaffReportPage />} />
          <Route path="create-service" element={<CreateServicePage />} />
          <Route path="balance" element={<BalancePage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;