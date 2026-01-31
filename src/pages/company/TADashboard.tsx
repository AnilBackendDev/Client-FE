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

    const jobs = [
        { id: 1, title: "Senior Full Stack Developer", status: "Active", applicants: 28, posted: "2024-01-15", deadline: "2024-02-15" },
        { id: 2, title: "Product Manager", status: "Active", applicants: 15, posted: "2024-01-20", deadline: "2024-02-20" },
        { id: 3, title: "UI/UX Designer", status: "Draft", applicants: 0, posted: "2024-01-22", deadline: "2024-02-25" },
        { id: 4, title: "Data Scientist", status: "Active", applicants: 42, posted: "2024-01-10", deadline: "2024-02-10" },
    ];

    const candidates = [
        {
            id: 1,
            name: "Alice Johnson",
            position: "Senior Developer",
            status: "Interview Scheduled",
            progress: 75,
            email: "alice@email.com",
            phone: "+1 234-567-8901",
            experience: "5 years",
            skills: ["React", "Node.js", "AWS"],
            applied: "2024-01-18"
        },
        {
            id: 2,
            name: "Bob Smith",
            position: "Product Manager",
            status: "Resume Review",
            progress: 30,
            email: "bob@email.com",
            phone: "+1 234-567-8902",
            experience: "7 years",
            skills: ["Product Strategy", "Agile", "Analytics"],
            applied: "2024-01-19"
        },
        {
            id: 3,
            name: "Carol Davis",
            position: "UI/UX Designer",
            status: "Final Round",
            progress: 90,
            email: "carol@email.com",
            phone: "+1 234-567-8903",
            experience: "4 years",
            skills: ["Figma", "Design Systems", "User Research"],
            applied: "2024-01-17"
        },
    ];

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
        toast.success(`Candidate status updated to: ${newStatus}`);
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

                        {/* Recent Candidates */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Recent Candidates</h2>
                            </div>
                            <div className="p-6">
                                {candidates.slice(0, 3).map((candidate) => (
                                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3 hover:bg-gray-100 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{candidate.name}</p>
                                                <p className="text-sm text-gray-600">{candidate.position}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewCandidate(candidate)}
                                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium"
                                        >
                                            View Profile
                                        </button>
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
                                            placeholder="Search candidates..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        Filter
                                    </button>
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
                                    {candidates.map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                                                        {candidate.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{candidate.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{candidate.position}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                                                            style={{ width: `${candidate.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-medium">{candidate.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewCandidate(candidate)}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleScheduleInterview(candidate.id)}
                                                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                                                        title="Schedule Interview"
                                                    >
                                                        <Calendar className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg"
                                                        title="Send Message"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
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
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900 mt-1">{selectedCandidate.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                        <p className="text-gray-900 mt-1">{selectedCandidate.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Experience</label>
                                        <p className="text-gray-900 mt-1">{selectedCandidate.experience}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Applied On</label>
                                        <p className="text-gray-900 mt-1">{selectedCandidate.applied}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-2 block">Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((skill: string) => (
                                            <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-2 block">Current Status</label>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium">
                                        {selectedCandidate.status}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleScheduleInterview(selectedCandidate.id)}
                                        className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Schedule Interview
                                    </button>
                                    <button
                                        onClick={() => {
                                            toast.success("Message sent to candidate!");
                                        }}
                                        className="flex-1 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TADashboard;
