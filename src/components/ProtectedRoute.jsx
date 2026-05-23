import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setStatus("unauthorized");
      return;
    }

    // Check if profile exists and is approved
    const { data: profile } = await supabase
      .from("profiles")
      .select("status, role, is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      setStatus("unauthorized");
      return;
    }

    // Admin can access everything
    if (profile.is_admin) {
      setStatus("authorized");
      return;
    }

    // Publisher must be approved
    if (profile.status !== "approved") {
      setStatus("pending");
      return;
    }

    setStatus("authorized");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Application Pending</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Your application is currently under review. You will be notified once approved by our team. This usually takes 1-2 business days.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-amber-700 font-medium mb-1">What happens next?</p>
            <ul className="text-xs text-amber-600 space-y-1">
              <li>• Our team reviews your application</li>
              <li>• You receive an approval email</li>
              <li>• You can then access your dashboard</li>
            </ul>
          </div>
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Login
          </a>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}