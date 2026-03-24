import { useState } from "react";
import { Plane, Hotel, MapPin, AlertTriangle, Bot, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTripContext, Trip } from "@/contexts/TripContext";

const typeIcon = { flight: Plane, hotel: Hotel, activity: MapPin };
const statusColor: Record<string, string> = {
  active: "bg-neon-green/10 text-neon-green border-neon-green/20",
  upcoming: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-muted text-muted-foreground border-border",
};

const Trips = () => {
  const { trips } = useTripContext();
  const [selected, setSelected] = useState<Trip | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  if (selected) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Button variant="ghost" onClick={() => setSelected(null)} className="mb-4 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Trips
        </Button>

        {showAlert && (
          <div className="glass rounded-xl p-4 mb-6 border-destructive/30 bg-destructive/5 flex items-center gap-3 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Flight delayed by 2 hours</p>
              <p className="text-xs text-muted-foreground">AI Pilot is re-planning downstream activities...</p>
            </div>
            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
          </div>
        )}

        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{selected.destination}</h2>
              <p className="text-sm text-muted-foreground">{selected.dates}</p>
            </div>
            <Badge className={statusColor[selected.status]}>{selected.status}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{selected.pilotStatus}</span>
          </div>
        </div>

        {selected.status === "active" && !showAlert && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAlert(true)}
            className="mb-6 border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <AlertTriangle className="w-4 h-4 mr-2" /> Simulate Disruption
          </Button>
        )}

        <h3 className="font-semibold text-foreground mb-4">Itinerary</h3>
        <div className="space-y-3">
          {selected.activities.map((a) => {
            const Icon = typeIcon[a.type];
            return (
              <div key={a.id} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.description} · {a.time}</div>
                </div>
                <Badge variant="outline" className={
                  a.status === "confirmed" ? "border-neon-green/30 text-neon-green" :
                  a.status === "disrupted" ? "border-destructive/30 text-destructive" :
                  "border-primary/30 text-primary"
                }>
                  {a.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">My Trips</h1>
      <p className="text-muted-foreground mb-8">Your AI Pilot is monitoring all active journeys.</p>

      <div className="space-y-4">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => setSelected(trip)}
            className="w-full text-left glass rounded-xl p-6 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {trip.destination}
              </h3>
              <Badge className={statusColor[trip.status]}>{trip.status}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{trip.dates}</span>
              <span className="font-medium text-foreground">${trip.totalCost}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Trips;
