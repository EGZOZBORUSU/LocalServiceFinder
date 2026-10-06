# Local Service Finder (Team MORPH)

> **RTU (Riga Technical University) Course Project**  
> Modern, community-driven on-demand local service marketplace connecting homeowners and certified tradespeople across **Rīga, Latvia**.

---

## Overview

**Local Service Finder** solves the trust and discovery gap in local home repair services by combining two models into one cohesive platform:

1. **Direct Specialist Discovery & Booking:** Browse verified independent plumbers, electricians, painters, and cleaners filtered by rating, price per hour (€ EUR), and Riga districts (Centrs, Vecrīga, Teika, Āgenskalns, etc.).
2. **Community Reverse Marketplace:** Homeowners post their specific repair problem with a custom budget, photos, and urgency level. Nearby certified tradespeople review the feed and submit competitive price quotes.
3. **Multi-Role Live Simulation:** Built-in 1-click role switcher allowing jury members, evaluators, and teammates to test the platform as:
   - **Customer (Homeowner):** Alex Carter
   - **Service Pro (Plumber):** Marcus Vance
   - **System Admin:** Eren Ozkan (Team MORPH)
   - **Unauthenticated Visitor (Guest):** Public landing page with instant registration & login callouts

---

## Key Features

- **Transparent Pricing in Euros (€):** Upfront hourly tariffs, package rates, and custom quote submissions with zero hidden fees.
- **Rīga Regional Targeting:** Specialized for Riga neighborhoods, including Centrs, Vecrīga, Teika, Āgenskalns, Purvciems, Imanta, Pļavnieki, and Mežaparks.
- **Quality & Verification:** Admin-verified professional badges, craftsmanship/punctuality ratings, and real customer reviews.
- **Interactive Dashboards:**
  - *Customer Dashboard:* Active appointment tracking, proposal reviews, receipt history, and rating modal.
  - *Worker Pro Workspace:* Incoming booking dispatches, live neighborhood leads, quick quote bidding, and emergency availability toggle.
  - *Admin Moderation Panel:* Platform metrics, worker profile verification, and community post moderation.
- **Utilitarian Modern UI:** High-contrast Scandinavian aesthetic built with Tailwind CSS v4 and Phosphor icons.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Iconography:** `@phosphor-icons/react`
- **State Management:** React Context API with persistent versioned LocalStorage

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/EGZOZBORUSU/LocalServiceFinder.git

# Navigate to project directory
cd LocalServiceFinder

# Install dependencies
npm install
```

### Development

```bash
# Start Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Run TypeScript check and production build
npm run build
```

---

## Team MORPH

Developed for **Riga Technical University (RTU)** by **Team MORPH**.
All rights reserved © 2026.
