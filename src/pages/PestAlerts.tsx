import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bug,
  Camera,
  MapPin,
  AlertTriangle,
  Bell,
  Upload,
  Search,
  Filter,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface PestAlert {
  id: string;
  type: 'pest' | 'disease' | 'weather';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  date: Date;
  affectedCrops: string[];
  riskPercentage: number;
  recommendations: string[];
  status: 'active' | 'resolved';
}

interface PestProfile {
  name: string;
  scientificName: string;
  lifeCycle: string;
  damageSigns: string[];
  treatments: { organic: string[]; chemical: string[] };
  prevention: string[];
}

const sampleAlerts: PestAlert[] = [
  {
    id: '1',
    type: 'pest',
    title: 'Aphid Outbreak Detected',
    description: 'High concentration of aphids detected in wheat fields across northern regions.',
    severity: 'high',
    location: 'Punjab, India',
    date: new Date(),
    affectedCrops: ['Wheat', 'Barley'],
    riskPercentage: 75,
    recommendations: [
      'Apply neem oil spray immediately',
      'Introduce ladybird beetles as natural predators',
      'Monitor fields daily for next 7 days'
    ],
    status: 'active'
  },
  {
    id: '2',
    type: 'disease',
    title: 'Blight Risk Alert',
    description: 'Favorable conditions for late blight development in potato crops.',
    severity: 'medium',
    location: 'Uttar Pradesh, India',
    date: new Date(Date.now() - 86400000),
    affectedCrops: ['Potato', 'Tomato'],
    riskPercentage: 45,
    recommendations: [
      'Ensure proper field drainage',
      'Apply copper-based fungicide preventively',
      'Avoid overhead irrigation'
    ],
    status: 'active'
  }
];

const pestProfiles: PestProfile[] = [
  {
    name: 'Aphids',
    scientificName: 'Aphididae family',
    lifeCycle: 'Complete metamorphosis, 7-10 days per generation',
    damageSigns: ['Curled leaves', 'Sticky honeydew', 'Stunted growth', 'Yellowing leaves'],
    treatments: {
      organic: ['Neem oil spray', 'Insecticidal soap', 'Ladybird beetle introduction'],
      chemical: ['Imidacloprid', 'Acephate', 'Pyrethroids']
    },
    prevention: ['Companion planting with marigolds', 'Regular field monitoring', 'Crop rotation']
  }
];

const PestAlerts = () => {
  const [alerts, setAlerts] = useState<PestAlert[]>(sampleAlerts);
  const [selectedAlert, setSelectedAlert] = useState<PestAlert | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <X className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast({
        title: "Image Uploaded",
        description: "AI analysis in progress...",
      });
      // Simulate AI analysis
      setTimeout(() => {
        toast({
          title: "Analysis Complete",
          description: "Identified: Aphid infestation with 85% confidence. Recommendations sent.",
        });
      }, 2000);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pest & Disease Alerts</h1>
            <p className="text-muted-foreground">Real-time monitoring and AI-powered identification for your crops.</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Pest Identification</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Upload a photo of the affected plant</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-2"
                    />
                  </div>
                  {uploadedImage && (
                    <div className="text-sm text-green-600">
                      ✓ {uploadedImage.name} uploaded successfully
                    </div>
                  )}
                  <Button className="w-full" disabled={!uploadedImage}>
                    Analyze Image
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Urgent Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Urgent: Aphid outbreak in your area – 20% yield risk!</h3>
                  <p className="text-sm text-red-700">Act now: Apply neem oil spray and monitor fields daily.</p>
                </div>
                <Button size="sm" variant="destructive" className="ml-auto">
                  Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Alerts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
                <CardDescription>Current pest and disease threats in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="rounded-lg border p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full border ${getSeverityColor(alert.severity)}`}>
                            {getSeverityIcon(alert.severity)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{alert.title}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location}
                            </p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{alert.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{alert.date.toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {alert.riskPercentage}% risk
                        </span>
                      </div>
                      <Progress value={alert.riskPercentage} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Regional Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Regional Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive map showing outbreak areas</p>
                      <Button size="sm" className="mt-2">
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pest Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pest Profiles</CardTitle>
                  <CardDescription>Detailed information on common threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pestProfiles.map((pest, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-1">{pest.name}</h4>
                        <p className="text-xs text-muted-foreground italic mb-2">{pest.scientificName}</p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium">Life Cycle:</p>
                            <p className="text-xs text-muted-foreground">{pest.lifeCycle}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium">Damage Signs:</p>
                            <ul className="text-xs text-muted-foreground list-disc list-inside">
                              {pest.damageSigns.slice(0, 2).map((sign, i) => (
                                <li key={i}>{sign}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-2">
                          View Full Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Alert Details Modal */}
        {selectedAlert && (
          <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-full border ${getSeverityColor(selectedAlert.severity)}`}>
                    {getSeverityIcon(selectedAlert.severity)}
                  </div>
                  {selectedAlert.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Affected Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedCrops.map((crop, index) => (
                      <Badge key={index} variant="outline">{crop}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {selectedAlert.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Risk Level: {selectedAlert.riskPercentage}%
                  </div>
                  <Button onClick={() => setSelectedAlert(null)}>Close</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default PestAlerts;
