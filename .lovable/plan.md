

# ExFlo — Full MVP Plan

## Design System
- **Theme**: Dark futuristic — deep navy/charcoal backgrounds, electric blue and cyan accents, subtle glow effects
- **Typography**: Clean sans-serif, bold headings with gradient text effects
- **Cards/Surfaces**: Glassmorphism with subtle borders and backdrop blur
- **Animations**: Smooth transitions, subtle particle or grid background effects

## Pages & Features

### 1. Landing Page (`/`)
- Hero section with animated tagline: "Your AI Pilot for Seamless Travel"
- Prominent CTA → "Start Your Flow"
- Feature highlights: AI Pilot, One-Booking Engine, MiniPay integration
- How it works (3-step visual flow)
- Footer with links

### 2. Trip Planning Dashboard (`/plan`)
- Chat-like interface to interact with the AI Pilot
- User inputs destination, dates, preferences
- AI generates a full itinerary (flights, hotels, activities) displayed as a visual timeline/card layout
- Real-time status indicators (simulated) showing the Pilot monitoring the trip
- "Re-plan" button to simulate automated re-routing

### 3. Booking Flow (`/book`)
- Unified checkout showing all trip components (flight, hotel, activities) in one view
- Summary card with total cost
- Payment method selector: traditional card vs. MiniPay (crypto) toggle
- Confirmation screen with animated success state and trip summary

### 4. My Trips (`/trips`)
- List of booked/planned trips with status badges (Active, Upcoming, Completed)
- Click into a trip to see the full itinerary and live Pilot status
- Simulated alert banner for disruptions (e.g., "Flight delayed — Pilot is re-planning")

### 5. Navigation
- Sidebar navigation with collapsible icon mode
- Links: Home, Plan a Trip, My Trips, Wallet
- User avatar/profile section at bottom

### 6. Wallet Page (`/wallet`)
- MiniPay balance display (simulated)
- Transaction history list
- Top-up CTA

## Data & State
- All data will be local/mock for now (no backend)
- React state + React Query structure ready for future API integration
- Trip data stored in React context for cross-page access

