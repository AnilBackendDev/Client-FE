import { useNavigate } from "react-router-dom";
import { Users, Plus, Settings, ArrowLeft, UserPlus } from "lucide-react";

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const companyUsers = [
        { name: "John Doe", email: "john@company.com", role: "TA", status: "Active" },
        { name: "Sarah Smith", email: "sarah@company.com", role: "HR Manager", status: "Active" },
        { name: "Mike Johnson", email: "mike@company.com", role: "TA", status: "Active" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/company/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Company Dashboard
                            </h1>
                            <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <Users className="w-12 h-12 text-blue-500 mb-4" />
                        <p className="text-gray-600 text-sm">Total Users</p>
                        <p className="text-3xl font-bold">{companyUsers.length}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <UserPlus className="w-12 h-12 text-green-500 mb-4" />
                        <p className="text-gray-600 text-sm">Active Users</p>
                        <p className="text-3xl font-bold">{companyUsers.filter(u => u.status === 'Active').length}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <Settings className="w-12 h-12 text-purple-500 mb-4" />
                        <p className="text-gray-600 text-sm">Company ID</p>
                        <p className="text-xl font-bold">{currentUser.companyId || 'COMP001'}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Company Users</h2>
                    <button
                        onClick={() => navigate('/company/users/new')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add User
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {companyUsers.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{user.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
