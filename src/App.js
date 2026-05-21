import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublisherRegister from "./pages/PublisherRegister";
import AdvertiserRegister from "./pages/AdvertiserRegister";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import PublisherDashboard from "./pages/PublisherDashboard";
import Programs from "./pages/Programs";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/publisher/register" element={<PublisherRegister />} />
      <Route path="/advertiser/register" element={<AdvertiserRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />

      {/* Dashboard Pages */}
      <Route path="/dashboard" element={<ProtectedRoute><PublisherDashboard /></ProtectedRoute>} />
<Route path="/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
<Route path="/reports" element={<ProtectedRoute><PublisherDashboard /></ProtectedRoute>} />
<Route path="/payments" element={<ProtectedRoute><PublisherDashboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><PublisherDashboard /></ProtectedRoute>} />
<Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}