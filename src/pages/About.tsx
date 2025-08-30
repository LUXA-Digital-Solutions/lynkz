import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Simplifying Link Management for Everyone
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Lynkz was born from a simple idea: make link management easy and
            accessible for everyone. Whether you're a social media influencer,
            digital marketer, or business owner, we provide the tools you need
            to create, track, and optimize your links.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Our mission is to empower individuals and businesses with smart link
            management solutions that drive engagement and growth.
          </p>
          <div className="flex gap-4">
            <Button variant="default">Get Started</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
        <div className="relative aspect-square">
          <img
            src="/about-illustration.svg"
            alt="About Lynkz"
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Lynkz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Built on modern technology for maximum speed and reliability.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security to protect your links and data.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-muted-foreground">
              Intuitive interface designed for the best user experience.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust Lynkz for their link management
          needs.
        </p>
        <Button size="lg" variant="default">
          Create Your Free Account
        </Button>
      </div>
    </div>
  );
}
