import { motion } from "framer-motion";
import { 
  Sprout, 
  Droplets, 
  Thermometer, 
  TrendingUp,
  Cloud,
  Bug,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const statsCards = [
  {
    title: "Total Yield",
    value: "12.4 tons",
    change: "+8.2%",
    trend: "up",
    icon: Sprout,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Soil Moisture",
    value: "67%",
    change: "-2.1%",
    trend: "down",
    icon: Droplets,
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
  {
    title: "Temperature",
    value: "28°C",
    change: "+1.5°",
    trend: "up",
    icon: Thermometer,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Revenue",
    value: "$45,200",
    change: "+12.4%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const recentAlerts = [
  { type: "weather", message: "Rain expected tomorrow afternoon", time: "2h ago", severity: "info" },
  { type: "pest", message: "Aphid activity detected in Field B2", time: "5h ago", severity: "warning" },
  { type: "market", message: "Wheat prices up 3.2% this week", time: "1d ago", severity: "success" },
];

const upcomingTasks = [
  { task: "Irrigate Field A1", due: "Today", status: "pending" },
  { task: "Apply fertilizer - Zone 3", due: "Tomorrow", status: "scheduled" },
  { task: "Harvest soybeans", due: "In 3 days", status: "scheduled" },
  { task: "Equipment maintenance", due: "In 5 days", status: "scheduled" },
];

const cropProgress = [
  { crop: "Wheat", field: "A1-A3", progress: 85, status: "Maturing" },
  { crop: "Rice", field: "B1-B4", progress: 62, status: "Growing" },
  { crop: "Corn", field: "C1-C2", progress: 45, status: "Vegetative" },
  { crop: "Soybeans", field: "D1", progress: 92, status: "Ready" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your farm overview.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Dec 9, 2025
            </Button>
            <Button variant="hero" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              3 Alerts
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {stat.change}
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Crop Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Crop Progress</CardTitle>
                  <CardDescription>Track your crops' growth stages</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cropProgress.map((crop) => (
                    <div key={crop.crop} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Sprout className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{crop.crop}</p>
                            <p className="text-xs text-muted-foreground">Field {crop.field}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{crop.progress}%</p>
                          <p className="text-xs text-muted-foreground">{crop.status}</p>
                        </div>
                      </div>
                      <Progress value={crop.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alerts & Tasks */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-warning" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`mt-0.5 h-2 w-2 rounded-full ${
                          alert.severity === "warning" ? "bg-warning" : 
                          alert.severity === "success" ? "bg-success" : "bg-sky"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-sm font-medium">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.due}</p>
                        </div>
                        <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                          task.status === "pending" 
                            ? "bg-warning/10 text-warning" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {task.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Dashboard;