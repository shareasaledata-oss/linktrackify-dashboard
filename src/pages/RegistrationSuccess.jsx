import { Link } from "react-router-dom";

export default function RegistrationSuccess() {
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-10 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Thank you for registering with Linktrackify. Your application is under review and you'll receive an email confirmation within 1-2 business days.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left">
          <p className="text-xs text-blue-700 font-medium mb-1">What happens next?</p>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• We'll review your application</li>
            <li>• You'll receive an approval email</li>
            <li>• Log in and start exploring programs</li>
          </ul>
        </div>
        <Link to="/login"
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
          Go to Login
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      <p className="mt-8 text-xs text-gray-400">© 2026 Linktrackify. All rights reserved.</p>
    </div>
  );
}