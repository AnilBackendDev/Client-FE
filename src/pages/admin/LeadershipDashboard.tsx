import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TrendingUp, Users, Briefcase, Target, BarChart3, ArrowLeft,
    DollarSign, Clock, Award, AlertCircle, Code2, Crown,
    Calendar, FileText, CheckCircle, Settings, Zap, GitBranch
} from "lucide-react";

const LeadershipDashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userRole = currentUser.role || 'ceo';
    const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'strategic'>('overview');

    // Dynamic content based on role
    const roleConfig = {
        ceo: {
            title: "CEO Executive Dashboard",
            icon: Crown,
            gradient: "from-yellow-400 to-amber-500",
            bgGradient: "from-slate-900 via-indigo-900 to-purple-900"
        },
        cto: {
            title: "CTO Technology Dashboard",
            icon: Code2,
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-slate-900 via-blue-900 to-slate-900"
        }
    };

    const config = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.ceo;
    const Icon = config.icon;

    const kpis = userRole === 'ceo' ? [
        { label: "Company Revenue", value: "$2.4M", change: "+18%", icon: DollarSign, positive: true, detail: "Monthly recurring" },
        { label: "Total Employees", value: "156", change: "+12", icon: Users, positive: true, detail: "8 new hires" },
        { label: "Customer Satisfaction", value: "94%", change: "+3%", icon: Award, positive: true, detail: "NPS Score: 72" },
        { label: "Operating Cost", value: "$1.8M", change: "-5%", icon: TrendingUp, positive: true, detail: "Efficiency improved" }
    ] : [
        { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Zap, positive: true, detail: "Last 30 days" },
        { label: "Code Quality", value: "92%", change: "+4%", icon: Code2, positive: true, detail: "Test coverage" },
        { label: "Engineering Team", value: "45", change: "+3", icon: Users, positive: true, detail: "Active developers" },
        { label: "Sprint Velocity", value: "42", change: "+8%", icon: TrendingUp, positive: true, detail: "Story points" }
    ];

    const teamMetrics = userRole === 'ceo' ? [
        { name: "Engineering", headcount: 45, budget: "$540K", revenue: "$1.2M", efficiency: 92, growth: "+12%" },
        { name: "Sales", headcount: 28, budget: "$336K", revenue: "$800K", efficiency: 95, growth: "+18%" },
        { name: "Marketing", headcount: 18, budget: "$216K", revenue: "$400K", efficiency: 88, growth: "+15%" },
        { name: "Product", headcount: 12, budget: "$144K", revenue: "$200K", efficiency: 90, growth: "+10%" }
    ] : [
        { name: "Frontend Team", headcount: 18, projects: 8, velocity: 42, quality: 94, tech: "React, TypeScript" },
        { name: "Backend Team", headcount: 15, projects: 6, velocity: 38, quality: 92, tech: "Node.js, Python" },
        { name: "DevOps Team", headcount: 8, projects: 12, velocity: 45, quality: 96, tech: "AWS, Docker" },
        { name: "Mobile Team", headcount: 4, projects: 3, velocity: 35, quality: 90, tech: "React Native" }
    ];

    const strategicInitiatives = userRole === 'ceo' ? [
        { id: 1, title: "Market Expansion - APAC", progress: 65, status: "On Track", team: "Sales", impact: "High", dueDate: "Q2 2024" },
        { id: 2, title: "AI Feature Launch", progress: 80, status: "Ahead", team: "Engineering", impact: "Critical", dueDate: "Q1 2024" },
        { id: 3, title: "Customer Success Program", progress: 45, status: "At Risk", team: "CS", impact: "Medium", dueDate: "Q2 2024" },
        { id: 4, title: "Brand Refresh", progress: 90, status: "Ahead", team: "Marketing", impact: "High", dueDate: "Q1 2024" }
    ] : [
        { id: 1, title: "Microservices Migration", progress: 70, status: "On Track", team: "Backend", impact: "High", dueDate: "Q2 2024" },
        { id: 2, title: "Performance Optimization", progress: 85, status: "Ahead", team: "Frontend", impact: "Critical", dueDate: "Q1 2024" },
        { id: 3, title: "Security Audit", progress: 40, status: "Behind", team: "DevOps", impact: "Critical", dueDate: "Q1 2024" },
        { id: 4, title: "API v2 Development", progress: 55, status: "On Track", team: "Backend", impact: "High", dueDate: "Q2 2024" }
    ];

    const recentAlerts = userRole === 'ceo' ? [
        { type: "warning", message: "Q4 sales target 15% behind", action: "Review pipeline" },
        { type: "info", message: "Board meeting scheduled for Feb 20", action: "Prepare materials" },
        { type: "success", message: "New partnership deal signed", action: "View details" }
    ] : [
        { type: "error", message: "Production incident - API latency spike", action: "View incident" },
        { type: "warning", message: "Code coverage dropped below 85%", action: "Review PRs" },
        { type: "info", message: "Tech stack review meeting tomorrow", action: "Prepare agenda" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/company/login');
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient}`}>
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        {config.title}
                                    </h1>
                                    <p className="text-sm text-white/70">Welcome back, {currentUser.name || 'Executive'}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/20 text-red-200 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-400/30"
                        >
                            Logout
                        </button>
                    </div>

                    {/* View Tabs */}
                    <div className="flex gap-2 mt-4">
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                            { id: 'strategic', label: 'Strategic', icon: Target }
                        ].map((tab) => {
                            const TabIcon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveView(tab.id as any)}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${activeView === tab.id
                                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    <TabIcon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Overview Tab */}
                {activeView === 'overview' && (
                    <>
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {kpis.map((kpi, index) => {
                                const KpiIcon = kpi.icon;
                                return (
                                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                                <KpiIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className={`text-sm font-medium ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                                                {kpi.change}
                                            </span>
                                        </div>
                                        <p className="text-white/70 text-sm mb-1">{kpi.label}</p>
                                        <p className="text-3xl font-bold text-white mb-1">{kpi.value}</p>
                                        <p className="text-xs text-white/50">{kpi.detail}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Alerts */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <AlertCircle className={`w-6 h-6 text-${userRole === 'ceo' ? 'yellow' : 'blue'}-400`} />
                                Important Alerts
                            </h2>
                            <div className="space-y-3">
                                {recentAlerts.map((alert, index) => (
                                    <div key={index} className={`p-4 rounded-xl border ${alert.type === 'error' ? 'bg-red-500/20 border-red-400/30' :
                                        alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-400/30' :
                                            alert.type === 'success' ? 'bg-green-500/20 border-green-400/30' :
                                                'bg-blue-500/20 border-blue-400/30'
                                        }`}>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white font-medium">{alert.message}</p>
                                            <button className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30">
                                                {alert.action}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team Overview */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
                            <div className="p-6 border-b border-white/20">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Users className="w-6 h-6" />
                                    {userRole === 'ceo' ? 'Department Overview' : 'Engineering Teams'}
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">
                                                {userRole === 'ceo' ? 'Department' : 'Team'}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Headcount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">
                                                {userRole === 'ceo' ? 'Budget' : 'Projects'}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">
                                                {userRole === 'ceo' ? 'Revenue' : 'Velocity'}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">
                                                {userRole === 'ceo' ? 'Efficiency' : 'Quality'}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {teamMetrics.map((team, index) => (
                                            <tr key={index} className="hover:bg-white/5">
                                                <td className="px-6 py-4 font-medium text-white">{team.name}</td>
                                                <td className="px-6 py-4 text-white/70">{team.headcount}</td>
                                                <td className="px-6 py-4 text-white/70">
                                                    {userRole === 'ceo' ? (team as any).budget : (team as any).projects}
                                                </td>
                                                <td className="px-6 py-4 text-white/70">
                                                    {userRole === 'ceo' ? (team as any).revenue : (team as any).velocity}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-white/20 rounded-full h-2 max-w-[100px]">
                                                            <div
                                                                className={`bg-gradient-to-r ${config.gradient} h-2 rounded-full`}
                                                                style={{ width: `${userRole === 'ceo' ? (team as any).efficiency : (team as any).quality}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-white">
                                                            {userRole === 'ceo' ? (team as any).efficiency : (team as any).quality}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Analytics Tab */}
                {activeView === 'analytics' && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">📊 Performance Trends</h3>
                                <div className="space-y-4">
                                    {userRole === 'ceo' ? (
                                        <>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Revenue Growth</span>
                                                    <span>+18%</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Customer Acquisition</span>
                                                    <span>+24%</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '78%' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Market Share</span>
                                                    <span>+12%</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '92%' }} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Code Coverage</span>
                                                    <span>92%</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Build Success Rate</span>
                                                    <span>98%</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '98%' }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm text-white/70 mb-2">
                                                    <span>Deployment Frequency</span>
                                                    <span>15/week</span>
                                                </div>
                                                <div className="bg-white/20 rounded-full h-2">
                                                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '88%' }} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">🎯 Monthly Targets</h3>
                                <div className="space-y-3">
                                    {userRole === 'ceo' ? (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Revenue Target</span>
                                                <span className="text-white font-semibold">$2.5M / $3.0M</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">New Customers</span>
                                                <span className="text-white font-semibold">45 / 60</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Team Growth</span>
                                                <span className="text-white font-semibold">8 / 12 hires</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Sprint Stories</span>
                                                <span className="text-white font-semibold">42 / 50 pts</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Bug Resolution</span>
                                                <span className="text-white font-semibold">45 / 52</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Code Reviews</span>
                                                <span className="text-white font-semibold">128 / 150</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Strategic Tab */}
                {activeView === 'strategic' && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                        <div className="p-6 border-b border-white/20">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Target className="w-6 h-6" />
                                Strategic Initiatives
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid gap-4">
                                {strategicInitiatives.map((initiative) => (
                                    <div key={initiative.id} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-white">{initiative.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${initiative.status === 'Ahead'
                                                        ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                        : initiative.status === 'On Track'
                                                            ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                                            : initiative.status === 'At Risk'
                                                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                                                                : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                                        }`}>
                                                        {initiative.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                                                    <span>Team: {initiative.team}</span>
                                                    <span>Impact: {initiative.impact}</span>
                                                    <span>Due: {initiative.dueDate}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-white/20 rounded-full h-3">
                                                        <div
                                                            className={`bg-gradient-to-r ${config.gradient} h-3 rounded-full transition-all`}
                                                            style={{ width: `${initiative.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold text-white min-w-[45px]">{initiative.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadershipDashboard;
