# Pizzafy Dashboard

**Live Demo:** [Your Deployed App URL](http://pizzafy-two.vercel.app/)  
**Repository:** [GitHub Repo URL](https://github.com/Romit77/Pizzafy)

---

## Overview

Pizzafy is a modern, server-rendered dashboard application built with Next.js. It features secure Google OAuth authentication, a personalized welcome page, and an interactive pizza orders management interface. The UI is designed with Tailwind CSS, enhanced by Framer Motion animations, and enriched with Heroicons and Lucide icons for a polished user experience.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Authentication:** NextAuth.js with Google OAuth
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & `motion`
- **Icons:** @heroicons/react & lucide-react
- **Language:** TypeScript / JavaScript
- **Deployment:** Vercel (or Railway)

## Features

### Authentication

- **Google OAuth sign-in** via NextAuth.js
- Protected routes: only authenticated users can access the dashboard and orders pages
- Custom login page with animated “Continue with Google” button
- Sign out functionality with callback redirect

### Dashboard Pages

#### Hello User

- Displays a welcome message: “Hello, [First Name]!”
- Animated avatar or placeholder icon
- Real-time stats cards (Total Orders, Revenue, Customers, Avg Order Value) with hover effects
- Recent orders table with status badges and entry animations

#### Pizza Orders

- Table of mock pizza orders (hardcoded JSON)
- Columns: Order ID, Customer Name, Pizza Type, Quantity, Order Date, Total, Status
- **Sorting**: click headers to sort ascending/descending
- **Filtering**: search bar & status dropdown filter
- Responsive layout for mobile, tablet, desktop
- Empty-state graphic when no orders match filters

## Bonus Enhancements

- **Table sorting** by Order ID, Date, Quantity, Total
- **Search & status filtering**
- **Framer Motion animations** for page transitions and hover states
- **TypeScript** support and strict typing for data models
- **Custom fonts** via `next/font/google`

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/pizzafy.git
   cd pizzafy
   ```
2. **Install dependencies**
   ```bash
    npm install
    # or
    yarn install
   ```
3. **Create a .env.local file in the project root and add:**

   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
    npm run dev
    # or
    yarn dev
   ```
5. **Open your browser and navigate to** `http://localhost:3000`
