
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker";
import Meditation from "./pages/Meditation";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Layout from "./components/Layout";
import { MeditationProvider } from "./contexts/MeditationContext";

// Import resource detail pages
import ThoughtRecord from "./pages/resources/ThoughtRecord";
import ReframingExercise from "./pages/resources/ReframingExercise";
import SleepJournal from "./pages/resources/SleepJournal";
import SafetyPlan from "./pages/resources/SafetyPlan";
import ResourceDetail from "./pages/resources/topic/ResourceDetail";

// Import community detail pages
import DoctorChat from "./pages/community/DoctorChat";
import DoctorProfile from "./pages/community/DoctorProfile";
import SupportGroup from "./pages/community/SupportGroup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MeditationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="chat" element={<Chat />} />
              <Route path="mood-tracker" element={<MoodTracker />} />
              <Route path="meditation" element={<Meditation />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resources/thought-record" element={<ThoughtRecord />} />
              <Route path="resources/reframing-exercise" element={<ReframingExercise />} />
              <Route path="resources/sleep-journal" element={<SleepJournal />} />
              <Route path="resources/safety-plan" element={<SafetyPlan />} />
              <Route path="resources/topic/:topicSlug" element={<ResourceDetail />} />
              <Route path="community" element={<Community />} />
              <Route path="community/chat" element={<DoctorChat />} />
              <Route path="community/doctor/:doctorId" element={<DoctorProfile />} />
              <Route path="community/group/:groupId" element={<SupportGroup />} />
              <Route path="profile" element={<Profile />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MeditationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
