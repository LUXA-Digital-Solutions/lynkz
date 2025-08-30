import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/Dashboard";
import { LinksManager } from "@/components/LinksManager";
import { Analytics } from "@/components/Analytics";
import { LandingPage } from "@/components/LandingPage";
import { Features } from "@/components/pages/Features";
import { Pricing } from "@/components/pages/Pricing";
import { About } from "@/components/pages/About";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [currentPage, setCurrentPage] = useState<
    | "landing"
    | "dashboard"
    | "links"
    | "analytics"
    | "settings"
    | "features"
    | "pricing"
    | "about"
  >("landing");

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (
        hash === "dashboard" ||
        hash === "links" ||
        hash === "analytics" ||
        hash === "settings" ||
        hash === "features" ||
        hash === "pricing" ||
        hash === "about"
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
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "features":
        return <Features />;
      case "pricing":
        return <Pricing />;
      case "about":
        return <About />;
      case "dashboard":
        return <Dashboard />;
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
        return <Dashboard />;
    }
  };

  const isPublicPage = ["landing", "features", "pricing", "about"].includes(
    currentPage
  );

  if (isPublicPage) {
    return (
      <>
        {renderCurrentPage()}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <AppLayout
        currentPage={
          currentPage as "dashboard" | "links" | "analytics" | "settings"
        }
      >
        {renderCurrentPage()}
      </AppLayout>
      <Toaster />
    </>
  );
}

export default App;
