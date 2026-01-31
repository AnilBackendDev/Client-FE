import { useNavigate } from "react-router-dom";
import { Briefcase, Users, FileText, BarChart3, Shield, ArrowLeft } from "lucide-react";

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const stats = [
        { label: "Active Jobs", value: "12", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
        { label: "Total Candidates", value: "248", icon: Users, color: "from-purple-500 to-pink-500" },
        { label: "Interviews Scheduled", value: "18", icon: FileText, color: "from-green-500 to-emerald-500" },
        { label: "Placements This Month", value: "5", icon: BarChart3, color: "from-orange-500 to-red-500" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Recruiter Dashboard
                            </h1>
                            <p className="text-sm text-gray-600">Welcome back, {currentUser.name}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    <button
                        onClick={() => navigate('/recruiter/jobs')}
                        className="bg-white p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                    >
                        <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Manage Jobs</h3>
                        <p className="text-gray-600 text-sm">View and manage all job postings</p>
                    </button>

                    <button
                        onClick={() => navigate('/recruiter/candidates')}
                        className="bg-white p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                        <Users className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Candidates</h3>
                        <p className="text-gray-600 text-sm">Review candidate applications</p>
                    </button>

                    <button
                        onClick={() => navigate('/recruiter/analytics')}
                        className="bg-white p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all"
                    >
                        <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                        <p className="text-gray-600 text-sm">View hiring metrics and insights</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
