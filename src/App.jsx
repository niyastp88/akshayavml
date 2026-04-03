import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";

import AdminLayout from "./pages/AdminLayout";
import AdminPage from "./pages/AdminPage";
import CreateStaffPage from "./pages/Staff";
import CreateServicePage from "./pages/Service";
import BalancePage from "./pages/OpeingBalancePage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FormPage />} />

        {/* 🔥 Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="report" element={<AdminPage />} />
          <Route path="create-staff" element={<CreateStaffPage />} />
          <Route path="create-service" element={<CreateServicePage />} />
          <Route path="balance" element={<BalancePage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;