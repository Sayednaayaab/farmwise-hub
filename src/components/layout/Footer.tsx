import { Link } from "react-router-dom";
import { Sprout, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-md">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AgriSmart</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Empowering farmers with AI-driven insights, real-time market data, and sustainable practices for modern agriculture.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="max-w-[220px]" />
                <Button variant="hero" size="sm">
                  <Mail className="mr-1 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">Dashboard</Link></li>
              <li><Link to="/tools/calendar" className="text-muted-foreground transition-colors hover:text-primary">Crop Tools</Link></li>
              <li><Link to="/market" className="text-muted-foreground transition-colors hover:text-primary">Market Hub</Link></li>
              <li><Link to="/community" className="text-muted-foreground transition-colors hover:text-primary">Community</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/resources/knowledge" className="text-muted-foreground transition-colors hover:text-primary">Knowledge Base</Link></li>
              <li><Link to="/resources/sustainable" className="text-muted-foreground transition-colors hover:text-primary">Sustainability</Link></li>
              <li><Link to="/blog" className="text-muted-foreground transition-colors hover:text-primary">Blog</Link></li>
              <li><Link to="/help" className="text-muted-foreground transition-colors hover:text-primary">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgriSmart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};