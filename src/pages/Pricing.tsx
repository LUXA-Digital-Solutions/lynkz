import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { plans } from "@/data/plans";
  {
    name: "Free",
    description: "Perfect for trying out Lynkz",
    price: "$0",
    priceDescription: "Free forever",
    features: [
      "Up to 50 links",
      "Basic analytics",
      "Custom aliases",
      "24-hour click history",
      "Standard support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "$19",
    priceDescription: "per month",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
      "API access",
      "Priority support",
      "Password protection",
      "Link expiration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    priceDescription: "Contact sales",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integration",
      "SLA guarantee",
      "Advanced security",
      "Custom analytics",
      "Training sessions",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={\`\${
              plan.highlighted 
                ? "border-primary shadow-lg scale-105" 
                : "border-border"
            } relative\`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.priceDescription}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-4">
          Need a custom plan? Contact our sales team for more information.
        </p>
        <Button variant="link">Contact Sales →</Button>
      </div>
    </div>
  );
}
