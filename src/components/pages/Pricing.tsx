import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out Lynkz",
    price: "$0",
    duration: "forever",
    features: [
      "Up to 1,000 shortened links",
      "Basic analytics",
      "QR code generation",
      "Standard support",
      "1 team member",
    ],
    limitations: [
      "No custom domains",
      "No API access",
      "Limited analytics retention",
    ],
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "$15",
    duration: "per month",
    popular: true,
    features: [
      "Up to 50,000 shortened links",
      "Advanced analytics",
      "Custom QR codes",
      "Priority support",
      "Up to 5 team members",
      "1 custom domain",
      "API access",
      "1 year analytics retention",
      "UTM builder",
      "Link scheduling",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    duration: "per month",
    features: [
      "Unlimited shortened links",
      "Enterprise analytics",
      "Custom branding",
      "24/7 dedicated support",
      "Unlimited team members",
      "Multiple custom domains",
      "Advanced API access",
      "Unlimited analytics retention",
      "Advanced UTM management",
      "Priority features access",
      "SLA guarantee",
      "Custom integration support",
    ],
  },
];

const frequentlyAskedQuestions = [
  {
    question: "What happens to my links if I downgrade?",
    answer:
      "Your existing links will continue to work, but you won't be able to create new ones that use features from your previous plan.",
  },
  {
    question: "Can I upgrade or downgrade at any time?",
    answer:
      "Yes, you can change your plan at any time. We'll prorate the charges accordingly.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Yes! Our enterprise plan can be customized to meet your specific needs. Contact us to discuss your requirements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and can arrange bank transfers for enterprise customers.",
  },
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Pricing Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core
            link shortening features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={
                  "relative border-2 " +
                  (plan.popular
                    ? "border-primary shadow-lg"
                    : "hover:border-primary/50")
                }
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 right-4" variant="default">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, limitIndex) => (
                      <li
                        key={limitIndex}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="h-4 w-4">×</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                    <Zap className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6">
              {frequentlyAskedQuestions.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your plan and start shortening links in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Start for Free <Zap className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
