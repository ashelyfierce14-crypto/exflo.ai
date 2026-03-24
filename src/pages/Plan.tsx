import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Plane, Hotel, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTripContext, TripActivity } from "@/contexts/TripContext";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "ai";
  content: string;
  plan?: TripActivity[];
}

const generatePlan = (destination: string): TripActivity[] => [
  { id: "p1", type: "flight", title: `Flight to ${destination}`, description: "Direct flight — 8h 30m", time: "Day 1, 09:00", price: 680, status: "pending" },
  { id: "p2", type: "hotel", title: "Boutique Hotel", description: "Deluxe Suite — 5 nights", time: "Day 1 – Day 6", price: 950, status: "pending" },
  { id: "p3", type: "activity", title: "City Walking Tour", description: "Guided 3-hour historical tour", time: "Day 2, 10:00", price: 45, status: "pending" },
  { id: "p4", type: "activity", title: "Local Cuisine Experience", description: "Food tasting with a local chef", time: "Day 3, 19:00", price: 85, status: "pending" },
  { id: "p5", type: "flight", title: "Return Flight", description: "Direct flight — 9h 10m", time: "Day 6, 18:00", price: 620, status: "pending" },
];

const typeIcon = { flight: Plane, hotel: Hotel, activity: MapPin };

const Plan = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I'm your AI Pilot. Where would you like to go? Tell me your destination, dates, and any preferences." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setCurrentPlan } = useTripContext();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const plan = generatePlan(userMsg.split(" ").slice(0, 2).join(" "));
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Great choice! I've crafted a complete Flow for your trip. Here's your itinerary:`,
          plan,
        },
      ]);
      setCurrentPlan(plan);
      setIsTyping(false);
    }, 1500);
  };

  const handleBook = () => navigate("/book");

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="p-4 border-b border-border/50 glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-primary">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">AI Pilot</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
              <span className="text-xs text-muted-foreground">Online — Ready to plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className={`max-w-lg ${msg.role === "user" ? "glass rounded-2xl rounded-br-md px-4 py-3" : ""}`}>
              {msg.role === "ai" && (
                <p className="text-foreground mb-3">{msg.content}</p>
              )}
              {msg.role === "user" && (
                <p className="text-foreground">{msg.content}</p>
              )}
              {msg.plan && (
                <div className="space-y-2 mt-2">
                  {msg.plan.map((item) => {
                    const Icon = typeIcon[item.type];
                    return (
                      <div key={item.id} className="glass rounded-lg p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description} · {item.time}</div>
                        </div>
                        <div className="text-sm font-semibold text-primary">${item.price}</div>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      Total: <span className="text-foreground font-semibold">${msg.plan.reduce((s, a) => s + a.price, 0)}</span>
                    </div>
                    <Button onClick={handleBook} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                      Book This Flow
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Planning your Flow...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 glass">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me where you want to go..."
            className="flex-1 bg-muted border-border/50 focus-visible:ring-primary"
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Plan;
