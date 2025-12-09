import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { MetricsPreview } from "@/components/home/MetricsPreview";
import { CTASection } from "@/components/home/CTASection";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MetricsPreview />
        <CTASection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;