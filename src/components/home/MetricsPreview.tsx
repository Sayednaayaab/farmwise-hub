import { motion } from "framer-motion";
import { TrendingUp, Droplets, Thermometer, Sprout, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    title: "Crop Yield",
    value: "12.4t",
    change: "+8.2%",
    trend: "up",
    icon: Sprout,
    color: "text-primary",
    bgColor: "bg-primary/10",
    progress: 78,
  },
  {
    title: "Soil Moisture",
    value: "67%",
    change: "-2.1%",
    trend: "down",
    icon: Droplets,
    color: "text-sky",
    bgColor: "bg-sky/10",
    progress: 67,
  },
  {
    title: "Temperature",
    value: "28°C",
    change: "+1.5°",
    trend: "up",
    icon: Thermometer,
    color: "text-warning",
    bgColor: "bg-warning/10",
    progress: 56,
  },
  {
    title: "Market Value",
    value: "$45.2K",
    change: "+12.4%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
    progress: 85,
  },
];

export const MetricsPreview = () => {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Real-Time Farm <span className="text-gradient">Analytics</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Monitor your farm's performance with live data and intelligent insights.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${metric.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {metric.change}
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-1 text-2xl font-bold">{metric.value}</CardTitle>
                  <p className="mb-3 text-sm text-muted-foreground">{metric.title}</p>
                  <Progress value={metric.progress} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};