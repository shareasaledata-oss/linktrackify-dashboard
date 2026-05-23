import { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [accountSaved, setAccountSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifications, setNotifications] = useState({
    programApproved: true, programRejected: true, newConversion: true,
    paymentProcessed: true, weeklyReport: false, monthlyReport: true,
    newPrograms: true, systemUpdates: false,
  });

  const handleAccountSave = () => {
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 3000);
  };

  const handlePasswordSave = async () => {
    setPasswordError("");
    if (!newPassword || !confirmPassword) { setPasswordError("Please fill in all password fields."); return; }
    if (newPassword !== confirmPassword) { setPasswordError("New passwords do not match."); return; }
    if (newPassword.length < 8) { setPasswordError("Password must be at least 8 characters."); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { setPasswordError(error.message); return; }
    setPasswordSaved(true);
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const tabs = [
    { key: "account", label: "Account Info" },
    { key: "password", label: "Password" },
    { key: "notifications", label: "Notifications" },
  ];

  const notificationSettings = [
    { key: "programApproved", label: "Program Approved", desc: "When your program application is approved" },
    { key: "programRejected", label: "Program Rejected", desc: "When your program application is rejected" },
    { key: "newConversion", label: "New Conversion", desc: "When a new conversion is recorded" },
    { key: "paymentProcessed", label: "Payment Processed", desc: "When a payment is sent to your account" },
    { key: "weeklyReport", label: "Weekly Report", desc: "Weekly performance summary email" },
    { key: "monthlyReport", label: "Monthly Report", desc: "Monthly earnings and performance report" },
    { key: "newPrograms", label: "New Programs", desc: "When new merchant programs are added" },
    { key: "systemUpdates", label: "System Updates", desc: "Platform updates and announcements" },
  ];

  const eyeOn = <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
  const eyeOff = <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>;

  return (
    <Layout title="My Profile" subtitle="Manage your account settings">
      <div className="space-y-5">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white text-2xl font-black">P</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Publisher Account</h2>
              <p className="text-sm text-gray-400">ID: pub-001</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-semibold mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Active Account
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.key ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-500 hover:text-gray-700 hover:bg-white"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "account" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6">Account Information</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { label: "Full Name", value: fullName, setter: setFullName, placeholder: "Your full name", type: "text" },
                { label: "Username", value: username, setter: setUsername, placeholder: "Your username", type: "text" },
                { label: "Website", value: website, setter: setWebsite, placeholder: "https://yourwebsite.com", type: "url" },
                { label: "Country", value: country, setter: setCountry, placeholder: "Your country", type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleAccountSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm">
                Save Changes
              </button>
              {accountSaved && <span className="text-sm text-emerald-600 font-medium">✓ Saved successfully!</span>}
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
            <h3 className="font-bold text-gray-900 mb-6">Change Password</h3>
            {passwordError && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">{passwordError}</div>
            )}
            <div className="space-y-4">
              {[
                { label: "Current Password", value: currentPassword, setter: setCurrentPassword, show: showCurrent, toggle: setShowCurrent },
                { label: "New Password", value: newPassword, setter: setNewPassword, show: showNew, toggle: setShowNew },
                { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, show: showConfirm, toggle: setShowConfirm },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <div className="relative">
                    <input type={field.show ? "text" : "password"} value={field.value}
                      onChange={(e) => field.setter(e.target.value)} placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12" />
                    <button type="button" onClick={() => field.toggle(!field.show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {field.show ? eyeOff : eyeOn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handlePasswordSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm">
                Update Password
              </button>
              {passwordSaved && <span className="text-sm text-emerald-600 font-medium">✓ Password updated!</span>}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Notification Preferences</h3>
            <p className="text-sm text-gray-400 mb-6">Choose which email notifications you want to receive</p>
            <div className="space-y-0">
              {notificationSettings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{setting.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{setting.desc}</div>
                  </div>
                  <button onClick={() => setNotifications(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${notifications[setting.key] ? "bg-blue-600" : "bg-gray-200"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${notifications[setting.key] ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}