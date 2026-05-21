import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: "Programs", href: "/programs", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Reports", href: "/reports", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Payments", href: "/payments", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-30 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">Linktrackify</span>
        </div>
        <div className="px-3 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">General</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.label} to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">My Profile</div>
              <div className="text-xs text-gray-400">Publisher</div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}

function Topbar({ setOpen }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen((prev) => !prev)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Payments</h1>
          <p className="text-xs text-gray-400">View your payment history and manage payment information</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900">Publisher</div>
            <div className="text-xs text-gray-400">ID: pub-001</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Payments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("history");
  const [payoneerEmail, setPayoneerEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: "Next Payout", value: "$0.00", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Total Paid", value: "$0.00", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Paid Invoices", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
    { label: "Rejected", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
  ];

  const paymentTerms = [
    { title: "1. Transaction Approval", content: "All conversions and transactions generated by publishers must be reviewed and approved by the Linktrackify admin team. Only approved transactions are eligible for payment." },
    { title: "2. Advertiser Payment Confirmation", content: "After transactions are approved, advertisers must first pay Linktrackify for those transactions. Payments to publishers will only be processed after Linktrackify receives the corresponding payment from the advertiser." },
    { title: "3. Next Payout Allocation", content: "Once advertiser payment is received and confirmed, the transactions will be marked for the next payout cycle. Publishers will be able to see the eligible amount in the Next Payout section on their dashboard and payments page." },
    { title: "4. Payout Schedule", content: "Publisher payouts are processed between the 25th and 30th of each month. Only the amount displayed in the Next Payout section before the payout date will be included in that month's payment." },
    { title: "5. Payment Method", content: "All publisher payments are made via Payoneer to the Payoneer email address provided in the publisher's account settings. Publishers must ensure that their Payoneer email address is correct and active." },
    { title: "6. Incorrect Payment Details", content: "Linktrackify is not responsible for payments sent to incorrect Payoneer email addresses. Publishers are solely responsible for providing accurate payment information." },
    { title: "7. Minimum Payout Threshold", content: "The minimum payout threshold is $50.00. If your balance is below this amount at the time of the payout cycle, it will be carried over to the next cycle." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Topbar setOpen={setSidebarOpen} />
        <main className="flex-1 p-6">

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab("history")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "history" ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}>
              Payment History
            </button>
            <button onClick={() => setActiveTab("information")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "information" ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}>
              Payment Information
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5 flex items-center gap-4`}>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment History Tab */}
          {activeTab === "history" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Payment History</h3>
              </div>
              <div className="py-16 text-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-sm text-gray-400 font-medium">No payment history found</p>
                <p className="text-xs text-gray-300 mt-1">Your payment history will appear here once payments are processed</p>
              </div>
            </div>
          )}

          {/* Payment Information Tab */}
          {activeTab === "information" && (
            <div className="space-y-6">
              {/* Payoneer Account */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#f97316" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Payoneer Account</h3>
                    <p className="text-xs text-gray-400">Payments are sent to your Payoneer email each payout cycle</p>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payoneer Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={payoneerEmail}
                    onChange={(e) => setPayoneerEmail(e.target.value)}
                    placeholder="Enter your Payoneer email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">This email will be used to send your payments via Payoneer</p>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-200">
                    Save Payment Info
                  </button>
                  {saved && (
                    <span className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Saved successfully!
                    </span>
                  )}
                </div>
              </div>

              {/* Payment Terms */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-6">Linktrackify Publisher Payment Terms</h3>
                <div className="space-y-5">
                  {paymentTerms.map((term) => (
                    <div key={term.title} className="pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                      <h4 className="text-sm font-bold text-gray-800 mb-1.5">{term.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{term.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}