import { motion } from "framer-motion";
import { ArrowRight, Leaf, TrendingUp, Cloud, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-harvest/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              Smart Farming for Modern Agriculture
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Cultivate Success with{" "}
              <span className="text-gradient">AI-Powered</span>{" "}
              Farming
            </h1>
            
            <p className="mb-8 max-w-xl text-lg text-muted-foreground lg:text-xl">
              Transform your agricultural operations with real-time analytics, pest detection, 
              market insights, and personalized AI assistance—all in one platform.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={() => alert('Starting free trial...')}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="heroOutline" size="xl" onClick={() => alert('Watching demo...')}>
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/50 pt-8">
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">50K+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">30%</div>
                <div className="text-sm text-muted-foreground">Yield Increase</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">95%</div>
                <div className="text-sm text-muted-foreground">Pest Detection</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="Thriving agricultural fields with modern farming technology"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -left-4 top-1/4 hidden rounded-xl bg-card p-4 shadow-lg md:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Yield Up</div>
                  <div className="text-lg font-bold text-success">+24.5%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -right-4 bottom-1/4 hidden rounded-xl bg-card p-4 shadow-lg md:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky/10">
                  <Cloud className="h-5 w-5 text-sky" />
                </div>
                <div>
                  <div className="text-sm font-medium">Weather</div>
                  <div className="text-lg font-bold">Sunny 28°C</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 rounded-xl bg-card p-4 shadow-lg md:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-harvest/20">
                  <Bot className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">AI Assistant</div>
                  <div className="text-xs text-muted-foreground">Ready to help</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};