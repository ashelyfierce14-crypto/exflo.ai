import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TripProvider } from "@/contexts/TripContext";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index.tsx";
import Plan from "./pages/Plan.tsx";
import Book from "./pages/Book.tsx";
import Trips from "./pages/Trips.tsx";
import Wallet from "./pages/Wallet.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TripProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plan" element={<AppLayout><Plan /></AppLayout>} />
            <Route path="/book" element={<AppLayout><Book /></AppLayout>} />
            <Route path="/trips" element={<AppLayout><Trips /></AppLayout>} />
            <Route path="/wallet" element={<AppLayout><Wallet /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
