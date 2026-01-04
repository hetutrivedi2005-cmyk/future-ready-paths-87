import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Sectors from "./pages/Sectors";
import Learning from "./pages/Learning";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Roadmaps from "./pages/Roadmaps";
import Contact from "./pages/Contact";
import SkillAssessment from "./pages/SkillAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProgress from "./pages/admin/AdminProgress";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AssessmentProvider>
        <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sectors" element={<Sectors />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:courseId" element={<CourseDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/roadmaps" element={<Roadmaps />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/skill-assessment" element={<SkillAssessment />} />
                <Route path="/assessment-results" element={<AssessmentResults />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/progress" element={<AdminProgress />} />
                <Route path="/admin/content" element={<AdminContent />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProgressProvider>
      </AssessmentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
