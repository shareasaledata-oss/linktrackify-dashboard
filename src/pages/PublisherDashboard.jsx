import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: "Programs", href: "/programs", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Reports", href: "/reports", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Payments", href: "/payments", icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

const STATS = [
  { label: "Conversions This Month", value: "0", change: "+0%", color: "#00E5FF", glow: "rgba(0,229,255,0.3)", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Total Account Balance", value: "$0.00", change: "+0%", color: "#a78bfa", glow: "rgba(167,139,250,0.3)", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Approved Earning", value: "$0.00", change: "+0%", color: "#34d399", glow: "rgba(52,211,153,0.3)", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> },
  { label: "Next Payout", value: "$0.00", change: "+0%", color: "#fb923c", glow: "rgba(251,146,60,0.3)", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
];

const glassCard = {
  background: "rgba(19, 30, 36, 0.75)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
  borderRadius: "24px",
};


function Sidebar({ open, setOpen }) {
  const location = useLocation();
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 lg:hidden"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          background: "linear-gradient(180deg, rgba(8,16,28,0.85) 0%, rgba(6,12,22,0.90) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.4)",
        }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00E5FF, #3b82f6)", boxShadow: "0 0 16px rgba(0,229,255,0.4)" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-bold text-white text-base tracking-tight">Linktrackify</span>
        </div>

        {/* Nav Groups */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-semibold px-3 mb-2" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>GENERAL</p>
          <nav className="space-y-0.5 mb-6">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.label} to={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
                  style={{
                    background: isActive ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.02)",
                    backdropFilter: isActive ? "blur(10px)" : "none",
                    color: isActive ? "#00E5FF" : "rgba(148,163,184,0.8)",
                    border: isActive ? "1px solid rgba(0,229,255,0.18)" : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: isActive ? "0 0 16px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}>
                  <span style={{ color: isActive ? "#00E5FF" : "rgba(148,163,184,0.5)" }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <p className="text-xs font-semibold px-3 mb-2" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>SETTINGS</p>
          <nav className="space-y-0.5">
            <Link to="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: "rgba(148,163,184,0.8)", border: "1px solid transparent" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(148,163,184,0.5)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Settings
            </Link>
            <Link to="/payments"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: "rgba(148,163,184,0.8)", border: "1px solid transparent" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(148,163,184,0.5)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Info
            </Link>
          </nav>
        </div>

        {/* Profile Footer */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00E5FF, #3b82f6)", boxShadow: "0 0 10px rgba(0,229,255,0.3)" }}>
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">Publisher</div>
              <div className="text-xs truncate" style={{ color: "rgba(148,163,184,0.5)" }}>ID: pub-001</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ setOpen }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-10"
      style={{
        background: "rgba(8,16,26,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,229,255,0.06)",
      }}>
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(p => !p)} className="lg:hidden p-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", color: "white" }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-xs" style={{ color: "rgba(148,163,184,0.6)" }}>Manage your affiliate performance</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl transition-all"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)" }}>
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-2.5 rounded-xl transition-all"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)" }}>
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5 ml-1 pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.8), rgba(59,130,246,0.9))", boxShadow: "0 0 16px rgba(0,229,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">Publisher</div>
            <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>ID: pub-001</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function PublisherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg, #020a14 0%, #061220 30%, #030d1a 60%, #020810 100%)" }}>

      {/* Background ambient glows - mirror effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main center mirror glow */}
        <div className="absolute top-1/4 left-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.1) 0%, rgba(0,180,255,0.06) 30%, transparent 70%)", filter: "blur(70px)", transform: "translateX(-50%) scaleX(1.6)" }} />
        {/* Top left atmospheric */}
        <div className="absolute -top-20 left-48 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, rgba(59,130,246,0.07) 40%, transparent 70%)", filter: "blur(90px)" }} />
        {/* Bottom right deep glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)", filter: "blur(80px)" }} />
        {/* Purple accent glow */}
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
        {/* Mirror reflection line - horizontal light streak */}
        <div className="absolute top-1/3 left-64 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.08), rgba(0,229,255,0.12), rgba(0,229,255,0.08), transparent)", filter: "blur(1px)" }} />
        {/* Bottom mirror reflection */}
        <div className="absolute bottom-1/3 left-64 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.06), rgba(0,229,255,0.08), transparent)", filter: "blur(1px)" }} />
        {/* Dark vignette edges */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
      </div>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col relative z-10">
        <Topbar setOpen={setSidebarOpen} />

        <main className="flex-1 p-6 space-y-5">

          {/* Warning Banner */}
          <div className="px-4 py-3 rounded-2xl flex items-center gap-3"
            style={{
              background: "rgba(251,146,60,0.08)",
              border: "1px solid rgba(251,146,60,0.15)",
              backdropFilter: "blur(10px)",
            }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fb923c" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm" style={{ color: "rgba(251,146,60,0.85)" }}>
              Please enter your payment details in the{" "}
              <Link to="/payments" className="font-semibold underline" style={{ color: "#fb923c" }}>Payments tab</Link>
              {" "}for future payouts.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="relative overflow-hidden p-5" style={{...glassCard, background: "rgba(12,20,32,0.7)"}}>
                {/* Top border shine only */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `rgba(${stat.color === "#00E5FF" ? "0,229,255" : stat.color === "#a78bfa" ? "167,139,250" : stat.color === "#34d399" ? "52,211,153" : "251,146,60"},0.15)`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs mb-2" style={{ color: "rgba(148,163,184,0.6)" }}>{stat.label}</div>
                  <div className="text-xs font-semibold" style={{ color: stat.color }}>{stat.change} this month</div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Earnings Overview */}
            <div className="lg:col-span-2 p-6" style={glassCard}>
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)" }} />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-white text-base">Earnings Overview</h3>
                  <div className="text-3xl font-bold text-white mt-1">$0.00</div>
                </div>
                <select className="text-xs px-3 py-1.5 rounded-xl font-medium outline-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.8)" }}>
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* Chart */}
              <div className="h-44 flex items-end gap-1.5 px-1"
                style={{ background: "rgba(0,0,0,0.15)", borderRadius: "16px", padding: "16px 12px 12px" }}>
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-sm relative overflow-hidden"
                      style={{ height: `${[20,35,25,45,30,15,50,40,70,55,45,30][i]}px` }}>
                      <div className="absolute inset-0 rounded-sm"
                        style={{ background: "linear-gradient(180deg, rgba(0,229,255,0.6) 0%, rgba(59,130,246,0.3) 100%)" }} />
                    </div>
                    <span style={{ fontSize: "8px", color: "rgba(148,163,184,0.35)" }}>{m}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#00E5FF" }} />
                  <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>This year</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>Last year</span>
                </div>
              </div>
            </div>

            {/* Total Conversions */}
            <div className="p-6 relative" style={glassCard}>
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)" }} />

              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-base">Total Conversions</h3>
                <select className="text-xs px-2 py-1 rounded-lg outline-none cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.8)" }}>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="text-3xl font-bold text-white mb-0.5">0</div>
              <div className="text-xs mb-5" style={{ color: "rgba(148,163,184,0.4)" }}>No conversions yet</div>

              <div className="flex items-end gap-2 h-28 px-1">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-sm"
                      style={{ height: "6px", background: "rgba(167,139,250,0.12)", borderRadius: "4px" }} />
                    <span style={{ fontSize: "9px", color: "rgba(148,163,184,0.3)" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Recent Transactions */}
            <div className="lg:col-span-2 relative overflow-hidden" style={glassCard}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)" }} />
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 className="font-semibold text-white">Recent Transactions</h3>
                <Link to="/reports"
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                  style={{ color: "#00E5FF", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.15)" }}>
                  See All →
                </Link>
              </div>
              <div className="py-14 text-center px-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.08)" }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="rgba(0,229,255,0.25)" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.4)" }}>No transactions yet</p>
                <p className="text-xs mt-1" style={{ color: "rgba(148,163,184,0.2)" }}>Join programs to start earning</p>
              </div>
            </div>

            {/* Commission Summary */}
            <div className="p-6 relative" style={glassCard}>
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)" }} />

              <h3 className="font-semibold text-white mb-5">Commission Summary</h3>
              <div className="space-y-0">
                {[
                  { label: "Today's Commission", value: "$0.00", color: "#00E5FF" },
                  { label: "Yesterday's Commission", value: "$0.00", color: "#a78bfa" },
                  { label: "This Month's Commission", value: "$0.00", color: "#34d399" },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span className="text-sm" style={{ color: "rgba(148,163,184,0.5)" }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <Link to="/programs"
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #3b82f6)",
                  boxShadow: "0 4px 16px rgba(0,229,255,0.25)",
                }}>
                Browse Programs
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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