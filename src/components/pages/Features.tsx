import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Link2,
  BarChart3,
  QrCode,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Clock,
  Target,
  Tag,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Smart Link Management",
    description:
      "Create branded short links, use custom domains, and organize with tags and folders.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description:
      "Track clicks, geographic data, devices, and referrers with real-time insights.",
  },
  {
    icon: <QrCode className="h-6 w-6" />,
    title: "QR Code Generation",
    description:
      "Generate customizable QR codes for your links with branding options.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description:
      "Password protection, 2FA, and role-based access control for team management.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "UTM Builder",
    description:
      "Create and manage UTM parameters for better campaign tracking.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Custom Domains",
    description:
      "Use your own domain for branded short links and maintain brand consistency.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Scheduled Links",
    description: "Schedule links to activate and expire at specific times.",
  },
  {
    icon: <Tag className="h-6 w-6" />,
    title: "Smart Targeting",
    description:
      "Route users based on location, device, or time for optimal engagement.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "API Access",
    description:
      "Integrate link shortening and analytics into your applications.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description:
      "Work together with role-based permissions and shared workspaces.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "A/B Testing",
    description: "Test different destinations and analyze performance metrics.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Bulk Operations",
    description:
      "Create and manage multiple links at once with CSV import/export.",
  },
];

export function Features() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Power-Packed Features for
            <span className="text-primary"> Modern Link Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything you need to create, manage, and analyze your links in one
            powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Get Started <Zap className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              View Demo <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Supercharge Your Links?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust Lynkz for their link management
              needs.
            </p>
            <Button size="lg" className="gap-2">
              Start for Free <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
