import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Bell
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const commodities = [
  { name: "Rice", price: 420, change: 2.3, trend: "up", unit: "/ton", volume: "12.4K" },
  { name: "Wheat", price: 285, change: -0.5, trend: "down", unit: "/ton", volume: "8.7K" },
  { name: "Corn", price: 195, change: 1.8, trend: "up", unit: "/ton", volume: "15.2K" },
  { name: "Soybeans", price: 540, change: 3.1, trend: "up", unit: "/ton", volume: "6.9K" },
  { name: "Cotton", price: 1850, change: -1.2, trend: "down", unit: "/bale", volume: "4.3K" },
  { name: "Coffee", price: 5200, change: 4.5, trend: "up", unit: "/ton", volume: "2.1K" },
];

const marketNews = [
  { title: "Global wheat supply tightens amid export restrictions", time: "2h ago", impact: "bullish" },
  { title: "Rice futures hit 6-month high on strong demand", time: "5h ago", impact: "bullish" },
  { title: "Corn production estimates revised upward", time: "1d ago", impact: "bearish" },
  { title: "Soybean exports surge in Q4 2025", time: "1d ago", impact: "bullish" },
];

const Market = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Market Hub</h1>
          <p className="text-muted-foreground">Real-time commodity prices and market trends</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search commodities..." className="pl-10" />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => alert('Filters applied!')}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="hero" onClick={() => alert('Alerts set!')}>
              <Bell className="mr-2 h-4 w-4" />
              Set Alerts
            </Button>
          </div>
        </div>

        {/* Price Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {commodities.map((commodity, index) => (
            <motion.div
              key={commodity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{commodity.name}</h3>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${
                      commodity.trend === "up" 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {commodity.trend === "up" ? "+" : ""}{commodity.change}%
                      {commodity.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">${commodity.price}</p>
                    <p className="text-sm text-muted-foreground">{commodity.unit}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="text-sm font-medium">{commodity.volume}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Market News</CardTitle>
              <CardDescription>Latest updates affecting commodity prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketNews.map((news, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg bg-muted/30 p-4">
                    <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                      news.impact === "bullish" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {news.impact === "bullish" ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{news.title}</p>
                      <p className="text-sm text-muted-foreground">{news.time}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                      news.impact === "bullish" 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {news.impact}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Market;