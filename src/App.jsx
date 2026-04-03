import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateStaffPage from "./pages/Staff";
import CreateServicePage from "./pages/Service";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <ProtectedRoute role="staff">
            <FormPage />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        } />
        

<Route
  path="/create-staff"
  element={
    <ProtectedRoute role="admin">
      <CreateStaffPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/create-service"
  element={
    <ProtectedRoute role="admin">
      <CreateServicePage />
    </ProtectedRoute>
  }
/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;