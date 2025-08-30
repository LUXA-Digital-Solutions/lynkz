import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Link2,
  BarChart3,
  QrCode,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Star,
  Github,
  Twitter,
  Mail,
} from "lucide-react";
import { LinkShortener } from "./LinkShortener";

interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Link2 className="h-6 w-6" />,
      title: "Smart Link Shortening",
      description:
        "Create clean, memorable short links with custom aliases and branding options.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Analytics",
      description:
        "Track clicks, geographic data, device types, and referrer sources in real-time.",
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "QR Code Generation",
      description:
        "Automatically generate QR codes for all your shortened links for easy sharing.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Advanced Security",
      description:
        "Password protection, expiration dates, and secure link management.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant redirects and minimal latency worldwide.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Network",
      description:
        "Powered by a global CDN for fast link resolution anywhere in the world.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for personal use",
      features: [
        "100 links per month",
        "Basic analytics",
        "QR code generation",
        "Custom aliases",
        "Standard support",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Best for professionals",
      features: [
        "10,000 links per month",
        "Advanced analytics",
        "Custom domains",
        "Password protection",
        "Link expiration",
        "Bulk operations",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$29",
      period: "per month",
      description: "For teams and businesses",
      features: [
        "Unlimited links",
        "Team collaboration",
        "Advanced security",
        "API access",
        "White-label options",
        "Custom integrations",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "Lynkz has revolutionized how we track our marketing campaigns. The analytics are incredibly detailed.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Social Media Manager",
      company: "CreativeStudio",
      content:
        "The QR code feature and custom aliases have made our social media campaigns much more professional.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Founder",
      company: "StartupXYZ",
      content:
        "Simple, powerful, and reliable. Lynkz handles all our link shortening needs perfectly.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                L
              </div>
              <span className="font-bold text-xl">Lynkz</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.hash = "features")}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.hash = "pricing")}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.hash = "about")}
              >
                About
              </Button>
              <ThemeToggle />
              <Button size="sm" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                Trusted by 50,000+ users worldwide
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                Shorten Links.
                <br />
                <span className="text-primary">Track Everything.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create powerful short links with detailed analytics, custom
                branding, and advanced features. Perfect for marketers,
                businesses, and creators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={onGetStarted}>
                Start Free Today
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Hero Link Shortener */}
          <div className="mt-16 max-w-2xl mx-auto">
            <LinkShortener />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">2M+</p>
              <p className="text-muted-foreground">Links Created</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">150+</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Everything you need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create, manage, and track
              your links effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Start free, upgrade
              anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? "ring-2 ring-primary shadow-lg" : "shadow-sm"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onGetStarted}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about Lynkz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to supercharge your links?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of users who trust Lynkz for their link shortening
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                onClick={onGetStarted}
              >
                Start Free Today
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
                  L
                </div>
                <span className="font-bold text-xl">Lynkz</span>
              </div>
              <p className="text-muted-foreground">
                The modern link shortener with powerful analytics and advanced
                features.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Lynkz. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
