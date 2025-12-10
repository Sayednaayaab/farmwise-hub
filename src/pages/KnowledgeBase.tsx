import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Play,
  FileText,
  Tag,
  Clock,
  User,
  Star,
  ChevronRight,
  Book,
  Video,
  Globe
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Article {
  id: string;
  title: string;
  description: string;
  category: 'beginners' | 'advanced' | 'regional';
  author: string;
  readTime: number;
  rating: number;
  downloads: number;
  tags: string[];
  region?: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  category: 'beginners' | 'advanced' | 'regional';
  author: string;
  duration: number;
  rating: number;
  views: number;
  tags: string[];
  region?: string;
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Crop Rotation: Maximizing Soil Health',
    description: 'Learn the fundamentals of crop rotation and how it can improve your farm\'s productivity.',
    category: 'beginners',
    author: 'Dr. Rajesh Kumar',
    readTime: 8,
    rating: 4.5,
    downloads: 1250,
    tags: ['soil health', 'crop rotation', 'sustainability']
  },
  {
    id: '2',
    title: 'Advanced Irrigation Techniques for Water Conservation',
    description: 'Explore modern irrigation methods that can save up to 40% water while maintaining crop yield.',
    category: 'advanced',
    author: 'Prof. Meera Singh',
    readTime: 15,
    rating: 4.8,
    downloads: 890,
    tags: ['irrigation', 'water conservation', 'technology']
  },
  {
    id: '3',
    title: 'Monsoon Farming in India: Best Practices',
    description: 'Regional guide for farmers in monsoon-prone areas of India.',
    category: 'regional',
    author: 'Regional Agronomist Team',
    readTime: 12,
    rating: 4.3,
    downloads: 2100,
    tags: ['monsoon', 'india', 'regional farming'],
    region: 'India'
  }
];

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'How to Identify Common Crop Diseases',
    description: 'Visual guide to recognizing and treating common crop diseases.',
    category: 'beginners',
    author: 'Dr. Priya Sharma',
    duration: 25,
    rating: 4.6,
    views: 15400,
    tags: ['disease identification', 'crop health', 'visual guide']
  },
  {
    id: '2',
    title: 'Precision Farming with Drones',
    description: 'Advanced techniques for using drones in modern agriculture.',
    category: 'advanced',
    author: 'Tech Farm Solutions',
    duration: 35,
    rating: 4.9,
    views: 8900,
    tags: ['drones', 'precision farming', 'technology']
  }
];

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedContent, setSelectedContent] = useState<Article | Video | null>(null);

  const filteredArticles = sampleArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVideos = sampleVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beginners': return <Book className="h-4 w-4" />;
      case 'advanced': return <Star className="h-4 w-4" />;
      case 'regional': return <Globe className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginners': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'regional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Base</h1>
            <p className="text-muted-foreground">Discover expert articles, videos, and guides to enhance your farming knowledge.</p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles, videos, guides..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beginners">Beginners</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Articles ({filteredArticles.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Videos ({filteredVideos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Badge className={`${getCategoryColor(article.category)} flex items-center gap-1`}>
                            {getCategoryIcon(article.category)}
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {article.rating}
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime} min
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {article.downloads} downloads
                          </div>
                          <Button size="sm" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Badge className={`${getCategoryColor(video.category)} flex items-center gap-1`}>
                            {getCategoryIcon(video.category)}
                            {video.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {video.rating}
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {video.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration} min
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {video.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {video.views.toLocaleString()} views
                          </div>
                          <Button size="sm" className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            Watch
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Reading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Your Learning Progress
              </CardTitle>
              <CardDescription>Track your progress through our knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Articles Read</span>
                    <span>12 / 25</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Videos Watched</span>
                    <span>8 / 15</span>
                  </div>
                  <Progress value={53} className="h-2" />
                </div>
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Keep learning! You're making great progress.
                  </p>
                </div>
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

export default KnowledgeBase;
