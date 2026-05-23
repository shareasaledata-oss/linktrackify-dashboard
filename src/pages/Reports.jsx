import { useState } from "react";
import Layout from "../components/Layout";

const DATE_RANGES = ["Today", "Yesterday", "7 Days", "30 Days", "This Week", "Past Week", "This Month", "Last Month", "Custom Range"];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("performance");
  const [dateRange, setDateRange] = useState("Today");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateRange = (range) => {
    setDateRange(range);
    setShowCustomRange(range === "Custom Range");
  };

  const performanceStats = [
    { label: "Total Earnings", value: "$0.00", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Total Conversions", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Total Clicks", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  ];

  const advertiserStats = [
    { label: "Total Clicks", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
    { label: "Total Conversions", value: "0", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Total Sale Amount", value: "$0.00", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Total Commission", value: "$0.00", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  ];

  return (
    <Layout title="Performance Report" subtitle="Track your earnings, conversions, and clicks">
      <div className="space-y-5">
        {/* Tabs */}
        <div className="flex gap-2">
          <button onClick={() => setActiveTab("performance")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "performance" ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}>
            Performance
          </button>
          <button onClick={() => setActiveTab("advertiser")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "advertiser" ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}>
            Advertiser Performance
          </button>
        </div>

        {/* Date Range */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Date Range</p>
          <div className="flex flex-wrap gap-2">
            {DATE_RANGES.map((range) => (
              <button key={range} onClick={() => handleDateRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${dateRange === range ? "bg-blue-600 text-white shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
                {range}
              </button>
            ))}
          </div>
          {showCustomRange && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">Apply</button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className={`grid gap-4 ${activeTab === "performance" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
          {(activeTab === "performance" ? performanceStats : advertiserStats).map((stat) => (
            <div key={stat.label} className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5 flex items-center gap-4`}>
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">{activeTab === "performance" ? "Transactions" : "Advertiser Performance"}</h3>
            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export CSV
            </button>
          </div>
          <div className="py-16 text-center">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} className="mx-auto mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm text-gray-400">No data for selected period</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}