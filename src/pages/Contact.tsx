import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "24/7 agricultural support",
    value: "+91-1800-FARM-HELP",
    color: "text-blue-600"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    value: "support@farmwisehub.com",
    color: "text-green-600"
  },
  {
    icon: MapPin,
    title: "Headquarters",
    description: "Visit our main office",
    value: "New Delhi, India",
    color: "text-purple-600"
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "When we're available",
    value: "Mon-Fri: 9AM-6PM IST",
    color: "text-orange-600"
  }
];

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Agronomist",
    email: "rajesh.kumar@farmwisehub.com",
    specialization: "Crop Science & Soil Health"
  },
  {
    name: "Priya Sharma",
    role: "Technical Support Lead",
    email: "priya.sharma@farmwisehub.com",
    specialization: "Digital Farming Solutions"
  },
  {
    name: "Amit Singh",
    role: "Regional Manager",
    email: "amit.singh@farmwisehub.com",
    specialization: "North India Operations"
  }
];

const faqs = [
  {
    question: "How do I get started with FarmWise Hub?",
    answer: "Simply create a free account and explore our dashboard. We offer guided tutorials and 24/7 support to help you get started."
  },
  {
    question: "What regions do you support?",
    answer: "We currently support farmers across India with region-specific recommendations and local market data."
  },
  {
    question: "Is the platform free to use?",
    answer: "Yes, our basic features are completely free. Premium features are available for enhanced functionality."
  },
  {
    question: "How accurate are the pest and disease predictions?",
    answer: "Our AI models are trained on extensive agricultural data and provide 85-95% accuracy based on current conditions."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our expert team. We're here to help you succeed in your farming journey.
            </p>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <info.icon className={`mx-auto h-12 w-12 ${info.color} mb-4`} />
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                    <p className="font-medium">{info.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Pricing</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Meet Our Team
                </CardTitle>
                <CardDescription>
                  Connect directly with our agricultural experts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <span className="font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                        <p className="text-xs text-muted-foreground mb-2">{member.specialization}</p>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected and get the latest farming insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Facebook, name: 'Facebook', followers: '25K' },
                    { icon: Twitter, name: 'Twitter', followers: '12K' },
                    { icon: Instagram, name: 'Instagram', followers: '18K' },
                    { icon: Youtube, name: 'YouTube', followers: '35K' }
                  ].map((social, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <social.icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium text-sm">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.followers} followers</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Quick answers to common questions about FarmWise Hub.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8">
              <Globe className="mx-auto h-16 w-16 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Farm?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of farmers who are already using FarmWise Hub to optimize their operations,
                increase yields, and build sustainable farming practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Schedule a Call
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

export default Contact;
