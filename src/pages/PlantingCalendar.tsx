import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  MapPin,
  Droplets,
  Thermometer,
  Download,
  Share,
  Bell,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface PlantingSchedule {
  id: string;
  crop: string;
  field: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'planted' | 'growing' | 'harvesting' | 'completed';
  progress: number;
  notes: string;
}

const sampleSchedules: PlantingSchedule[] = [
  {
    id: '1',
    crop: 'Rice',
    field: 'A1-A3',
    startDate: new Date(2024, 6, 15),
    endDate: new Date(2024, 9, 15),
    status: 'growing',
    progress: 65,
    notes: 'Monsoon season planting'
  },
  {
    id: '2',
    crop: 'Wheat',
    field: 'B1-B2',
    startDate: new Date(2024, 10, 1),
    endDate: new Date(2025, 3, 15),
    status: 'planned',
    progress: 0,
    notes: 'Winter crop'
  }
];

const PlantingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<PlantingSchedule[]>(sampleSchedules);
  const [userLocation, setUserLocation] = useState('Delhi, India');
  const [farmSize, setFarmSize] = useState('5 acres');
  const [climateZone, setClimateZone] = useState('Tropical Monsoon');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'planted': return 'bg-yellow-100 text-yellow-800';
      case 'growing': return 'bg-green-100 text-green-800';
      case 'harvesting': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCalendarCellColor = (date: Date) => {
    const daySchedules = schedules.filter(schedule =>
      date >= schedule.startDate && date <= schedule.endDate
    );

    if (daySchedules.length === 0) return 'bg-white';

    const hasGrowing = daySchedules.some(s => s.status === 'growing');
    const hasPlanned = daySchedules.some(s => s.status === 'planned');
    const hasHarvesting = daySchedules.some(s => s.status === 'harvesting');

    if (hasGrowing) return 'bg-green-200';
    if (hasHarvesting) return 'bg-orange-200';
    if (hasPlanned) return 'bg-blue-200';
    return 'bg-yellow-200';
  };

  const handleExport = (format: 'pdf' | 'ics') => {
    toast({
      title: "Export Started",
      description: `Exporting calendar as ${format.toUpperCase()}...`,
    });
  };

  const handleAddSchedule = () => {
    // Implementation for adding new schedule
    setIsAddDialogOpen(false);
    toast({
      title: "Schedule Added",
      description: "New planting schedule has been added successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planting Calendar</h1>
            <p className="text-muted-foreground">Plan your crops with seasonal schedules and reminders.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport('ics')}>
              <Share className="mr-2 h-4 w-4" />
              Export ICS
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Planting Schedule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="field">Field</Label>
                    <Input id="field" placeholder="e.g., A1-A3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Calendar mode="single" />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Calendar mode="single" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes..." />
                  </div>
                  <Button onClick={handleAddSchedule} className="w-full">
                    Add Schedule
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Personalized Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Farm Profile
              </CardTitle>
              <CardDescription>Customize schedules based on your location and farm details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="farmSize">Farm Size</Label>
                  <Input
                    id="farmSize"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="climate">Climate Zone</Label>
                  <Select value={climateZone} onValueChange={setClimateZone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tropical Monsoon">Tropical Monsoon</SelectItem>
                      <SelectItem value="Temperate">Temperate</SelectItem>
                      <SelectItem value="Arid">Arid</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Planting Calendar
                </CardTitle>
                <CardDescription>Interactive calendar with color-coded planting schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    scheduled: (date) => schedules.some(schedule =>
                      date >= schedule.startDate && date <= schedule.endDate
                    )
                  }}
                  modifiersStyles={{
                    scheduled: { backgroundColor: '#dbeafe', color: '#1e40af' }
                  }}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Planned</Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Planted</Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Growing</Badge>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">Harvesting</Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Schedules & Reminders */}
          <div className="space-y-6">
            {/* Current Schedules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Active Schedules</CardTitle>
                  <CardDescription>Your current planting activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{schedule.crop}</h4>
                          <Badge className={getStatusColor(schedule.status)}>
                            {schedule.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Field {schedule.field}</p>
                        <Progress value={schedule.progress} className="mb-2" />
                        <p className="text-xs text-muted-foreground">{schedule.progress}% complete</p>
                        <p className="text-xs text-muted-foreground mt-1">{schedule.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reminders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-warning" />
                    Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-green-50 p-3 border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Plant today for tomorrow's harvest!</span>
                      </div>
                      <p className="text-xs text-green-700">Rice planting window opens in 3 days</p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-3 border border-yellow-200">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Prepare soil for wheat</span>
                      </div>
                      <p className="text-xs text-yellow-700">Optimal sowing date: Nov 15</p>
                    </div>
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

export default PlantingCalendar;
