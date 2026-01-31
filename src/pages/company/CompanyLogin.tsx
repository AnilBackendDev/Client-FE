import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Eye, EyeOff, Key, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Company theme configuration
const companyThemes: Record<string, {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    gradient: string;
    backgroundPattern: string;
    logo?: string;
}> = {
    "COMP001": {
        name: "TechCorp Solutions",
        primaryColor: "#3B82F6",
        secondaryColor: "#8B5CF6",
        gradient: "from-blue-600 via-indigo-600 to-purple-600",
        backgroundPattern: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80"
    },
    "DEFAULT": {
        name: "OnboardAI Partner",
        primaryColor: "#6366F1",
        secondaryColor: "#8B5CF6",
        gradient: "from-indigo-600 via-purple-600 to-pink-600",
        backgroundPattern: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80"
    }
};

const CompanyLogin = () => {
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Get theme based on company ID
    const currentTheme = companyThemes[companyId.toUpperCase()] || companyThemes.DEFAULT;

    // Mock credentials for all roles
    const mockCredentials: Record<string, any> = {
        "COMP001": {
            "admin@techcorp.com": { password: "admin123", name: "Tech Corp Admin", role: "company_admin" },
            "ta@techcorp.com": { password: "ta123", name: "Sarah Johnson", role: "ta" },
            "hr@techcorp.com": { password: "hr123", name: "Michael Chen", role: "hrms" },
            "ceo@techcorp.com": { password: "ceo123", name: "David Martinez", role: "ceo" },
            "cto@techcorp.com": { password: "cto123", name: "Alex Rivera", role: "cto" }
        }
    };

    // Role to dashboard mapping
    const roleDashboardMap: Record<string, string> = {
        "company_admin": "/company/dashboard",
        "ta": "/company/ta-dashboard",
        "hrms": "/company/hr-dashboard",
        "ceo": "/company/leadership-dashboard",
        "cto": "/company/leadership-dashboard"
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        const company = mockCredentials[companyId.toUpperCase()];
        if (!company) {
            setError("Invalid Company ID");
            setIsLoading(false);
            return;
        }

        const user = company[email.toLowerCase().trim()];
        if (!user) {
            setError("User not found in this company");
            setIsLoading(false);
            return;
        }

        if (user.password !== password) {
            setError("Incorrect password");
            setIsLoading(false);
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify({
            id: email,
            name: user.name,
            email: email,
            role: user.role,
            companyId: companyId
        }));

        toast.success(`Welcome back, ${user.name}!`);

        const dashboardRoute = roleDashboardMap[user.role] || "/company/dashboard";
        navigate(dashboardRoute);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${currentTheme.backgroundPattern})`,
                }}
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-90`}></div>
                <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -top-20 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md">
                    {/* Company Branding Header */}
                    {companyId && (
                        <div className="text-center mb-6 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                                <Building2 className="w-5 h-5 text-white" />
                                <span className="text-white font-semibold text-lg">
                                    {currentTheme.name}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Login Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-300 hover:shadow-3xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${currentTheme.gradient} rounded-2xl mb-4 shadow-lg transform transition-transform hover:scale-110`}>
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600">
                                Sign in to access your workspace
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Company ID Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Company ID
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Key className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={companyId}
                                        onChange={(e) => setCompanyId(e.target.value)}
                                        placeholder="Enter your company ID"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@company.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 bg-gradient-to-r ${currentTheme.gradient} text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Partnership Branding */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <span className="text-sm">Powered by</span>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-lg border border-indigo-200">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        OnboardAI
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-2">
                                Intelligent Hiring & HR Management Platform
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyLogin;
