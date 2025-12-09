import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  Menu, 
  X, 
  ChevronDown,
  LayoutDashboard,
  Leaf,
  TrendingUp,
  Cloud,
  BookOpen,
  Users,
  Phone,
  Tractor,
  Bug,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const toolsItems = [
  { icon: Calendar, label: "Planting Calendar", href: "/tools/calendar", desc: "Plan your crop cycles" },
  { icon: Bug, label: "Pest Alerts", href: "/tools/pests", desc: "Image-based pest detection" },
  { icon: Tractor, label: "Equipment", href: "/tools/equipment", desc: "Track farm machinery" },
];

const resourcesItems = [
  { icon: BookOpen, label: "Knowledge Base", href: "/resources/knowledge", desc: "Articles & tutorials" },
  { icon: Leaf, label: "Sustainable Practices", href: "/resources/sustainable", desc: "Eco-friendly farming" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-md">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AgriSmart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/") && "bg-accent text-accent-foreground"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/dashboard") && "bg-accent text-accent-foreground"
                  )}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-4">
                    {toolsItems.map((item) => (
                      <li key={item.label}>
                        <Link to={item.href}>
                          <NavigationMenuLink className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.desc}</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/market">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/market") && "bg-accent text-accent-foreground"
                  )}>
                    Market
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/community">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/community") && "bg-accent text-accent-foreground"
                  )}>
                    Community
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-2 p-4">
                    {resourcesItems.map((item) => (
                      <li key={item.label}>
                        <Link to={item.href}>
                          <NavigationMenuLink className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.desc}</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive("/contact") && "bg-accent text-accent-foreground"
                  )}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border lg:hidden"
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              <Link to="/" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link to="/dashboard" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
              <Link to="/tools/calendar" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Planting Calendar
              </Link>
              <Link to="/tools/pests" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Pest Alerts
              </Link>
              <Link to="/market" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Market
              </Link>
              <Link to="/community" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Community
              </Link>
              <Link to="/resources/knowledge" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Knowledge Base
              </Link>
              <Link to="/contact" className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">Sign In</Button>
                <Button variant="hero" className="flex-1">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};