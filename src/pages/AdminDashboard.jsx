import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { key: "publishers", label: "Publisher Applications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { key: "advertisers", label: "Advertiser Applications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { key: "programs", label: "Program Applications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
];

const PROGRAMS = [
  { id: 1, name: "NovaTech Electronics" },
  { id: 2, name: "LuxeStyle Fashion" },
  { id: 3, name: "GreenLeaf Wellness" },
  { id: 4, name: "HomeNest Decor" },
  { id: 5, name: "SportZone Pro" },
  { id: 6, name: "TravelEase Bookings" },
  { id: 7, name: "FinanceHub" },
  { id: 8, name: "PetPals Store" },
  { id: 9, name: "KidsWorld Clothing" },
  { id: 10, name: "SoftPeak Solutions" },
];

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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
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

function UsersTable({ data, onApprove, onReject, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    </div>
  );

  if (data.length === 0) return (
    <div className="text-center py-20">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p className="text-sm text-gray-400">No applications yet</p>
    </div>
  );

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
              <td className="py-4 px-4 text-sm font-medium text-gray-900">{app.full_name || "—"}</td>
              <td className="py-4 px-4 text-sm text-gray-500">{app.email}</td>
              <td className="py-4 px-4 text-sm text-blue-600">
                {app.website ? <a href={app.website} target="_blank" rel="noreferrer" className="hover:underline">{app.website.replace(/https?:\/\//, "")}</a> : "—"}
              </td>
              <td className="py-4 px-4 text-sm text-gray-400">{new Date(app.created_at).toLocaleDateString()}</td>
              <td className="py-4 px-4"><StatusBadge status={app.status} /></td>
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

function ProgramApplicationsTable({ data, onApprove, onReject, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    </div>
  );

  if (data.length === 0) return (
    <div className="text-center py-20">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      <p className="text-sm text-gray-400">No program applications yet</p>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Publisher</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Email</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Program</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Applied</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Status</th>
            <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-widest py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => {
            const program = PROGRAMS.find(p => p.id === app.program_id);
            return (
              <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{app.full_name || "—"}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{app.email || "—"}</td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-800">{program?.name || `Program #${app.program_id}`}</span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-400">{new Date(app.applied_at).toLocaleDateString()}</td>
                <td className="py-4 px-4"><StatusBadge status={app.status} /></td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Overview({ publishers, advertisers, programApplications }) {
  const stats = [
    { label: "Total Publishers", value: publishers.length, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Publishers", value: publishers.filter(p => p.status === "pending").length, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Advertisers", value: advertisers.length, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Pending Advertisers", value: advertisers.filter(a => a.status === "pending").length, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Program Applications", value: programApplications.length, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Pending Program Apps", value: programApplications.filter(a => a.status === "pending").length, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
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
  const [programApplications, setProgramApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);

    // Fetch publishers
    const { data: pubs } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "publisher")
      .order("created_at", { ascending: false });

    // Fetch advertisers
    const { data: advs } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "advertiser")
      .order("created_at", { ascending: false });

    // Fetch program applications with user info
    const { data: apps } = await supabase
      .from("program_applications")
      .select("*, profiles(full_name, email)")
      .order("applied_at", { ascending: false });

    setPublishers(pubs || []);
    setAdvertisers(advs || []);

    // Flatten profile data into applications
    const flatApps = (apps || []).map(app => ({
      ...app,
      full_name: app.profiles?.full_name || "—",
      email: app.profiles?.email || "—",
    }));
    setProgramApplications(flatApps);
    setLoading(false);
  };

  const handleApproveUser = async (id) => {
    await supabase.from("profiles").update({ status: "approved" }).eq("id", id);
    fetchData();
  };

  const handleRejectUser = async (id) => {
    await supabase.from("profiles").update({ status: "rejected" }).eq("id", id);
    fetchData();
  };

  const handleApproveProgram = async (id) => {
    await supabase.from("program_applications").update({ status: "approved" }).eq("id", id);
    fetchData();
  };

  const handleRejectProgram = async (id) => {
    await supabase.from("program_applications").update({ status: "rejected" }).eq("id", id);
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const getTitle = () => {
    if (active === "overview") return "Overview";
    if (active === "publishers") return "Publisher Applications";
    if (active === "advertisers") return "Advertiser Applications";
    if (active === "programs") return "Program Applications";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />

      <div className="flex-1 ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-xs text-gray-400">Linktrackify Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs font-semibold">Admin</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Overview */}
          {active === "overview" && (
            <Overview publishers={publishers} advertisers={advertisers} programApplications={programApplications} />
          )}

          {/* Publisher Applications */}
          {active === "publishers" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Publisher Applications</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{publishers.length} total</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">
                    {publishers.filter(p => p.status === "pending").length} Pending
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                    {publishers.filter(p => p.status === "approved").length} Approved
                  </span>
                </div>
              </div>
              <UsersTable data={publishers} onApprove={handleApproveUser} onReject={handleRejectUser} loading={loading} />
            </div>
          )}

          {/* Advertiser Applications */}
          {active === "advertisers" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Advertiser Applications</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{advertisers.length} total</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">
                    {advertisers.filter(a => a.status === "pending").length} Pending
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                    {advertisers.filter(a => a.status === "approved").length} Approved
                  </span>
                </div>
              </div>
              <UsersTable data={advertisers} onApprove={handleApproveUser} onReject={handleRejectUser} loading={loading} />
            </div>
          )}

          {/* Program Applications */}
          {active === "programs" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Program Applications</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{programApplications.length} total applications</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-semibold border border-amber-100">
                    {programApplications.filter(a => a.status === "pending").length} Pending
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                    {programApplications.filter(a => a.status === "approved").length} Approved
                  </span>
                  <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-100">
                    {programApplications.filter(a => a.status === "rejected").length} Rejected
                  </span>
                </div>
              </div>
              <ProgramApplicationsTable
                data={programApplications}
                onApprove={handleApproveProgram}
                onReject={handleRejectProgram}
                loading={loading}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}