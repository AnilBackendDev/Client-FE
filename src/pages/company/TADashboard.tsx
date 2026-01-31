import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserCheck, Users, FileText, TrendingUp, ArrowLeft, Calendar,
    CheckCircle2, Plus, Filter, Search, Eye, MessageSquare,
    Briefcase, Clock, Star, Send, X
} from "lucide-react";
import { toast } from "sonner";

const TADashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates' | 'interviews'>('overview');
    const [showJobModal, setShowJobModal] = useState(false);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    // AI Match Scores & States
    const [candidatesList, setCandidatesList] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            position: "Senior Developer",
            status: "Interview Scheduled",
            progress: 75,
            matchScore: 94,
            email: "alice@email.com",
            phone: "+1 234-567-8901",
            experience: "5 years",
            skills: ["React", "Node.js", "AWS", "TypeScript", "Next.js"],
            applied: "2024-01-18",
            feedback: [
                { id: 1, interviewer: "John Doe", score: 5, notes: "Excellent technical skills, very strong in React internals." }
            ]
        },
        {
            id: 2,
            name: "Bob Smith",
            position: "Product Manager",
            status: "Resume Review",
            progress: 30,
            matchScore: 68,
            email: "bob@email.com",
            phone: "+1 234-567-8902",
            experience: "7 years",
            skills: ["Product Strategy", "Agile", "Analytics", "Jira"],
            applied: "2024-01-19",
            feedback: []
        },
        {
            id: 3,
            name: "Carol Davis",
            position: "UI/UX Designer",
            status: "Final Round",
            progress: 90,
            matchScore: 88,
            email: "carol@email.com",
            phone: "+1 234-567-8903",
            experience: "4 years",
            skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
            applied: "2024-01-17",
            feedback: [
                { id: 1, interviewer: "Jane Smith", score: 4, notes: "Great eye for detail. Portfolio looks solid." }
            ]
        },
        {
            id: 4,
            name: "David Wilson",
            position: "Senior Developer",
            status: "Interview Scheduled",
            progress: 45,
            matchScore: 82,
            email: "david.w@email.com",
            phone: "+1 234-567-8904",
            experience: "6 years",
            skills: ["Python", "Docker", "Go", "Kubernetes"],
            applied: "2024-01-20",
            feedback: []
        },
    ]);

    const interviews = [
        { id: 1, candidate: "Alice Johnson", position: "Senior Developer", date: "2024-02-05", time: "10:00 AM", type: "Technical", interviewer: "John Doe" },
        { id: 2, candidate: "Carol Davis", position: "UI/UX Designer", date: "2024-02-06", time: "2:00 PM", type: "Final Round", interviewer: "Jane Smith" },
        { id: 3, candidate: "David Lee", position: "Data Analyst", date: "2024-02-07", time: "11:00 AM", type: "HR Round", interviewer: "Mike Johnson" },
    ];

    const stats = [
        { label: "Active Positions", value: 12, icon: FileText, color: "text-blue-500", bg: "bg-blue-100", trend: "+2 this week" },
        { label: "Total Candidates", value: 48, icon: Users, color: "text-green-500", bg: "bg-green-100", trend: "+12 this week" },
        { label: "Interviews This Week", value: 8, icon: Calendar, color: "text-purple-500", bg: "bg-purple-100", trend: "5 completed" },
        { label: "Hired This Month", value: 3, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100", trend: "60% offer rate" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/company/login');
    };

    const handlePostJob = () => {
        setShowJobModal(true);
    };

    const handleViewCandidate = (candidate: any) => {
        setSelectedCandidate(candidate);
        setShowCandidateModal(true);
    };

    const handleScheduleInterview = (candidateId: number) => {
        toast.success("Interview scheduling form opened!");
        // In real app, open interview scheduling modal
    };

    const handleUpdateStatus = (candidateId: number, newStatus: string) => {
        setCandidatesList(prev => prev.map(c => 
            c.id === candidateId ? { ...c, status: newStatus } : c
        ));
        toast.success(`Candidate status updated to: ${newStatus}`);
    };

    const handleAddFeedback = (candidateId: number, score: number, notes: string) => {
        setCandidatesList(prev => prev.map(c => 
            c.id === candidateId ? { 
                ...c, 
                feedback: [...c.feedback, { id: Date.now(), interviewer: currentUser.name || "Manager", score, notes }]
            } : c
        ));
        toast.success("Feedback added successfully!");
        setShowFeedbackModal(false);
    };

    const filteredCandidates = candidatesList.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             c.position.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "All" || c.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-500 border-emerald-500 bg-emerald-50";
        if (score >= 75) return "text-blue-500 border-blue-500 bg-blue-50";
        if (score >= 50) return "text-amber-500 border-amber-500 bg-amber-50";
        return "text-red-500 border-red-500 bg-red-50";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <UserCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        Talent Acquisition
                                    </h1>
                                    <p className="text-sm text-gray-600">Welcome, {currentUser.name || 'TA Manager'}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
                            Logout
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-4">
                        {[
                            { id: 'overview', label: 'Overview', icon: TrendingUp },
                            { id: 'jobs', label: 'Job Postings', icon: Briefcase },
                            { id: 'candidates', label: 'Candidates', icon: Users },
                            { id: 'interviews', label: 'Interviews', icon: Calendar }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-lg transition-all">
                                        <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                        <p className="text-xs text-emerald-600 font-medium">{stat.trend}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <button
                                onClick={handlePostJob}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all text-left"
                            >
                                <Plus className="w-12 h-12 text-emerald-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Post New Job</h3>
                                <p className="text-gray-600 text-sm">Create and publish a new job opening</p>
                            </button>

                            <button
                                onClick={() => setActiveTab('candidates')}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all text-left"
                            >
                                <Users className="w-12 h-12 text-teal-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Review Candidates</h3>
                                <p className="text-gray-600 text-sm">View and manage candidate applications</p>
                            </button>

                            <button
                                onClick={() => setActiveTab('interviews')}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all text-left"
                            >
                                <Calendar className="w-12 h-12 text-cyan-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Schedule Interviews</h3>
                                <p className="text-gray-600 text-sm">Manage interview calendar</p>
                            </button>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Recent Candidates</h2>
                            </div>
                            <div className="p-6">
                                {candidatesList.slice(0, 3).map((candidate) => (
                                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl mb-3 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm">
                                                    {candidate.name.charAt(0)}
                                                </div>
                                                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${getScoreColor(candidate.matchScore)} shadow-sm`}>
                                                    {candidate.matchScore}%
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{candidate.name}</p>
                                                <p className="text-sm text-gray-500 font-medium">{candidate.position}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold ring-1 ring-emerald-100">
                                                    {candidate.status}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleViewCandidate(candidate)}
                                                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black font-semibold text-sm transition-all active:scale-95"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Job Postings Tab */}
                {activeTab === 'jobs' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
                                    <p className="text-gray-600 text-sm mt-1">Manage all job positions</p>
                                </div>
                                <button
                                    onClick={handlePostJob}
                                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Post New Job
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid gap-4">
                                {jobs.map((job) => (
                                    <div key={job.id} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'Active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {job.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {job.applicants} applicants
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Posted: {job.posted}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Deadline: {job.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-medium">
                                                    Edit
                                                </button>
                                                <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 font-medium">
                                                    View Applicants
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Candidates Tab */}
                {activeTab === 'candidates' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">Candidate Pipeline</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search name, position..."
                                            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all w-64"
                                        />
                                    </div>
                                    <select 
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-medium"
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Resume Review">Resume Review</option>
                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                        <option value="Final Round">Final Round</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredCandidates.map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                                                            {candidate.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-gray-900 block">{candidate.name}</span>
                                                        <span className="text-xs text-gray-500">{candidate.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{candidate.position}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ring-1 ${
                                                    candidate.status === 'Final Round' ? 'bg-purple-50 text-purple-600 ring-purple-100' :
                                                    candidate.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-600 ring-blue-100' :
                                                    'bg-amber-50 text-amber-600 ring-amber-100'
                                                }`}>
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-bold ${getScoreColor(candidate.matchScore)}`}>
                                                        {candidate.matchScore}%
                                                    </div>
                                                    <div className="hidden lg:block">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">AI Match</p>
                                                        <p className="text-xs font-bold text-gray-700">Excellent</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleViewCandidate(candidate)}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleScheduleInterview(candidate.id)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Schedule Interview"
                                                    >
                                                        <Calendar className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                                                        title="Send Message"
                                                    >
                                                        <MessageSquare className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Interviews Tab */}
                {activeTab === 'interviews' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Interview Schedule</h2>
                                    <p className="text-gray-600 text-sm mt-1">Manage all scheduled interviews</p>
                                </div>
                                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Schedule Interview
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid gap-4">
                                {interviews.map((interview) => (
                                    <div key={interview.id} className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex flex-col items-center justify-center text-white">
                                                    <span className="text-2xl font-bold">{interview.date.split('-')[2]}</span>
                                                    <span className="text-xs">FEB</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{interview.candidate}</h3>
                                                    <p className="text-gray-600 mb-2">{interview.position}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {interview.time}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Star className="w-4 h-4" />
                                                            {interview.type}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            {interview.interviewer}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                                                    Join
                                                </button>
                                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                                                    Reschedule
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Job Posting Modal */}
            {showJobModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Post New Job</h2>
                            <button onClick={() => setShowJobModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Senior Frontend Developer" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            <option>Engineering</option>
                                            <option>Product</option>
                                            <option>Design</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            <option>Entry Level</option>
                                            <option>Mid Level</option>
                                            <option>Senior Level</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                                    <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Describe the role and responsibilities..."></textarea>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            toast.success("Job posted successfully!");
                                            setShowJobModal(false);
                                        }}
                                        className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg"
                                    >
                                        Publish Job
                                    </button>
                                    <button
                                        onClick={() => setShowJobModal(false)}
                                        className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Candidate Detail Modal */}
            {showCandidateModal && selectedCandidate && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedCandidate.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                                    <p className="text-gray-600">{selectedCandidate.position}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowCandidateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <UserCheck className="w-5 h-5 text-emerald-600" />
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Email</label>
                                            <p className="text-gray-900 font-semibold truncate">{selectedCandidate.email}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Phone</label>
                                            <p className="text-gray-900 font-semibold">{selectedCandidate.phone}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Experience</label>
                                            <p className="text-gray-900 font-semibold">{selectedCandidate.experience}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Applied On</label>
                                            <p className="text-gray-900 font-semibold">{selectedCandidate.applied}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-3">Skills & Expertise</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCandidate.skills.map((skill: string) => (
                                                <span key={skill} className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm font-bold shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Sparkles className="w-24 h-24" />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                                                AI Insights
                                            </h3>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-20 h-20 rounded-2xl border-2 border-emerald-500/50 flex flex-col items-center justify-center bg-emerald-500/10">
                                                    <span className="text-2xl font-black text-emerald-400">{selectedCandidate.matchScore}%</span>
                                                    <span className="text-[8px] uppercase font-black">Score</span>
                                                </div>
                                                <div>
                                                    <p className="text-emerald-400 font-black uppercase text-xs">Recommended</p>
                                                    <p className="text-sm text-gray-300">Top 5% of all applicants for this role based on technical proficiency and experience.</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-400">Technical Skills</span>
                                                    <span className="text-emerald-400">98%</span>
                                                </div>
                                                <div className="bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full w-[98%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-gray-200">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                                            Interview Feedback
                                            <button 
                                                onClick={() => setShowFeedbackModal(true)}
                                                className="text-emerald-600 hover:text-emerald-700 text-xs font-black uppercase underline decoration-2 underline-offset-4"
                                            >
                                                Add Feedback
                                            </button>
                                        </h3>
                                        <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                                            {selectedCandidate.feedback && selectedCandidate.feedback.length > 0 ? (
                                                selectedCandidate.feedback.map((f: any) => (
                                                    <div key={f.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-xs font-bold text-gray-900">{f.interviewer}</span>
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={`w-3 h-3 ${i < f.score ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-600 leading-relaxed italic">"{f.notes}"</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-6">
                                                    <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                                    <p className="text-xs text-gray-400 font-medium">No feedback recorded yet</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative flex-1 group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CheckCircle2 className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                    </div>
                                    <select 
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-gray-900 appearance-none focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                        value={selectedCandidate.status}
                                        onChange={(e) => handleUpdateStatus(selectedCandidate.id, e.target.value)}
                                    >
                                        <option>Resume Review</option>
                                        <option>Interview Scheduled</option>
                                        <option>Final Round</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => handleScheduleInterview(selectedCandidate.id)}
                                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Schedule Interview
                                </button>
                                <button
                                    className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all"
                                >
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] shadow-2xl max-w-md w-full p-10 transform animate-in slide-in-from-bottom-8 duration-500">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Star className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Interview Feedback</h2>
                            <p className="text-gray-500 font-medium">Share your thoughts on {selectedCandidate?.name}'s performance</p>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-4 text-center">Score Portfolio</label>
                                <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map((score) => (
                                        <button
                                            key={score}
                                            onClick={() => {
                                                const notes = (document.getElementById('feedback-notes') as HTMLTextAreaElement).value;
                                                handleAddFeedback(selectedCandidate.id, score, notes);
                                            }}
                                            className="w-12 h-12 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-lg font-bold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95"
                                        >
                                            {score}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-2">Technical & Soft Skills Notes</label>
                                <textarea
                                    id="feedback-notes"
                                    rows={4}
                                    placeholder="Examples: Strong system design knowledge, culture fit, etc."
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-[30px] focus:bg-white focus:border-emerald-500 transition-all outline-none text-sm font-medium"
                                ></textarea>
                            </div>

                            <button
                                onClick={() => setShowFeedbackModal(false)}
                                className="w-full py-5 bg-gray-50 text-gray-400 rounded-[30px] font-black uppercase tracking-widest text-xs hover:bg-gray-100 hover:text-gray-600 transition-all"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TADashboard;
