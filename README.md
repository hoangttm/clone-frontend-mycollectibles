# My Collectibles Frontend

A React-based web application for managing and tracking collectible card investments, including Pokemon cards and other collectibles.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization

## Features

- **Authentication**: Login, Sign Up, and Forgot Password flows
- **Home Page**: Dashboard with portfolio overview, trending products, news, and activity feed
- **Portfolio Page**:
  - View total portfolio value and performance charts
  - My Assets tab with pod and card investments
  - Watchlist tab for tracking items
  - Detailed asset views with transaction history
- **Search Page**: Search for collectibles with results display

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```

Type-checks with TypeScript and builds for production.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Lint

```bash
npm run lint
```

Run ESLint to check for code quality issues.

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SignUpPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── PortfolioPage.tsx
│   ├── SearchPage.tsx
│   └── ...
├── context/          # React context providers
│   └── AuthContext.tsx
├── data/             # Mock data
│   └── mockData.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── assets/           # Static assets (images, icons)
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point
```
