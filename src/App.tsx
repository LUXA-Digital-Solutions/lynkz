import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/Dashboard";
import { Analytics } from "@/components/Analytics";
import { LandingPage } from "@/components/LandingPage";
import { Features } from "@/components/pages/Features";
import { Pricing } from "@/components/pages/Pricing";
import { About } from "@/components/pages/About";
import { NewLink } from "@/components/pages/NewLink";
import { AllLinks } from "@/components/pages/AllLinks";
import { Settings } from "@/components/pages/Settings";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const [currentPage, setCurrentPage] = useState<
    | "landing"
    | "dashboard"
    | "links"
    | "links/new"
    | "links/all"
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
        return <AllLinks />;
      case "links/new":
        return <NewLink />;
      case "links/all":
        return <AllLinks />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const isPublicPage = ["landing", "features", "pricing", "about"].includes(
    currentPage
  );

  return (
    <ThemeProvider>
      {isPublicPage ? (
        <>
          {renderCurrentPage()}
          <Toaster />
        </>
      ) : (
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
      )}
    </ThemeProvider>
  );
}

export default App;
