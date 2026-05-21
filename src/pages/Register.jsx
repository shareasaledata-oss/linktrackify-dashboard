import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-10 group">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-105">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <span className="font-bold text-gray-900 text-xl tracking-tight">Linktrackify</span>
      </Link>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Let's get started!</h1>
          <p className="text-sm text-gray-500">Select the account type that best fits your role.</p>
        </div>

        {/* Publisher Option */}
        <Link to="/publisher/register"
          className="group flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2563eb" className="group-hover:stroke-white transition-all duration-200" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base">Publisher</div>
              <div className="text-sm text-gray-500">I have a website and want to promote brands.</div>
            </div>
          </div>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" className="group-hover:stroke-blue-600 transition-all duration-200 group-hover:translate-x-1" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Advertiser Option */}
        <Link to="/advertiser/register"
          className="group flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2563eb" className="group-hover:stroke-white transition-all duration-200" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base">Advertiser</div>
              <div className="text-sm text-gray-500">I want to promote my brand with top publishers.</div>
            </div>
          </div>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" className="group-hover:stroke-blue-600 transition-all duration-200 group-hover:translate-x-1" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-xs text-gray-400 font-medium">Already have an account?</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Login Button */}
        <Link to="/login"
          className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-semibold py-3 rounded-xl transition-all duration-200 text-sm">
          Log in to your account
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-400">© 2026 Linktrackify. All rights reserved.</p>
    </div>
  );
}