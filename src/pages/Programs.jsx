import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

const CATEGORIES = [
  "All Categories", "Clothing", "Clothing Accessories", "Computer Accessories",
  "Computers", "Electronics", "Health & Beauty", "Home & Garden",
  "Sports Equipment", "Travel", "Finance", "Food & Drink",
  "Gifts & Flowers", "Childrenswear", "Car Rental", "Car & Motor Accessories",
  "Car Insurance", "Charities", "Electronic Accessories", "Fashion",
  "Luxury", "Pet Supplies", "Software", "Telecommunications",
];

const COUNTRIES = ["All Countries", "US", "GB", "DE", "FR", "IT", "ES", "NL", "CA", "AU"];

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: "Programs", href: "/programs", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { label: "Reports", href: "/reports", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: "Payments", href: "/payments", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

const PROGRAMS = [
  { id: 1, name: "NovaTech Electronics", domain: "novatech.com", logo: "NT", logoColor: "from-blue-500 to-blue-700", description: "NovaTech is a leading electronics retailer offering the latest gadgets, laptops, smartphones, and accessories. With a massive product catalog and competitive pricing, affiliates earn on every sale.", category: "Electronics", region: "US", commission: "8%", cookieDays: 30, epc: 2.45 },
  { id: 2, name: "LuxeStyle Fashion", domain: "luxestyle.co.uk", logo: "LS", logoColor: "from-pink-500 to-rose-600", description: "LuxeStyle is a premium UK fashion brand offering designer clothing, accessories, and footwear for men and women. High AOV and strong conversion rates make this a top performer for fashion affiliates.", category: "Fashion", region: "GB", commission: "12%", cookieDays: 45, epc: 3.82 },
  { id: 3, name: "GreenLeaf Wellness", domain: "greenleafwellness.com", logo: "GL", logoColor: "from-emerald-500 to-green-700", description: "GreenLeaf Wellness offers premium organic supplements, vitamins, and wellness products. A US-focused brand with a loyal customer base and high repeat purchase rate.", category: "Health & Beauty", region: "US", commission: "15%", cookieDays: 60, epc: 4.21 },
  { id: 4, name: "HomeNest Decor", domain: "homenest.de", logo: "HN", logoColor: "from-amber-500 to-orange-600", description: "HomeNest is a German home decor and furniture brand specializing in modern Scandinavian design. Popular across Europe with a strong social media presence and high customer satisfaction scores.", category: "Home & Garden", region: "DE", commission: "10%", cookieDays: 30, epc: 2.91 },
  { id: 5, name: "SportZone Pro", domain: "sportzpro.com", logo: "SZ", logoColor: "from-orange-500 to-red-600", description: "SportZone Pro is a US-based sports equipment and activewear retailer. Catering to fitness enthusiasts and professional athletes, with a wide range of equipment from top brands.", category: "Sports Equipment", region: "US", commission: "9%", cookieDays: 30, epc: 3.15 },
  { id: 6, name: "TravelEase Bookings", domain: "travelease.co.uk", logo: "TE", logoColor: "from-cyan-500 to-blue-600", description: "TravelEase is a UK-based travel booking platform offering flights, hotels, and holiday packages. With high-value bookings and competitive commissions, this is ideal for travel content creators.", category: "Travel", region: "GB", commission: "6%", cookieDays: 90, epc: 5.67 },
  { id: 7, name: "FinanceHub", domain: "financehub.com", logo: "FH", logoColor: "from-slate-600 to-slate-800", description: "FinanceHub provides personal finance tools, credit cards, and investment products. High CPA rates and strong brand recognition across the US and European markets.", category: "Finance", region: "US", commission: "20%", cookieDays: 45, epc: 8.34 },
  { id: 8, name: "PetPals Store", domain: "petpals.fr", logo: "PP", logoColor: "from-violet-500 to-purple-700", description: "PetPals is a French online pet supplies store offering food, accessories, and grooming products for all types of pets. Strong repeat customer base with high lifetime value.", category: "Pet Supplies", region: "FR", commission: "11%", cookieDays: 30, epc: 2.78 },
  { id: 9, name: "KidsWorld Clothing", domain: "kidsworld.co.uk", logo: "KW", logoColor: "from-rose-400 to-pink-600", description: "KidsWorld is a UK children clothing brand known for high-quality, affordable kids fashion from newborn to 14 years. Seasonal collections drive strong conversion rates year-round.", category: "Childrenswear", region: "GB", commission: "13%", cookieDays: 30, epc: 3.44 },
  { id: 10, name: "SoftPeak Solutions", domain: "softpeak.com", logo: "SP", logoColor: "from-indigo-500 to-blue-700", description: "SoftPeak offers B2B and consumer software solutions including productivity tools, security software, and cloud services. Subscription-based model means recurring commissions for affiliates.", category: "Software", region: "US", commission: "25%", cookieDays: 60, epc: 9.12 },
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
          <h1 className="text-lg font-bold text-gray-900">Explore Programs</h1>
          <p className="text-xs text-gray-400">Discover and join programs to start earning</p>
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

export default function Programs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Programs");
  const [country, setCountry] = useState("All Countries");
  const [epcSort, setEpcSort] = useState("none");
  const [applications, setApplications] = useState({});
  const [userId, setUserId] = useState(null);
  const isAdmin = false;

  useEffect(() => { loadApplications(); }, []);

  const loadApplications = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    setUserId(session.user.id);
    const { data } = await supabase.from("program_applications").select("*").eq("user_id", session.user.id);
    if (data) {
      const appMap = {};
      data.forEach((app) => { appMap[app.program_id] = app.status; });
      setApplications(appMap);
    }
  };

  const handleJoin = async (id) => {
    if (!userId) return;
    const { error } = await supabase.from("program_applications").insert({ user_id: userId, program_id: id, status: "pending" });
    if (!error) setApplications((prev) => ({ ...prev, [id]: "pending" }));
  };

  const getStatus = (id) => applications[id] || "available";

  const filtered = PROGRAMS
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.domain.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All Categories" || p.category === category;
      const matchCountry = country === "All Countries" || p.region === country;
      const currentStatus = getStatus(p.id);
      const matchStatus = statusFilter === "All Programs" || (statusFilter === "My Programs" && currentStatus === "approved") || (statusFilter === "Pending" && currentStatus === "pending") || (statusFilter === "Rejected" && currentStatus === "rejected") || (statusFilter === "Not Joined" && currentStatus === "available");
      return matchSearch && matchCategory && matchCountry && matchStatus;
    })
    .sort((a, b) => {
      if (epcSort === "high-low") return b.epc - a.epc;
      if (epcSort === "low-high") return a.epc - b.epc;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Topbar setOpen={setSidebarOpen} />
        <main className="flex-1 p-6">

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search programs..."
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none flex-1" />
              </div>

              {/* Category */}
              <div className="relative">
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Country */}
              <div className="relative">
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Status */}
              <div className="relative">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>All Programs</option>
                  <option>My Programs</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                  <option>Not Joined</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* EPC Sort - Admin Only */}
              {isAdmin && (
                <div className="relative">
                  <select value={epcSort} onChange={(e) => setEpcSort(e.target.value)}
                    className="appearance-none bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium">
                    <option value="none">Sort by EPC</option>
                    <option value="high-low">EPC: High → Low</option>
                    <option value="low-high">EPC: Low → High</option>
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}

              {/* Results count */}
              <div className="ml-auto">
                <span className="text-sm text-gray-400">
                  <span className="font-bold text-gray-900">{filtered.length}</span> programs
                </span>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm text-gray-400">No programs found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((program) => {
                const status = getStatus(program.id);
                return (
                  <div key={program.id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                    {/* Card Top Banner */}
                    <div className={`h-2 w-full bg-gradient-to-r ${program.logoColor}`} />

                    <div className="p-5 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${program.logoColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                          <span className="text-white font-black text-sm tracking-wide">{program.logo}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm truncate">{program.name}</h3>
                          <p className="text-xs text-gray-400 truncate">{program.domain}</p>
                        </div>
                        {status === "approved" && (
                          <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded-full font-semibold flex-shrink-0">Active</span>
                        )}
                        {status === "pending" && (
                          <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-1 rounded-full font-semibold flex-shrink-0">Pending</span>
                        )}
                        {status === "rejected" && (
                          <span className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-1 rounded-full font-semibold flex-shrink-0">Rejected</span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {program.description}
                      </p>

                      {/* Category + Region tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium border border-blue-100">
                          {program.category}
                        </span>
                        <span className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full font-medium border border-gray-100">
                          🌍 {program.region}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-2.5 text-center border border-blue-100">
                          <div className="text-sm font-black text-blue-700">{program.commission}</div>
                          <div className="text-xs text-blue-400 font-medium">Commission</div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-2.5 text-center border border-gray-100">
                          <div className="text-sm font-black text-gray-700">{program.cookieDays}d</div>
                          <div className="text-xs text-gray-400 font-medium">Cookie</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-2.5 text-center border border-emerald-100">
                          <div className="text-sm font-black text-emerald-700">${program.epc}</div>
                          <div className="text-xs text-emerald-400 font-medium">EPC</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                        <button className="text-xs text-gray-400 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          View Details
                        </button>

                        {status === "available" && (
                          <button onClick={() => handleJoin(program.id)}
                            className={`flex-1 bg-gradient-to-r ${program.logoColor} text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0`}>
                            Join Program →
                          </button>
                        )}
                        {status === "pending" && (
                          <button disabled className="flex-1 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold py-2.5 rounded-xl cursor-not-allowed">
                            ⏳ Pending Approval
                          </button>
                        )}
                        {status === "approved" && (
                          <Link to="/generate-link" state={{ program }}
                            className={`flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-center`}>
                            🔗 Get Tracking Link
                          </Link>
                        )}
                        {status === "rejected" && (
                          <button disabled className="flex-1 bg-red-50 text-red-500 border border-red-200 text-xs font-bold py-2.5 rounded-xl cursor-not-allowed">
                            ✕ Application Rejected
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}