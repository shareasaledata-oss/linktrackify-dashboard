import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublisherRegister from "./pages/PublisherRegister";
import AdvertiserRegister from "./pages/AdvertiserRegister";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import PublisherDashboard from "./pages/PublisherDashboard";

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
      <Route path="/dashboard" element={<PublisherDashboard />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}