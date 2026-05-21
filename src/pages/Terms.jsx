import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-105">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <span className="font-bold text-gray-900 text-xl tracking-tight">Linktrackify</span>
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-3xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: January 2026</p>
        <div className="text-gray-500 text-sm leading-relaxed space-y-4">
          <p>Terms and conditions content will be added here soon.</p>
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400">© 2026 Linktrackify. All rights reserved.</p>
    </div>
  );
}