import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TripActivity {
  id: string;
  type: "flight" | "hotel" | "activity";
  title: string;
  description: string;
  time: string;
  price: number;
  status: "confirmed" | "pending" | "disrupted";
}

export interface Trip {
  id: string;
  destination: string;
  dates: string;
  status: "active" | "upcoming" | "completed";
  totalCost: number;
  activities: TripActivity[];
  pilotStatus: string;
}

interface TripContextType {
  trips: Trip[];
  currentPlan: TripActivity[];
  addTrip: (trip: Trip) => void;
  setCurrentPlan: (plan: TripActivity[]) => void;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    destination: "Tokyo, Japan",
    dates: "Apr 15 – Apr 22, 2026",
    status: "active",
    totalCost: 2840,
    pilotStatus: "Monitoring — All systems nominal",
    activities: [
      { id: "a1", type: "flight", title: "Flight to Tokyo (NRT)", description: "JL 045 — Direct, 14h 20m", time: "Apr 15, 08:00", price: 890, status: "confirmed" },
      { id: "a2", type: "hotel", title: "Park Hyatt Tokyo", description: "Deluxe King — 7 nights", time: "Apr 15 – Apr 22", price: 1540, status: "confirmed" },
      { id: "a3", type: "activity", title: "Shibuya Food Tour", description: "Guided 3-hour culinary walk", time: "Apr 16, 18:00", price: 85, status: "confirmed" },
      { id: "a4", type: "activity", title: "Mt. Fuji Day Trip", description: "Full-day guided excursion", time: "Apr 18, 06:00", price: 150, status: "pending" },
      { id: "a5", type: "flight", title: "Return Flight", description: "JL 046 — Direct, 12h 50m", time: "Apr 22, 19:00", price: 175, status: "confirmed" },
    ],
  },
  {
    id: "2",
    destination: "Barcelona, Spain",
    dates: "May 10 – May 16, 2026",
    status: "upcoming",
    totalCost: 1920,
    pilotStatus: "Pre-flight checks scheduled",
    activities: [
      { id: "b1", type: "flight", title: "Flight to Barcelona", description: "IB 3250 — 1 stop, 9h 40m", time: "May 10, 06:30", price: 520, status: "confirmed" },
      { id: "b2", type: "hotel", title: "Hotel Arts Barcelona", description: "Sea View Room — 6 nights", time: "May 10 – May 16", price: 1080, status: "pending" },
      { id: "b3", type: "activity", title: "Sagrada Familia Tour", description: "Skip-the-line guided visit", time: "May 11, 10:00", price: 65, status: "pending" },
      { id: "b4", type: "flight", title: "Return Flight", description: "IB 3251 — 1 stop, 10h 15m", time: "May 16, 15:00", price: 255, status: "pending" },
    ],
  },
  {
    id: "3",
    destination: "Bali, Indonesia",
    dates: "Feb 1 – Feb 10, 2026",
    status: "completed",
    totalCost: 2150,
    pilotStatus: "Trip completed — All clear",
    activities: [
      { id: "c1", type: "flight", title: "Flight to Bali (DPS)", description: "SQ 946 — 1 stop, 16h", time: "Feb 1, 22:00", price: 780, status: "confirmed" },
      { id: "c2", type: "hotel", title: "Ubud Hanging Gardens", description: "Pool Villa — 9 nights", time: "Feb 1 – Feb 10", price: 1200, status: "confirmed" },
      { id: "c3", type: "activity", title: "Rice Terrace Trek", description: "Half-day Tegallalang hike", time: "Feb 3, 07:00", price: 40, status: "confirmed" },
    ],
  },
];

const TripContext = createContext<TripContextType | null>(null);

export const useTripContext = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTripContext must be within TripProvider");
  return ctx;
};

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [currentPlan, setCurrentPlan] = useState<TripActivity[]>([]);

  const addTrip = (trip: Trip) => setTrips((prev) => [...prev, trip]);

  return (
    <TripContext.Provider value={{ trips, currentPlan, addTrip, setCurrentPlan }}>
      {children}
    </TripContext.Provider>
  );
};
