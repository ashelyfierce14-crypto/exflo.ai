import { useState } from "react";
import { Plane, Hotel, MapPin, CreditCard, Wallet, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTripContext } from "@/contexts/TripContext";
import { useNavigate } from "react-router-dom";

const typeIcon = { flight: Plane, hotel: Hotel, activity: MapPin };

const Book = () => {
  const { currentPlan } = useTripContext();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "minipay">("card");
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const items = currentPlan.length > 0 ? currentPlan : [
    { id: "d1", type: "flight" as const, title: "Flight to Tokyo", description: "Direct — 14h 20m", time: "Apr 15", price: 890, status: "pending" as const },
    { id: "d2", type: "hotel" as const, title: "Park Hyatt Tokyo", description: "7 nights", time: "Apr 15–22", price: 1540, status: "pending" as const },
    { id: "d3", type: "activity" as const, title: "Food Tour", description: "3-hour culinary walk", time: "Apr 16", price: 85, status: "pending" as const },
  ];

  const total = items.reduce((s, a) => s + a.price, 0);

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-6">
        <div className="text-center glass rounded-2xl p-12 max-w-md glow-primary animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-neon-green" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Flow Confirmed!</h2>
          <p className="text-muted-foreground mb-8">Your AI Pilot is now monitoring your trip. You'll receive real-time updates.</p>
          <Button onClick={() => navigate("/trips")} className="bg-primary text-primary-foreground hover:bg-primary/90">
            View My Trips <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">One-Booking Checkout</h1>
      <p className="text-muted-foreground mb-8">Review your complete Flow and book everything at once.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-3">
          {items.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description} · {item.time}</div>
                </div>
                <div className="font-semibold text-primary">${item.price}</div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="glass rounded-xl p-6 h-fit space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{item.title}</span>
                <span className="text-foreground">${item.price}</span>
              </div>
            ))}
            <div className="border-t border-border/50 mt-3 pt-3 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total}</span>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Payment</h3>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`w-full flex items-center gap-3 rounded-lg p-3 border transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5 glow-primary"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <CreditCard className={`w-5 h-5 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={paymentMethod === "card" ? "text-foreground font-medium" : "text-muted-foreground"}>Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("minipay")}
                className={`w-full flex items-center gap-3 rounded-lg p-3 border transition-all ${
                  paymentMethod === "minipay"
                    ? "border-accent bg-accent/5 glow-accent"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <Wallet className={`w-5 h-5 ${paymentMethod === "minipay" ? "text-accent" : "text-muted-foreground"}`} />
                <span className={paymentMethod === "minipay" ? "text-foreground font-medium" : "text-muted-foreground"}>MiniPay</span>
              </button>
            </div>
          </div>

          <Button
            onClick={() => setConfirmed(true)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
          >
            Confirm & Book — ${total}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;
