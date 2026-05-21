import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const steps = ["Create Account", "Business Info", "Review & Submit"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${i < current ? "bg-emerald-500 text-white" :
                i === current ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                "bg-gray-100 text-gray-400"}`}>
              {i < current ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium hidden sm:block ${i === current ? "text-blue-600" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-0.5 mb-4 transition-all duration-300 ${i < current ? "bg-emerald-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1({ data, onChange, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">1. Create Account</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input type="text" value={data.firstName} onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="First Name"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">⚠ {errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input type="text" value={data.lastName} onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Last Name"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">⚠ {errors.lastName}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input type="email" value={data.email} onChange={(e) => onChange("email", e.target.value)}
          placeholder="username@email.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={data.password}
            onChange={(e) => onChange("password", e.target.value)} placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">⚠ {errors.password}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input type={showConfirm ? "text" : "password"} value={data.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)} placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showConfirm ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">⚠ {errors.confirmPassword}</p>}
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={data.terms} onChange={(e) => onChange("terms", e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-600">
            I agree with the{" "}
            <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">Terms and Conditions</Link>
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-xs mt-1">⚠ {errors.terms}</p>}
      </div>
    </div>
  );
}

function Step2({ data, onChange, errors }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">2. Advertiser Business Info</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Brand Name <span className="text-red-500">*</span>
        </label>
        <input type="text" value={data.brandName} onChange={(e) => onChange("brandName", e.target.value)}
          placeholder="Enter Brand Name"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.brandName ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.brandName && <p className="text-red-500 text-xs mt-1">⚠ {errors.brandName}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Company Legal Name <span className="text-red-500">*</span>
        </label>
        <input type="text" value={data.companyName} onChange={(e) => onChange("companyName", e.target.value)}
          placeholder="Enter Company Legal Name"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.companyName ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.companyName && <p className="text-red-500 text-xs mt-1">⚠ {errors.companyName}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Website <span className="text-red-500">*</span>
        </label>
        <input type="url" value={data.website} onChange={(e) => onChange("website", e.target.value)}
          placeholder="https://yourwebsite.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.website ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.website && <p className="text-red-500 text-xs mt-1">⚠ {errors.website}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input type="tel" value={data.phone} onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Enter Contact Phone Number"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">⚠ {errors.phone}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Country <span className="text-red-500">*</span>
        </label>
        <input type="text" value={data.country} onChange={(e) => onChange("country", e.target.value)}
          placeholder="Your country"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.country ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.country && <p className="text-red-500 text-xs mt-1">⚠ {errors.country}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Address <span className="text-red-500">*</span>
        </label>
        <input type="text" value={data.address} onChange={(e) => onChange("address", e.target.value)}
          placeholder="Enter Address"
          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
        {errors.address && <p className="text-red-500 text-xs mt-1">⚠ {errors.address}</p>}
      </div>
    </div>
  );
}

function Step3({ data }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">3. Review & Submit</h2>
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Account Details</p>
          <div className="space-y-2">
            {[
              { label: "Full Name", value: `${data.firstName} ${data.lastName}` },
              { label: "Email", value: data.email },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Business Info</p>
          <div className="space-y-2">
            {[
              { label: "Brand Name", value: data.brandName },
              { label: "Company Name", value: data.companyName },
              { label: "Website", value: data.website },
              { label: "Phone", value: data.phone },
              { label: "Country", value: data.country },
              { label: "Address", value: data.address },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-blue-700 font-medium mb-1">What happens next?</p>
        <p className="text-xs text-blue-600 leading-relaxed">Your advertiser application will be reviewed within 1-2 business days. You'll receive an email confirmation once approved.</p>
      </div>
    </div>
  );
}

export default function AdvertiserRegister() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "", terms: false,
    brandName: "", companyName: "", website: "",
    phone: "", country: "", address: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.brandName.trim()) newErrors.brandName = "Brand name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.website.trim()) newErrors.website = "Website is required";
    else if (!formData.website.startsWith("http")) newErrors.website = "Website must start with http:// or https://";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleNext = () => {
    let newErrors = {};
    if (currentStep === 0) newErrors = validateStep1();
    if (currentStep === 1) newErrors = validateStep2();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          role: "advertiser",
          brand_name: formData.brandName,
          company_name: formData.companyName,
          website: formData.website,
          phone: formData.phone,
          country: formData.country,
          address: formData.address,
        },
      },
    });

    if (error) {
      setErrors({ submit: error.message });
      setLoading(false);
      return;
    }

    navigate("/registration-success");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left Panel */}
      <div className="hidden lg:flex w-5/12 bg-slate-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.2),transparent)]" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-900 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-800 rounded-full blur-3xl opacity-40" />
        <div className="relative z-10 text-center">
          <Link to="/" className="flex items-center gap-2 justify-center mb-10 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="font-bold text-white text-xl tracking-tight">Linktrackify</span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-4">Advertiser Signup</h2>
          <p className="text-slate-400 leading-relaxed max-w-sm">Connect your brand with thousands of motivated publishers and grow your reach.</p>
          <div className="mt-10 space-y-4 text-left">
            {[
              { icon: "🎯", text: "Performance-based model" },
              { icon: "📈", text: "Scale your brand reach" },
              { icon: "🔍", text: "Full campaign visibility" },
              { icon: "💼", text: "Enterprise-grade infrastructure" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-slate-300">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          <StepIndicator current={currentStep} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {errors.submit && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
                {errors.submit}
              </div>
            )}

            {currentStep === 0 && <Step1 data={formData} onChange={handleChange} errors={errors} />}
            {currentStep === 1 && <Step2 data={formData} onChange={handleChange} errors={errors} />}
            {currentStep === 2 && <Step3 data={formData} />}

            <div className="flex items-center justify-between mt-8">
              {currentStep > 0 ? (
                <button onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Previous
                </button>
              ) : (
                <Link to="/register" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </Link>
              )}

              {currentStep < 2 ? (
                <button onClick={handleNext}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 text-sm">
                  Save & Next
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
          </p>
          <p className="text-center text-xs text-gray-400 mt-4">© 2026 Linktrackify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}