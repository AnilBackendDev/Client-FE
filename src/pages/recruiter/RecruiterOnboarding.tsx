import { useNavigate } from "react-router-dom";
import { Briefcase, Users, Target, TrendingUp } from "lucide-react";

const RecruiterOnboarding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/recruiter/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to AI Recruiter
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Your intelligent hiring assistant powered by AI
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Users, title: "Smart Matching", desc: "AI-powered candidate screening" },
              { icon: Target, title: "Quick Hiring", desc: "Reduce time-to-hire by 70%" },
              { icon: TrendingUp, title: "Data Insights", desc: "Real-time analytics dashboard" }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border">
                <feature.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleGetStarted}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterOnboarding;
