import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Calculator,
  TrendingUp,
  CheckCircle,
  Play,
  BookOpen,
  Target,
  Award,
  BarChart3,
  Droplets,
  Recycle,
  Zap,
  Users,
  Star,
  Plus
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface CaseStudy {
  id: string;
  title: string;
  farmer: string;
  location: string;
  practice: string;
  results: string;
  image: string;
  impact: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: string;
  deadline: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'From Conventional to Organic: A Success Story',
    farmer: 'Rajesh Patel',
    location: 'Gujarat, India',
    practice: 'No-till farming with organic inputs',
    results: '30% increase in yields, 40% reduction in input costs, improved soil health',
    image: '/placeholder-farm.jpg',
    impact: 85
  },
  {
    id: '2',
    title: 'Water Conservation Revolution',
    farmer: 'Priya Sharma',
    location: 'Rajasthan, India',
    practice: 'Drip irrigation and rainwater harvesting',
    results: '60% water savings, 25% yield increase, drought resilience',
    image: '/placeholder-farm.jpg',
    impact: 92
  }
];

const SustainablePractices = () => {
  const [selectedPractice, setSelectedPractice] = useState<string>('rotation');
  const [farmSize, setFarmSize] = useState<number[]>([5]);
  const [waterUsage, setWaterUsage] = useState<number[]>([1000]);
  const [carbonFootprint, setCarbonFootprint] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Reduce Water Usage',
      description: 'Implement efficient irrigation systems',
      progress: 65,
      target: '30% reduction',
      deadline: 'Dec 2024'
    },
    {
      id: '2',
      title: 'Adopt Organic Practices',
      description: 'Transition to organic farming methods',
      progress: 40,
      target: '50% organic crops',
      deadline: 'Mar 2025'
    }
  ]);

  const calculateCarbonFootprint = () => {
    // Simple calculation based on farm size and practices
    const baseFootprint = farmSize[0] * 100; // tons CO2 per acre per year
    const waterFactor = waterUsage[0] * 0.001; // water usage impact
    const practiceReduction = selectedPractice === 'organic' ? 0.3 : selectedPractice === 'conservation' ? 0.2 : 0.1;
    setCarbonFootprint(baseFootprint + waterFactor - (baseFootprint * practiceReduction));
  };

  const getPracticeIcon = (practice: string) => {
    switch (practice) {
      case 'rotation': return <Recycle className="h-6 w-6" />;
      case 'conservation': return <Droplets className="h-6 w-6" />;
      case 'organic': return <Leaf className="h-6 w-6" />;
      case 'renewable': return <Zap className="h-6 w-6" />;
      default: return <Target className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Sustainable Practices</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover actionable guides and tools for sustainable farming. Join the green revolution and build a thriving future for your farm.
            </p>
          </motion.div>
        </div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Leaf className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <blockquote className="text-xl font-medium text-foreground mb-2">
                "Sustainable today, thriving tomorrow – Join the green revolution!"
              </blockquote>
              <p className="text-muted-foreground">Every small step towards sustainability creates a lasting impact</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Carbon Calculator</TabsTrigger>
              <TabsTrigger value="simulator">Soil Simulator</TabsTrigger>
              <TabsTrigger value="checklist">Biodiversity Checklist</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Carbon Footprint Calculator
                  </CardTitle>
                  <CardDescription>Calculate your farm's carbon footprint and discover reduction strategies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="farmSize">Farm Size (acres)</Label>
                      <Slider
                        value={farmSize}
                        onValueChange={setFarmSize}
                        max={100}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="text-sm text-muted-foreground mt-1">{farmSize[0]} acres</div>
                    </div>
                    <div>
                      <Label htmlFor="waterUsage">Annual Water Usage (liters)</Label>
                      <Slider
                        value={waterUsage}
                        onValueChange={setWaterUsage}
                        max={10000}
                        min={100}
                        step={100}
                        className="mt-2"
                      />
                      <div className="text-sm text-muted-foreground mt-1">{waterUsage[0].toLocaleString()} liters</div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="practice">Current Farming Practice</Label>
                    <Select value={selectedPractice} onValueChange={setSelectedPractice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conventional">Conventional</SelectItem>
                        <SelectItem value="conservation">Conservation</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="regenerative">Regenerative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={calculateCarbonFootprint} className="w-full">
                    Calculate Footprint
                  </Button>
                  {carbonFootprint > 0 && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{carbonFootprint.toFixed(1)} tons CO₂/year</div>
                      <p className="text-sm text-muted-foreground">Your estimated annual carbon footprint</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulator" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Soil Regeneration Simulator
                  </CardTitle>
                  <CardDescription>See how different practices affect soil health over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Soil Organic Matter</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Water Retention</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Microbial Activity</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Biodiversity Checklist
                  </CardTitle>
                  <CardDescription>Track your progress in promoting farm biodiversity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: 'Plant native hedgerows', completed: true },
                      { item: 'Create wildlife habitats', completed: true },
                      { item: 'Use companion planting', completed: false },
                      { item: 'Maintain natural water sources', completed: true },
                      { item: 'Avoid chemical pesticides', completed: false }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className={`h-5 w-5 ${item.completed ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={item.completed ? 'line-through text-muted-foreground' : ''}>{item.item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Actionable Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Actionable Guides</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Crop Rotation Planner', icon: Recycle, description: 'Plan your crop rotations for optimal soil health' },
              { title: 'Water Conservation', icon: Droplets, description: 'Techniques to reduce water usage by 40%' },
              { title: 'Organic Pest Control', icon: Leaf, description: 'Natural alternatives to chemical pesticides' },
              { title: 'Renewable Energy', icon: Zap, description: 'Solar and wind solutions for farms' }
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <guide.icon className="mx-auto h-12 w-12 text-green-600 mb-4" />
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                    <Button size="sm" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Guide
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {study.impact}% Impact
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{study.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>{study.farmer}</strong> • {study.location}
                    </p>
                    <p className="text-sm mb-4">{study.results}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{study.practice}</Badge>
                      <Button size="sm" variant="outline">
                        Read Full Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Sustainability Goals
              </CardTitle>
              <CardDescription>Track your progress towards sustainable farming</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <Badge variant="outline">{goal.deadline}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={goal.progress} className="flex-1" />
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Target: {goal.target}</p>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
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

export default SustainablePractices;
