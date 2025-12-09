import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Bot, 
  TrendingUp, 
  Users, 
  Cloud, 
  Leaf,
  BarChart3,
  Camera,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Farm Dashboard",
    description: "Customizable widgets for yields, expenses, and soil health with real-time heatmaps and anomaly alerts.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Bot,
    title: "AI Crop Assistant",
    description: "Multilingual chatbot for instant advice on pests, fertilizers, and market trends with photo diagnosis.",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: TrendingUp,
    title: "Live Market Prices",
    description: "Real-time commodity trends with predictive analytics and regional price alerts.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Users,
    title: "Farmer Community",
    description: "Connect with fellow farmers, share insights, and get expert-moderated Q&A support.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Cloud,
    title: "Weather Intelligence",
    description: "Location-based forecasts with crop-specific rainfall impact predictions.",
    color: "bg-harvest/10 text-harvest",
  },
  {
    icon: Camera,
    title: "Pest Detection",
    description: "Upload leaf images for instant AI-powered pest and disease identification.",
    color: "bg-destructive/10 text-destructive",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <BarChart3 className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything You Need to{" "}
            <span className="text-gradient">Grow Smarter</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines cutting-edge AI with practical farming tools to help you maximize yields and minimize risks.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group h-full border-border/50 bg-gradient-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};