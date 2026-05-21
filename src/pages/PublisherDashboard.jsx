import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Programs",
    href: "/programs",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "/reports",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Payments",
    href: "/payments",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const STATS = [
  { label: "Conversions This Month", value: "0", change: "+0%", color: "text-emerald-600", bg: "bg-emerald-50",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Total Account Balance", value: "$0.00", change: "+0%", color: "text-blue-600", bg: "bg-blue-50",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Approved Earning", value: "$0.00", change: "+0%", color: "text-violet-600", bg: "bg-violet-50",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> },
  { label: "Next Payout", value: "$0.00", change: "+0%", color: "text-amber-600", bg: "bg-amber-50",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-30 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">Linktrackify</span>
        </div>

        {/* Nav */}
        <div className="px-3 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">General</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.label} to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile at bottom */}
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
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400">Manage your affiliate performance</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Profile */}
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

export default function PublisherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Topbar setOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          {/* Warning banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-6">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-amber-700">
              Please enter your payment details in the{" "}
              <Link to="/payments" className="font-semibold underline">Payments tab</Link>{" "}
              for future payouts.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className={`text-xs font-semibold ${stat.color}`}>{stat.change} this month</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Earnings Overview */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-gray-900">Earnings Overview</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">$0.00</p>
                </div>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>
              {/* Empty chart placeholder */}
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-xl">
                <div className="text-center">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-sm text-gray-400">No earnings data yet</p>
                </div>
              </div>
            </div>

            {/* Total Conversions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Total Conversions</h3>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-xs text-gray-400 mb-6">No conversions yet</div>
              {/* Empty bars */}
              <div className="flex items-end gap-2 h-24">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gray-100 rounded-sm" style={{ height: "8px" }}></div>
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                <Link to="/reports" className="text-sm text-blue-600 hover:text-blue-700 font-medium">See All →</Link>
              </div>
              <div className="text-center py-10">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm text-gray-400">No transactions yet</p>
                <p className="text-xs text-gray-300 mt-1">Join programs to start earning</p>
              </div>
            </div>

            {/* Commission Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5">Commission Summary</h3>
              <div className="space-y-4">
                {[
                  { label: "Today's Commission", value: "$0.00" },
                  { label: "Yesterday's Commission", value: "$0.00" },
                  { label: "This Month's Commission", value: "$0.00" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link to="/programs" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
                Browse Programs
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}