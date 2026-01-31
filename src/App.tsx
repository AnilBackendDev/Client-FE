import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CompanyOnboarding from "./pages/admin/CompanyOnboarding";
import LeadershipDashboard from "./pages/admin/LeadershipDashboard";

// Company Pages
import CompanyLogin from "./pages/company/CompanyLogin";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import UserOnboarding from "./pages/company/UserOnboarding";
import TADashboard from "./pages/company/TADashboard";
import HRDashboard from "./pages/company/HRDashboard";
import HRMSLogin from "./pages/company/HRMSLogin";
import TALogin from "./pages/company/TALogin";
import CEOLogin from "./pages/company/CEOLogin";
import CTOLogin from "./pages/company/CTOLogin";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterOnboarding from "./pages/recruiter/RecruiterOnboarding";

// Common
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    {/* Root redirects to admin login */}
                    <Route path="/" element={<Navigate to="/admin/login" replace />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/onboard-company" element={<CompanyOnboarding />} />
                    <Route path="/admin/leadership" element={<LeadershipDashboard />} />

                    {/* Company Routes - Unified Login for All Roles */}
                    <Route path="/company/login" element={<CompanyLogin />} />
                    <Route path="/hrms/login" element={<HRMSLogin />} />
                    <Route path="/ta/login" element={<TALogin />} />
                    <Route path="/ceo/login" element={<CEOLogin />} />
                    <Route path="/cto/login" element={<CTOLogin />} />

                    <Route path="/company/dashboard" element={<CompanyDashboard />} />
                    <Route path="/company/onboard-user" element={<UserOnboarding />} />
                    <Route path="/company/ta-dashboard" element={<TADashboard />} />
                    <Route path="/company/hr-dashboard" element={<HRDashboard />} />
                    <Route path="/company/leadership-dashboard" element={<LeadershipDashboard />} />

                    {/* Recruiter Routes */}
                    <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                    <Route path="/recruiter/onboard" element={<RecruiterOnboarding />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
