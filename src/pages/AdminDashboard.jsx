import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const PROGRAMS = [
  { id: 1, name: "NovaTech Electronics", category: "Electronics", commission: "8%", network: "Awin" },
  { id: 2, name: "LuxeStyle Fashion", category: "Fashion", commission: "12%", network: "Impact" },
  { id: 3, name: "GreenLeaf Wellness", category: "Health & Beauty", commission: "15%", network: "Awin" },
  { id: 4, name: "HomeNest Decor", category: "Home & Garden", commission: "10%", network: "Awin" },
  { id: 5, name: "SportZone Pro", category: "Sports Equipment", commission: "9%", network: "Impact" },
  { id: 6, name: "TravelEase Bookings", category: "Travel", commission: "6%", network: "Awin" },
  { id: 7, name: "FinanceHub", category: "Finance", commission: "20%", network: "Impact" },
  { id: 8, name: "PetPals Store", category: "Pet Supplies", commission: "11%", network: "Awin" },
  { id: 9, name: "KidsWorld Clothing", category: "Childrenswear", commission: "13%", network: "Impact" },
  { id: 10, name: "SoftPeak Solutions", category: "Software", commission: "25%", network: "Awin" },
];

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { key: "publishers", label: "Total Publishers", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { key: "pending_publishers", label: "Pending Publishers", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { key: "pending_advertisers", label: "Pending Advertisers", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { key: "program_applications", label: "Program Applications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
  { key: "revenue", label: "Affiliate Revenue", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border border-amber-200",
    approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    rejected: "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || styles.pending}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
    </span>
  );
}

function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-30 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <div>
          <span className="font-bold text-white text-base tracking-tight">Linktrackify</span>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">Management</p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

function PublisherDetailModal({ publisher, onClose }) {
  if (!publisher) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-lg">Publisher Details</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          {[
            { label: "Full Name", value: publisher.full_name },
            { label: "Email", value: publisher.email },
            { label: "Website", value: publisher.website },
            { label: "Country", value: publisher.country },
            { label: "Promotion Method", value: publisher.promotion_method },
            { label: "Monthly Traffic", value: publisher.monthly_traffic },
            { label: "Status", value: <StatusBadge status={publisher.status} /> },
            { label: "Applied", value: new Date(publisher.created_at).toLocaleDateString() },
            { label: "Description", value: publisher.description },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500 font-medium w-40 flex-shrink-0">{item.label}</span>
              <span className="text-sm text-gray-900 text-right">{item.value || "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Overview({ publishers, advertisers, programApps, transactions, loading, setActive }) {
  const approvedPublishers = publishers.filter(p => p.status === "approved");
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.sale_amount || 0), 0);
  const totalCommission = transactions.reduce((sum, t) => sum + (t.commission_amount || 0), 0);
  const platformMargin = transactions.reduce((sum, t) => sum + (t.platform_margin || 0), 0);

  const networkStats = PROGRAMS.reduce((acc, prog) => {
    const progTransactions = transactions.filter(t => t.program_id === prog.id);
    const revenue = progTransactions.reduce((sum, t) => sum + (t.sale_amount || 0), 0);
    if (revenue > 0) {
      if (!acc[prog.network]) acc[prog.network] = 0;
      acc[prog.network] += revenue;
    }
    return acc;
  }, {});

  const stats = [
    { label: "Total Publishers", value: approvedPublishers.length, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", key: "publishers" },
    { label: "Pending Publishers", value: publishers.filter(p => p.status === "pending").length, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", key: "pending_publishers" },
    { label: "Pending Advertisers", value: advertisers.filter(a => a.status === "pending").length, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", key: "pending_advertisers" },
    { label: "Program Applications", value: programApps.filter(a => a.status === "pending").length, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", key: "program_applications" },
    { label: "Total Sales", value: `$${totalRevenue.toFixed(2)}`, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", key: null },
    { label: "Total Commission", value: `$${totalCommission.toFixed(2)}`, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100", key: null },
    { label: "Platform Margin", value: `$${platformMargin.toFixed(2)}`, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", key: null },
    { label: "Affiliate Revenue", value: `$${(totalCommission - platformMargin).toFixed(2)}`, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", key: "revenue" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">Live data</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}
            onClick={() => stat.key && setActive(stat.key)}
            className={`bg-white rounded-2xl p-5 border ${stat.border} shadow-sm ${stat.key ? "cursor-pointer hover:shadow-md transition-all" : ""}`}>
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            {stat.key && <div className="text-xs text-blue-500 mt-1">Click to view →</div>}
          </div>
        ))}
      </div>

      {/* Combined Sales Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Combined Affiliate Sales</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* By Network */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-3">By Affiliate Network</p>
            {Object.keys(networkStats).length === 0 ? (
              <p className="text-sm text-gray-400">No sales data yet</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(networkStats).map(([network, revenue]) => (
                  <div key={network} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-700">{network}</span>
                    <span className="text-sm font-bold text-emerald-600">${revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* By Program */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-3">By Program</p>
            {PROGRAMS.map((prog) => {
              const progRevenue = transactions.filter(t => t.program_id === prog.id).reduce((sum, t) => sum + (t.sale_amount || 0), 0);
              if (progRevenue === 0) return null;
              return (
                <div key={prog.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-700">{prog.name}</span>
                  <span className="text-sm font-bold text-emerald-600">${progRevenue.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recent Publisher Applications</h3>
          {publishers.slice(0, 5).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {publishers.slice(0, 5).map((pub) => (
                <div key={pub.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pub.full_name || pub.email}</p>
                    <p className="text-xs text-gray-400">{new Date(pub.created_at).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={pub.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recent Program Applications</h3>
          {programApps.slice(0, 5).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {programApps.slice(0, 5).map((app) => {
                const program = PROGRAMS.find(p => p.id === app.program_id);
                return (
                  <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{app.full_name || "—"}</p>
                      <p className="text-xs text-gray-400">{program?.name}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TotalPublishers({ publishers, loading }) {
  const approved = publishers.filter(p => p.status === "approved");
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="font-bold text-gray-900">Total Publishers ({approved.length})</h2>
        <p className="text-sm text-gray-400 mt-0.5">All approved publishers on the network</p>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        </div>
      ) : approved.length === 0 ? (
        <div className="text-center py-16"><p className="text-sm text-gray-400">No approved publishers yet</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["ID", "Name", "Email", "Promotion Method", "Monthly Traffic", "Website", "Country", "Joined"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approved.map((pub, i) => (
                <tr key={pub.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4"><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">PUB-{String(i + 1).padStart(3, "0")}</span></td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{pub.full_name || "—"}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{pub.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 capitalize">{pub.promotion_method || "—"}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{pub.monthly_traffic || "—"}</td>
                  <td className="py-4 px-4 text-sm text-blue-600">{pub.website ? <a href={pub.website} target="_blank" rel="noreferrer" className="hover:underline">{pub.website.replace(/https?:\/\//, "")}</a> : "—"}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{pub.country || "—"}</td>
                  <td className="py-4 px-4 text-sm text-gray-400">{new Date(pub.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PendingPublishers({ publishers, onApprove, onReject, loading }) {
  const [selectedPub, setSelectedPub] = useState(null);
  const pending = publishers.filter(p => p.status === "pending");

  return (
    <>
      {selectedPub && <PublisherDetailModal publisher={selectedPub} onClose={() => setSelectedPub(null)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Pending Publisher Applications ({pending.length})</h2>
            <p className="text-sm text-gray-400 mt-0.5">Review and approve or reject publisher applications</p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">{pending.length} Pending</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20"><svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>
        ) : pending.length === 0 ? (
          <div className="text-center py-16"><p className="text-sm text-gray-400">No pending applications</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {["Name", "Email", "Website", "Method", "Applied", "Details", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map((pub) => (
                  <tr key={pub.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{pub.full_name || "—"}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{pub.email}</td>
                    <td className="py-4 px-4 text-sm text-blue-600">{pub.website ? <a href={pub.website} target="_blank" rel="noreferrer" className="hover:underline">{pub.website.replace(/https?:\/\//, "")}</a> : "—"}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 capitalize">{pub.promotion_method || "—"}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{new Date(pub.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <button onClick={() => setSelectedPub(pub)}
                        className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all">
                        View Details
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => onApprove(pub.id)} className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all">Approve</button>
                        <button onClick={() => onReject(pub.id)} className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function PendingAdvertisers({ advertisers, onApprove, onReject, loading }) {
  const [selectedAdv, setSelectedAdv] = useState(null);
  const pending = advertisers.filter(a => a.status === "pending");

  return (
    <>
      {selectedAdv && <PublisherDetailModal publisher={selectedAdv} onClose={() => setSelectedAdv(null)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Pending Advertiser Applications ({pending.length})</h2>
            <p className="text-sm text-gray-400 mt-0.5">Review and approve or reject advertiser applications</p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">{pending.length} Pending</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20"><svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>
        ) : pending.length === 0 ? (
          <div className="text-center py-16"><p className="text-sm text-gray-400">No pending advertiser applications</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {["Name", "Email", "Company", "Website", "Applied", "Details", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map((adv) => (
                  <tr key={adv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{adv.full_name || "—"}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{adv.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{adv.company_name || adv.brand_name || "—"}</td>
                    <td className="py-4 px-4 text-sm text-blue-600">{adv.website ? <a href={adv.website} target="_blank" rel="noreferrer" className="hover:underline">{adv.website.replace(/https?:\/\//, "")}</a> : "—"}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{new Date(adv.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <button onClick={() => setSelectedAdv(adv)}
                        className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all">
                        View Details
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => onApprove(adv.id)} className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all">Approve</button>
                        <button onClick={() => onReject(adv.id)} className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function ProgramApplications({ publishers, programApps, onApproveProgram, onRejectProgram, loading }) {
  const [selectedAll, setSelectedAll] = useState({});

  const approvedPublishers = publishers.filter(p => p.status === "approved");

  const handleSelectAll = (pubId, action) => {
    const pubApps = programApps.filter(a => a.user_id === pubId && a.status === "pending");
    pubApps.forEach(app => {
      if (action === "approve") onApproveProgram(app.id);
      else onRejectProgram(app.id);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Program Applications</h2>
          <p className="text-sm text-gray-400">Manage program applications by publisher</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">{programApps.filter(a => a.status === "pending").length} Pending</span>
          <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold border border-emerald-100">{programApps.filter(a => a.status === "approved").length} Approved</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        </div>
      ) : approvedPublishers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
          <p className="text-sm text-gray-400">No approved publishers with program applications</p>
        </div>
      ) : (
        approvedPublishers.map((pub, pubIndex) => {
          const pubApps = programApps.filter(a => a.user_id === pub.id);
          if (pubApps.length === 0) return null;
          return (
            <div key={pub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
                style={{ background: "rgba(59,130,246,0.03)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                    PUB-{String(pubIndex + 1).padStart(3, "0")}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{pub.full_name || pub.email}</span>
                    <span className="text-xs text-gray-400 ml-2">{pub.email}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleSelectAll(pub.id, "approve")}
                    className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all border border-emerald-100">
                    ✓ Approve All Pending
                  </button>
                  <button onClick={() => handleSelectAll(pub.id, "reject")}
                    className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all border border-red-100">
                    ✕ Reject All Pending
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {["Program", "Category", "Commission", "Network", "Applied", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pubApps.map((app) => {
                      const program = PROGRAMS.find(p => p.id === app.program_id);
                      return (
                        <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{program?.name || `Program #${app.program_id}`}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{program?.category || "—"}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-blue-600">{program?.commission || "—"}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{program?.network || "—"}</td>
                          <td className="py-3 px-4 text-sm text-gray-400">{new Date(app.applied_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4"><StatusBadge status={app.status} /></td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {app.status !== "approved" && (
                                <button onClick={() => onApproveProgram(app.id)}
                                  className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all">
                                  Approve
                                </button>
                              )}
                              {app.status !== "rejected" && (
                                <button onClick={() => onRejectProgram(app.id)}
                                  className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">
                                  Reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function AffiliateRevenue({ publishers, transactions, loading }) {
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.sale_amount || 0), 0);
  const totalCommission = transactions.reduce((sum, t) => sum + (t.commission_amount || 0), 0);
  const totalMargin = transactions.reduce((sum, t) => sum + (t.platform_margin || 0), 0);
  const totalPublisherEarning = transactions.reduce((sum, t) => sum + (t.publisher_earning || 0), 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-lg">Affiliate Revenue</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">Dummy data for testing</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sales", value: `$${totalRevenue.toFixed(2)}`, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Total Commission", value: `$${totalCommission.toFixed(2)}`, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
          { label: "Platform Margin", value: `$${totalMargin.toFixed(2)}`, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Publisher Earnings", value: `$${totalPublisherEarning.toFixed(2)}`, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        ].map((stat) => (
          <div key={stat.label} className={`bg-white rounded-2xl p-5 border ${stat.border} shadow-sm`}>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* By Publisher */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Revenue by Publisher</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16"><svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {["Publisher ID", "Name", "Program", "Sale Amount", "Commission", "Platform Margin", "Publisher Earning", "Status", "Date"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => {
                  const publisher = publishers.find(p => p.id === t.user_id);
                  const program = PROGRAMS.find(p => p.id === t.program_id);
                  const pubIndex = publishers.filter(p => p.status === "approved").findIndex(p => p.id === t.user_id);
                  return (
                    <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          PUB-{String(pubIndex + 1).padStart(3, "0")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{publisher?.full_name || "—"}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{program?.name || "—"}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">${t.sale_amount?.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-violet-600">${t.commission_amount?.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-amber-600">${t.platform_margin?.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-emerald-600">${t.publisher_earning?.toFixed(2)}</td>
                      <td className="py-3 px-4"><StatusBadge status={t.status} /></td>
                      <td className="py-3 px-4 text-sm text-gray-400">{new Date(t.transaction_date).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
                {transactions.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-16 text-sm text-gray-400">No transactions yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [publishers, setPublishers] = useState([]);
  const [advertisers, setAdvertisers] = useState([]);
  const [programApps, setProgramApps] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const profilesSub = supabase
      .channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, fetchData)
      .subscribe();
    const appsSub = supabase
      .channel("apps-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "program_applications" }, fetchData)
      .subscribe();
    return () => {
      supabase.removeChannel(profilesSub);
      supabase.removeChannel(appsSub);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: pubs } = await supabase.from("profiles").select("*").eq("role", "publisher").order("created_at", { ascending: false });
    const { data: advs } = await supabase.from("profiles").select("*").eq("role", "advertiser").order("created_at", { ascending: false });
    const { data: apps } = await supabase.from("program_applications").select("*").order("applied_at", { ascending: false });
    const { data: txns } = await supabase.from("transactions").select("*").order("transaction_date", { ascending: false });

    setPublishers(pubs || []);
    setAdvertisers(advs || []);
    const { data: allProfiles } = await supabase.from("profiles").select("id, full_name, email");
    const profileMap = {};
    (allProfiles || []).forEach(p => { profileMap[p.id] = p; });
    setProgramApps((apps || []).map(app => ({
      ...app,
      full_name: profileMap[app.user_id]?.full_name || "—",
      email: profileMap[app.user_id]?.email || "—",
    })));
    setTransactions(txns || []);
    setLoading(false);
  };

  const handleApproveUser = async (id) => { await supabase.from("profiles").update({ status: "approved" }).eq("id", id); fetchData(); };
  const handleRejectUser = async (id) => { await supabase.from("profiles").update({ status: "rejected" }).eq("id", id); fetchData(); };
  const handleApproveProgram = async (id) => { await supabase.from("program_applications").update({ status: "approved", updated_at: new Date().toISOString() }).eq("id", id); fetchData(); };
  const handleRejectProgram = async (id) => { await supabase.from("program_applications").update({ status: "rejected", updated_at: new Date().toISOString() }).eq("id", id); fetchData(); };
  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin-login"); };

  const getTitle = () => {
    const titles = { overview: "Overview", publishers: "Total Publishers", pending_publishers: "Pending Publishers", pending_advertisers: "Pending Advertisers", program_applications: "Program Applications", revenue: "Affiliate Revenue" };
    return titles[active] || "Overview";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-xs text-gray-400">Linktrackify Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData}
              className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all font-medium">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs font-semibold">Admin</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {active === "overview" && <Overview publishers={publishers} advertisers={advertisers} programApps={programApps} transactions={transactions} loading={loading} setActive={setActive} />}
          {active === "publishers" && <TotalPublishers publishers={publishers} loading={loading} />}
          {active === "pending_publishers" && <PendingPublishers publishers={publishers} onApprove={handleApproveUser} onReject={handleRejectUser} loading={loading} />}
          {active === "pending_advertisers" && <PendingAdvertisers advertisers={advertisers} onApprove={handleApproveUser} onReject={handleRejectUser} loading={loading} />}
          {active === "program_applications" && <ProgramApplications publishers={publishers} programApps={programApps} onApproveProgram={handleApproveProgram} onRejectProgram={handleRejectProgram} loading={loading} />}
          {active === "revenue" && <AffiliateRevenue publishers={publishers} transactions={transactions} loading={loading} />}
        </main>
      </div>
    </div>
  );
}