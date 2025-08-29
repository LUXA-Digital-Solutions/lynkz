import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Link,
  BarChart3,
  Settings,
  Menu,
  LogOut,
  Plus,
  Home,
  Zap,
} from "lucide-react";
import blink from "@/blink/client";
import type { User } from "@/types";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage?: "dashboard" | "links" | "analytics" | "settings";
}

export function AppLayout({
  children,
  currentPage = "dashboard",
}: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    blink.auth.login(window.location.href);
  };

  const handleSignOut = () => {
    blink.auth.logout("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "#dashboard" },
    { id: "links", label: "Links", icon: Link, href: "#links" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "#analytics",
    },
    { id: "settings", label: "Settings", icon: Settings, href: "#settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
            L
          </div>
          <span className="font-bold text-xl">Lynkz</span>
          <Badge variant="secondary" className="text-xs">
            Pro
          </Badge>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="border-t px-4 py-4">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start gap-2 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button onClick={handleSignIn} className="w-full">
            Sign In
          </Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 animate-pulse text-primary" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                L
              </div>
              <span className="font-bold text-2xl">Lynkz</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Welcome to Lynkz</h1>
              <p className="text-muted-foreground">
                Sign in to start shortening your links and track analytics.
              </p>
            </div>
            <Button onClick={handleSignIn} size="lg" className="w-full">
              Sign In to Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isMobile ? (
        <div className="flex h-screen">
          <aside className="w-64 border-r bg-card">
            <SidebarContent />
          </aside>
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="border-b bg-card px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">
                  {currentPage}
                </h1>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Shorten Link
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <header className="border-b bg-card px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
                <h1 className="text-lg font-semibold capitalize">
                  {currentPage}
                </h1>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Shorten</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      )}
    </div>
  );
}
