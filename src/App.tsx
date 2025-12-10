import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Community from "./pages/Community";
import PlantingCalendar from "./pages/PlantingCalendar";
import PestAlerts from "./pages/PestAlerts";
import Equipment from "./pages/Equipment";
import KnowledgeBase from "./pages/KnowledgeBase";
import SustainablePractices from "./pages/SustainablePractices";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market" element={<Market />} />
          <Route path="/community" element={<Community />} />
          <Route path="/planting-calendar" element={<PlantingCalendar />} />
          <Route path="/pest-alerts" element={<PestAlerts />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/sustainable-practices" element={<SustainablePractices />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
