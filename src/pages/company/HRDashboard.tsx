import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users, UserPlus, Calendar, TrendingUp, ArrowLeft, Clock, Award, Briefcase,
    Plus, Search, Filter, FileText, CheckCircle, AlertCircle, X, Shield,
    Mail, Phone, MapPin, Edit, Trash2, Eye
} from "lucide-react";
import { toast } from "sonner";

const HRDashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'onboarding' | 'compliance'>('overview');
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const employees = [
        {
            id: 1,
            name: "John Smith",
            email: "john@company.com",
            phone: "+1 234-567-8901",
            department: "Engineering",
            position: "Senior Developer",
            status: "Active",
            hireDate: "2024-01-15",
            location: "San Francisco, CA",
            manager: "Jane Doe",
            performance: "Excellent"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@company.com",
            phone: "+1 234-567-8902",
            department: "Marketing",
            position: "Marketing Manager",
            status: "Active",
            hireDate: "2024-02-20",
            location: "New York, NY",
            manager: "Mike Wilson",
            performance: "Good"
        },
        {
            id: 3,
            name: "Michael Chen",
            email: "michael@company.com",
            phone: "+1 234-567-8903",
            department: "Sales",
            position: "Sales Executive",
            status: "On Leave",
            hireDate: "2023-11-10",
            location: "Chicago, IL",
            manager: "Lisa Brown",
            performance: "Good"
        },
    ];

    const onboardingTasks = [
        { id: 1, employee: "New Hire - Alice Williams", task: "Complete Background Check", status: "Pending", dueDate: "2024-02-10" },
        { id: 2, employee: "New Hire - Bob Anderson", task: "IT Equipment Setup", status: "In Progress", dueDate: "2024-02-08" },
        { id: 3, employee: "New Hire - Carol Martinez", task: "Sign Employment Contract", status: "Completed", dueDate: "2024-02-05" },
        { id: 4, employee: "New Hire - David Lee", task: "Orientation Schedule", status: "Pending", dueDate: "2024-02-12" },
    ];

    const complianceItems = [
        { id: 1, item: "Annual Compliance Training", employees: 145, completed: 132, dueDate: "2024-03-01", status: "On Track" },
        { id: 2, item: "Performance Reviews Q1", employees: 156, completed: 89, dueDate: "2024-03-15", status: "Behind" },
        { id: 3, item: "Benefits Enrollment", employees: 156, completed: 156, dueDate: "2024-01-31", status: "Completed" },
        { id: 4, item: "Policy Acknowledgment", employees: 156, completed: 142, dueDate: "2024-02-28", status: "On Track" },
    ];

    const upcomingEvents = [
        { id: 1, title: "Annual Performance Review", date: "2024-02-15", type: "Review", participants: 25 },
        { id: 2, title: "Team Building Event", date: "2024-02-18", type: "Event", participants: 50 },
        { id: 3, title: "HR Policy Training", date: "2024-02-22", type: "Training", participants: 30 },
        { id: 4, title: "New Hire Orientation", date: "2024-02-25", type: "Onboarding", participants: 8 },
    ];

    const stats = [
        { label: "Total Employees", value: 156, icon: Users, color: "text-amber-500", bg: "bg-amber-100", trend: "+8 this month" },
        { label: "New Hires (Month)", value: 8, icon: UserPlus, color: "text-green-500", bg: "bg-green-100", trend: "4 onboarding" },
        { label: "Leave Requests", value: 5, icon: Calendar, color: "text-blue-500", bg: "bg-blue-100", trend: "2 pending approval" },
        { label: "Performance Reviews", value: 12, icon: Award, color: "text-purple-500", bg: "bg-purple-100", trend: "Due this month" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/company/login');
    };

    const handleViewEmployee = (employee: any) => {
        setSelectedEmployee(employee);
        setShowEmployeeModal(true);
    };

    const handleAddEmployee = () => {
        navigate('/company/onboard-user');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        HR Management
                                    </h1>
                                    <p className="text-sm text-gray-600">Welcome, {currentUser.name || 'HR Manager'}</p>
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
                            { id: 'employees', label: 'Employees', icon: Users },
                            { id: 'onboarding', label: 'Onboarding', icon: UserPlus },
                            { id: 'compliance', label: 'Compliance', icon: Shield }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
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
                                        <p className="text-xs text-amber-600 font-medium">{stat.trend}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <button
                                onClick={handleAddEmployee}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all text-left"
                            >
                                <Plus className="w-12 h-12 text-amber-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Add Employee</h3>
                                <p className="text-gray-600 text-sm">Onboard a new team member</p>
                            </button>

                            <button
                                onClick={() => setActiveTab('employees')}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all text-left"
                            >
                                <Users className="w-12 h-12 text-orange-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Manage Employees</h3>
                                <p className="text-gray-600 text-sm">View and update employee records</p>
                            </button>

                            <button
                                onClick={() => setActiveTab('compliance')}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all text-left"
                            >
                                <Shield className="w-12 h-12 text-yellow-600 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Compliance</h3>
                                <p className="text-gray-600 text-sm">Track compliance and training</p>
                            </button>
                        </div>

                        {/* Events and Recent Employees */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Recent Employees */}
                            <div className="md:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Employees</h2>
                                </div>
                                <div className="p-6">
                                    {employees.map((employee) => (
                                        <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3 hover:bg-gray-100 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {employee.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{employee.name}</p>
                                                    <p className="text-sm text-gray-600">{employee.department} • {employee.position}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleViewEmployee(employee)}
                                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium"
                                            >
                                                View
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                                </div>
                                <div className="p-6 space-y-3">
                                    {upcomingEvents.slice(0, 3).map((event) => (
                                        <div key={event.id} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Clock className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                                                    <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded text-xs font-medium">
                                                        {event.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Employees Tab */}
                {activeTab === 'employees' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
                                    <p className="text-gray-600 text-sm mt-1">Manage all employee records</p>
                                </div>
                                <button
                                    onClick={handleAddEmployee}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Employee
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search employees..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {employees.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                                                        {employee.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{employee.name}</p>
                                                        <p className="text-xs text-gray-500">Joined {employee.hireDate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-2 text-gray-600">
                                                    <Briefcase className="w-4 h-4" />
                                                    {employee.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${employee.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewEmployee(employee)}
                                                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
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

                {/* Onboarding Tab */}
                {activeTab === 'onboarding' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Onboarding Workflow</h2>
                                    <p className="text-gray-600 text-sm mt-1">Track new hire onboarding progress</p>
                                </div>
                                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    New Onboarding
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid gap-4">
                                {onboardingTasks.map((task) => (
                                    <div key={task.id} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{task.employee}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${task.status === 'Completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : task.status === 'In Progress'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{task.task}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    Due: {task.dueDate}
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 font-medium">
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Compliance Tab */}
                {activeTab === 'compliance' && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/20">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Compliance Tracking</h2>
                            <p className="text-gray-600 text-sm mt-1">Monitor compliance requirements and training</p>
                        </div>

                        <div className="p-6">
                            <div className="grid gap-4">
                                {complianceItems.map((item) => {
                                    const completionRate = Math.round((item.completed / item.employees) * 100);
                                    return (
                                        <div key={item.id} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900">{item.item}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Completed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : item.status === 'On Track'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        {item.completed} of {item.employees} employees completed
                                                    </p>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                            <div
                                                                className={`h-3 rounded-full ${completionRate === 100
                                                                    ? 'bg-green-500'
                                                                    : completionRate >= 80
                                                                        ? 'bg-blue-500'
                                                                        : 'bg-yellow-500'
                                                                    }`}
                                                                style={{ width: `${completionRate}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-700">{completionRate}%</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        <Clock className="w-3 h-3 inline mr-1" />
                                                        Due: {item.dueDate}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Employee Detail Modal */}
            {showEmployeeModal && selectedEmployee && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedEmployee.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                                    <p className="text-gray-600">{selectedEmployee.position}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowEmployeeModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {selectedEmployee.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {selectedEmployee.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Department</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gray-400" />
                                            {selectedEmployee.department}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Location</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {selectedEmployee.location}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Hire Date</label>
                                        <p className="text-gray-900 mt-1">{selectedEmployee.hireDate}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Manager</label>
                                        <p className="text-gray-900 mt-1">{selectedEmployee.manager}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-2 block">Performance Rating</label>
                                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
                                        {selectedEmployee.performance}
                                    </span>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg flex items-center justify-center gap-2">
                                        <Edit className="w-5 h-5" />
                                        Edit Profile
                                    </button>
                                    <button className="flex-1 py-3 border-2 border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 flex items-center justify-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        View Documents
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

export default HRDashboard;
