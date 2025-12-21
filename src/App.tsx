import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Sectors from "./pages/Sectors";
import Learning from "./pages/Learning";
import Roadmaps from "./pages/Roadmaps";
import Contact from "./pages/Contact";
import SkillAssessment from "./pages/SkillAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skill-assessment" element={<SkillAssessment />} />
              <Route path="/assessment-results" element={<AssessmentResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProgressProvider>
    </AssessmentProvider>
  </QueryClientProvider>
);

export default App;
