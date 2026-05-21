import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://linktrackify.com/reset-password",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Password Recovery</h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            Enter your email and we'll send you a secure link to reset your password instantly.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: "🔒", text: "Secure reset link" },
              { icon: "⚡", text: "Delivered instantly" },
              { icon: "✅", text: "Easy to use process" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-blue-100">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-105">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-xl tracking-tight">Linktrackify</span>
        </Link>

        <div className="w-full max-w-md">

          {!sent ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  No problem. Enter your email address below and we'll send you a password reset link.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending reset link...
                    </span>
                  ) : (
                    "Send password reset link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                We've sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>. Check your inbox and follow the instructions.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left mb-8">
                <p className="text-xs text-blue-700 font-medium mb-1">Didn't receive the email?</p>
                <p className="text-xs text-blue-600">Check your spam folder or try again with a different email address.</p>
              </div>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>

        <p className="mt-10 text-xs text-gray-400">© 2026 Linktrackify. All rights reserved.</p>
      </div>
    </div>
  );
}