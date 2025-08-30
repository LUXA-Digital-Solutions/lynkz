import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Smart Link Management",
    description:
      "Create and manage short links with custom aliases, track performance, and organize your links efficiently.",
    icon: "🔗",
  },
  {
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your link performance with real-time click tracking, geographic data, and device analytics.",
    icon: "📊",
  },
  {
    title: "Custom Branding",
    description:
      "Personalize your short links with custom domains and branded URLs to boost recognition and trust.",
    icon: "🎨",
  },
  {
    title: "API Access",
    description:
      "Integrate Lynkz into your applications with our robust RESTful API for automated link management.",
    icon: "⚡",
  },
  {
    title: "Team Collaboration",
    description:
      "Work together with your team members, share links, and manage permissions effectively.",
    icon: "👥",
  },
  {
    title: "Security Features",
    description:
      "Keep your links secure with password protection, expiration dates, and detailed access logs.",
    icon: "🔒",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Powerful Features for Modern Link Management
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage, track, and optimize your links in one
          place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border border-border">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <Button size="lg" variant="default">
          Get Started Now
        </Button>
      </div>
    </div>
  );
}
