import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Wrench, Tractor, Hammer, ShoppingCart, Eye } from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  model: string;
  purchaseDate: string;
  lastMaintenance: string;
  status: 'active' | 'maintenance' | 'retired';
  location: string;
  notes: string;
}

const Equipment = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  const equipmentCategories = [
    {
      id: 1,
      name: "Tractors",
      icon: Tractor,
      description: "Heavy machinery for field preparation",
      count: 12
    },
    {
      id: 2,
      name: "Tools",
      icon: Hammer,
      description: "Hand tools and implements",
      count: 45
    },
    {
      id: 3,
      name: "Maintenance",
      icon: Wrench,
      description: "Equipment maintenance services",
      count: 8
    }
  ];

  const sampleEquipment: EquipmentItem[] = [
    {
      id: '1',
      name: 'John Deere 8R',
      category: 'Tractors',
      model: '8R 250',
      purchaseDate: '2022-03-15',
      lastMaintenance: '2024-01-10',
      status: 'active',
      location: 'Field A',
      notes: 'Regular maintenance schedule followed'
    },
    {
      id: '2',
      name: 'Cultivator Set',
      category: 'Tools',
      model: 'Heavy Duty',
      purchaseDate: '2023-06-20',
      lastMaintenance: '2024-02-05',
      status: 'active',
      location: 'Storage Shed',
      notes: 'Sharpened blades last month'
    }
  ];

  const filteredEquipment = selectedCategory === 'all'
    ? sampleEquipment
    : sampleEquipment.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewEquipment = (equipment: EquipmentItem) => {
    setSelectedEquipment(equipment);
  };

  const handleAddEquipment = () => {
    toast({
      title: "Equipment Added",
      description: "New equipment has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Farm Equipment</h1>
          <p className="text-lg text-gray-600">Manage and track your agricultural equipment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {equipmentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                    <Badge variant="secondary">{category.count} items</Badge>
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Equipment
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Equipment List */}
        {selectedCategory !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>{selectedCategory} Equipment</CardTitle>
                <CardDescription>Detailed list of your {selectedCategory.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEquipment.map((equipment) => (
                    <div key={equipment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{equipment.name}</h4>
                        <Badge className={getStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Model: {equipment.model}</div>
                        <div>Location: {equipment.location}</div>
                        <div>Purchase: {equipment.purchaseDate}</div>
                        <div>Last Maintenance: {equipment.lastMaintenance}</div>
                      </div>
                      <p className="text-sm mt-2">{equipment.notes}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewEquipment(equipment)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Add Equipment Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Card>
              <CardHeader>
                <CardTitle>Add New Equipment</CardTitle>
                <CardDescription>Register a new piece of equipment to your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full md:w-auto">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add Equipment
                </Button>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Equipment Name</Label>
                <Input id="name" placeholder="e.g., John Deere Tractor" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tractors">Tractors</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="e.g., 8R 250" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Field A" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
              <Button onClick={handleAddEquipment} className="w-full">
                Add Equipment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Equipment Details Modal */}
        {selectedEquipment && (
          <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedEquipment.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.category}</p>
                  </div>
                  <div>
                    <Label>Model</Label>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.model}</p>
                  </div>
                  <div>
                    <Label>Purchase Date</Label>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.purchaseDate}</p>
                  </div>
                  <div>
                    <Label>Last Maintenance</Label>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.lastMaintenance}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedEquipment.status)}>
                      {selectedEquipment.status}
                    </Badge>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="text-sm text-muted-foreground">{selectedEquipment.location}</p>
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedEquipment.notes}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Schedule Maintenance</Button>
                  <Button onClick={() => setSelectedEquipment(null)}>Close</Button>
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

export default Equipment;
