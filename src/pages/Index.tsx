import { Link } from "react-router-dom";
import { Plane, Bot, CreditCard, Zap, ArrowRight, Globe, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bot,
    title: "AI Pilot",
    description: "Autonomous trip planning with real-time monitoring. Your journey adapts instantly to disruptions.",
  },
  {
    icon: CreditCard,
    title: "One-Booking Engine",
    description: "Flights, hotels, activities — all in a single checkout. No more tab-juggling.",
  },
  {
    icon: Zap,
    title: "MiniPay Integration",
    description: "Frictionless crypto payments with low fees. Travel the world, pay seamlessly.",
  },
];

const steps = [
  { num: "01", title: "Tell the Pilot", description: "Share your destination, dates, and preferences." },
  { num: "02", title: "Review Your Flow", description: "The AI crafts a full itinerary with flights, stays, and experiences." },
  { num: "03", title: "Book & Go", description: "One checkout, one confirmation. The Pilot monitors everything." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xl font-bold text-gradient">ExFlo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/plan">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Plan a Trip
              </Button>
            </Link>
            <Link to="/plan">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Start Your Flow
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by Agentic AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Your <span className="text-gradient">AI Pilot</span> for
            <br />Seamless Travel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            ExFlo replaces static search engines with an autonomous orchestration layer that plans, books, and coordinates entire journeys in a single Flow.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <Link to="/plan">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg px-8 py-6">
                Start Your Flow <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/trips">
              <Button size="lg" variant="outline" className="border-border/50 text-foreground hover:bg-muted text-lg px-8 py-6">
                View Demo Trips
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Key <span className="text-gradient">Innovations</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Three pillars that make ExFlo the future of travel.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s`, animationFillMode: "backwards" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-primary transition-all">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It <span className="text-gradient">Works</span>
          </h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="flex items-start gap-6 glass rounded-xl p-6 animate-fade-in"
                style={{ animationDelay: `${0.15 * i}s`, animationFillMode: "backwards" }}
              >
                <div className="text-3xl font-bold text-gradient flex-shrink-0">{s.num}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-12 glow-primary">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <Globe className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">190+</div>
              <div className="text-sm text-muted-foreground mt-1">Countries</div>
            </div>
            <div>
              <Shield className="w-6 h-6 text-neon-green mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Uptime</div>
            </div>
            <div>
              <Zap className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground">&lt;2s</div>
              <div className="text-sm text-muted-foreground mt-1">Re-plan Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-primary" />
            <span className="font-bold text-gradient">ExFlo</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ExFlo. The Agentic AI Ecosystem for Travel.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
