import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Mail, Lock, Eye, EyeOff, Key } from "lucide-react";
import { toast } from "sonner";

const CTOLogin = () => {
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Mock CTO credentials
    const mockCTOCredentials: Record<string, any> = {
        "COMP001": {
            "cto@techcorp.com": { password: "cto123", name: "Alex Rivera", role: "cto" }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const company = mockCTOCredentials[companyId.toUpperCase()];
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
        navigate("/company/leadership-dashboard");
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

                    <div className="relative">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                                <Code2 className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">CTO Executive Portal</h1>
                            <p className="text-blue-200 text-sm mt-1">Chief Technology Officer Access</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Company ID
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                    <input
                                        type="text"
                                        value={companyId}
                                        onChange={(e) => setCompanyId(e.target.value)}
                                        placeholder="COMP001"
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="cto@company.com"
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-100 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Signing in..." : "Sign In as CTO"}
                            </button>
                        </form>

                        <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200 text-sm text-center">
                            💡 Demo: COMP001 / cto@techcorp.com / cto123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTOLogin;
