import { motion } from "framer-motion";
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye,
  Search,
  Filter,
  Plus,
  User,
  Clock,
  Award
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const categories = [
  { name: "All Topics", count: 1284, active: true },
  { name: "Crop Management", count: 342 },
  { name: "Pest Control", count: 218 },
  { name: "Irrigation", count: 156 },
  { name: "Market Trends", count: 189 },
  { name: "Equipment", count: 124 },
];

const discussions = [
  {
    id: 1,
    title: "Best organic methods for controlling aphids on tomatoes?",
    author: "FarmerJohn",
    category: "Pest Control",
    replies: 24,
    views: 342,
    likes: 18,
    time: "2 hours ago",
    isExpert: true,
  },
  {
    id: 2,
    title: "Experience with drip irrigation for rice paddies",
    author: "RiceMaster",
    category: "Irrigation",
    replies: 15,
    views: 198,
    likes: 12,
    time: "5 hours ago",
    isExpert: false,
  },
  {
    id: 3,
    title: "When to sell wheat - market timing strategies",
    author: "AgriTrader",
    category: "Market Trends",
    replies: 31,
    views: 456,
    likes: 28,
    time: "1 day ago",
    isExpert: true,
  },
  {
    id: 4,
    title: "Cover crops for soil health in tropical climates",
    author: "SoilScientist",
    category: "Crop Management",
    replies: 19,
    views: 267,
    likes: 22,
    time: "2 days ago",
    isExpert: true,
  },
];

const topContributors = [
  { name: "Dr. Sarah Green", posts: 156, badge: "Expert" },
  { name: "FarmerJohn", posts: 134, badge: "Veteran" },
  { name: "AgriTrader", posts: 98, badge: "Analyst" },
  { name: "CropMaster", posts: 87, badge: "Pioneer" },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
            <p className="text-muted-foreground">Connect with fellow farmers and share knowledge</p>
          </div>
          <Button variant="hero">
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>

            {/* Categories */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      cat.active 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-muted-foreground">{cat.count}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {contributor.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                    </div>
                    <span className="rounded-full bg-harvest/10 px-2 py-0.5 text-xs font-medium text-secondary">
                      {contributor.badge}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Discussions</CardTitle>
                  <CardDescription>Join the conversation with farmers worldwide</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg border border-border/50 p-4 transition-all hover:bg-muted/30 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {discussion.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {discussion.author}
                              {discussion.isExpert && (
                                <Award className="h-3 w-3 text-harvest" />
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {discussion.time}
                            </span>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                              {discussion.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.likes}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Community;