import { useNavigate } from "react-router-dom";
import { Building2, Users, BarChart3, Settings, Plus, ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const stats = [
        { label: "Total Companies", value: "24", icon: Building2, color: "from-blue-500 to-cyan-500" },
        { label: "Active Users", value: "486", icon: Users, color: "from-purple-500 to-pink-500" },
        { label: "Monthly Revenue", value: "$32.4K", icon: BarChart3, color: "from-green-500 to-emerald-500" },
        { label: "System Health", value: "99.9%", icon: Settings, color: "from-orange-500 to-red-500" }
    ];

    const recentCompanies = [
        { name: "Tech Corp", users: 45, plan: "Enterprise", status: "Active" },
        { name: "StartUp Inc", users: 12, plan: "Professional", status: "Active" },
        { name: "Design Studio", users: 8, plan: "Starter", status: "Trial" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-600">Welcome back, {currentUser.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/admin/companies/new')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Plus className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-lg">Onboard New Company</h3>
                            <p className="text-purple-100 text-sm">Register a new client organization</p>
                        </div>
                    </button>

                    <button
                        className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105 hover:border-purple-300"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                            <Settings className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-lg text-gray-900">System Settings</h3>
                            <p className="text-gray-600 text-sm">Configure platform parameters</p>
                        </div>
                    </button>
                </div>

                {/* Recent Companies Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Recent Companies</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentCompanies.map((company, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                                                    {company.name.charAt(0)}
                                                </div>
                                                <div className="font-medium text-gray-900">{company.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{company.users}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                                {company.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${company.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button className="text-purple-600 hover:text-purple-800 font-medium">Manage</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
