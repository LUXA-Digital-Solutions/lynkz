import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Building2,
  Globe2,
  Heart,
  MailCheck,
  MessageCircle,
  Users2,
} from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image: "/team/sarah-chen.jpg",
    fallback: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    image: "/team/marcus-rodriguez.jpg",
    fallback: "MR",
  },
  {
    name: "Aisha Patel",
    role: "Head of Product",
    image: "/team/aisha-patel.jpg",
    fallback: "AP",
  },
  {
    name: "David Kim",
    role: "Lead Engineer",
    image: "/team/david-kim.jpg",
    fallback: "DK",
  },
];

const values = [
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "Global Reach",
    description:
      "We believe in making the internet more accessible and organized for everyone, everywhere.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "User First",
    description:
      "Every feature and decision is made with our users' best interests at heart.",
  },
  {
    icon: <Users2 className="h-6 w-6" />,
    title: "Team Spirit",
    description:
      "We work collaboratively, celebrating our differences and supporting each other.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Innovation",
    description:
      "We're constantly pushing boundaries to create better solutions for link management.",
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Making the Web More
            <span className="text-primary"> Accessible</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're on a mission to simplify link management and empower
            businesses with powerful analytics and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => (window.location.hash = "about#careers")}
            >
              Join Our Team <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => (window.location.hash = "about#contact")}
            >
              Contact Us <MessageCircle className="h-4 w-4" />
            </Button>
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

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              We're a diverse group of passionate individuals working together
              to revolutionize link management.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.fallback}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions? We'd love to hear from you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <MailCheck className="h-6 w-6" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>
                    We'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      window.location.href = "mailto:support@lynkz.com";
                    }}
                  >
                    support@lynkz.com
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Available Mon-Fri, 9am-6pm EST
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => {
                      alert("Live chat would be initiated in a real app");
                    }}
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
