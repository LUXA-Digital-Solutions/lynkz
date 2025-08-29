import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/Dashboard";
import { LinksManager } from "@/components/LinksManager";
import { Analytics } from "@/components/Analytics";
import { LandingPage } from "@/components/LandingPage";
import { Toaster } from "@/components/ui/toaster";
import blink from "@/blink/client";
import type { User } from "@/types";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "dashboard" | "links" | "analytics" | "settings"
  >("landing");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);

      // Auto-redirect to dashboard if user is authenticated
      if (state.user && currentPage === "landing") {
        setCurrentPage("dashboard");
      }
    });
    return unsubscribe;
  }, [currentPage]);

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (
        hash === "dashboard" ||
        hash === "links" ||
        hash === "analytics" ||
        hash === "settings"
      ) {
        setCurrentPage(hash);
      } else if (hash === "landing" || hash === "") {
        setCurrentPage("landing");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleGetStarted = () => {
    setCurrentPage("dashboard");
    window.location.hash = "dashboard";
  };

  const renderCurrentPage = () => {
    if (currentPage === "landing") {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }

    // Protected pages - wrap in AppLayout
    switch (currentPage) {
      case "dashboard":
        return <Dashboard currentPage={currentPage} />;
      case "links":
        return <LinksManager />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Settings page coming soon...
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard currentPage="dashboard" />;
    }
  };

  if (currentPage === "landing") {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <AppLayout currentPage={currentPage}>{renderCurrentPage()}</AppLayout>
      <Toaster />
    </>
  );
}

export default App;
