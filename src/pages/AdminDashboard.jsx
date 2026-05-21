import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const NAV_ITEMS = [
  {
    label: "Overview",
    key: "overview",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Publishers",
    key: "publishers",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Advertisers",
    key: "advertisers",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-30">
      {/* Logo */}
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

      {/* Nav */}
      <div className="px-3 py-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">Management</p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
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

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border border-amber-200",
    approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    rejected: "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || styles.pending}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending"}
    </span>
  );
}

function ApplicationsTable({ data, onApprove, onReject, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm text-gray-400">No applications yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Name</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Email</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Website</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Date</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Status</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => (
            <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <div className="font-medium text-gray-900 text-sm">{app.full_name || "—"}</div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">{app.email}</td>
              <td className="py-4 px-4 text-sm text-blue-600">
                {app.website ? (
                  <a href={app.website} target="_blank" rel="noreferrer" className="hover:underline">
                    {app.website.replace("https://", "").replace("http://", "")}
                  </a>
                ) : "—"}
              </td>
              <td className="py-4 px-4 text-sm text-gray-400">
                {new Date(app.created_at).toLocaleDateString()}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={app.status} />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {app.status !== "approved" && (
                    <button onClick={() => onApprove(app.id)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all">
                      Approve
                    </button>
                  )}
                  {app.status !== "rejected" && (
                    <button onClick={() => onReject(app.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">
                      Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({ publishers, advertisers }) {
  const stats = [
    { label: "Total Publishers", value: publishers.length, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Publishers", value: publishers.filter(p => p.status === "pending").length, color: "bg-amber-50 text-amber-600" },
    { label: "Total Advertisers", value: advertisers.length, color: "bg-violet-50 text-violet-600" },
    { label: "Pending Advertisers", value: advertisers.filter(a => a.status === "pending").length, color: "bg-rose-50 text-rose-600" },
    { label: "Approved Publishers", value: publishers.filter(p => p.status === "approved").length, color: "bg-emerald-50 text-emerald-600" },
    { label: "Approved Advertisers", value: advertisers.filter(a => a.status === "approved").length, color: "bg-cyan-50 text-cyan-600" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`text-3xl font-bold mb-1 ${stat.color.split(" ")[1]}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [publishers, setPublishers] = useState([]);
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: pubs } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "publisher")
      .order("created_at", { ascending: false });

    const { data: advs } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "advertiser")
      .order("created_at", { ascending: false });

    setPublishers(pubs || []);
    setAdvertisers(advs || []);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    await supabase.from("profiles").update({ status: "approved" }).eq("id", id);
    fetchData();
  };

  const handleReject = async (id) => {
    await supabase.from("profiles").update({ status: "rejected" }).eq("id", id);
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />

      <div className="flex-1 ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {active === "overview" ? "Overview" : active === "publishers" ? "Publisher Applications" : "Advertiser Applications"}
            </h1>
            <p className="text-xs text-gray-400">Linktrackify Admin Panel</p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-semibold">Admin</span>
          </div>
        </header>

        <main className="p-6">
          {active === "overview" && <Overview publishers={publishers} advertisers={advertisers} />}

          {active === "publishers" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Publisher Applications</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{publishers.length} total applications</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold">
                    {publishers.filter(p => p.status === "pending").length} Pending
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold">
                    {publishers.filter(p => p.status === "approved").length} Approved
                  </span>
                </div>
              </div>
              <ApplicationsTable
                data={publishers}
                onApprove={handleApprove}
                onReject={handleReject}
                loading={loading}
              />
            </div>
          )}

          {active === "advertisers" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Advertiser Applications</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{advertisers.length} total applications</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold">
                    {advertisers.filter(a => a.status === "pending").length} Pending
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold">
                    {advertisers.filter(a => a.status === "approved").length} Approved
                  </span>
                </div>
              </div>
              <ApplicationsTable
                data={advertisers}
                onApprove={handleApprove}
                onReject={handleReject}
                loading={loading}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}