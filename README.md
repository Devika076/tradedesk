# TradeDesk — Real-Time Stock Broker Client Dashboard

A real-time multi-user stock broker dashboard built using **React, TypeScript, Node.js, and WebSockets**.

The application allows users to log in using their email address, subscribe to stock tickers, and receive live stock price updates without refreshing the page. A centralized WebSocket server acts as the single source of truth and broadcasts updates to all connected users in real time.

---

## Features

* Email-based user login
* Subscribe and unsubscribe to supported stock tickers
* Live stock price updates every second
* Real-time dashboard updates without page refresh
* Multi-user support with independent subscriptions
* Shared stock prices across all connected users
* Sparkline charts showing recent price history
* Live activity feed with price changes and timestamps
* Market overview panel displaying percentage changes
* Online user counter

---

## Supported Stocks

| Ticker | Company            |
| ------ | ------------------ |
| GOOG   | Alphabet Inc.      |
| TSLA   | Tesla Inc.         |
| AMZN   | Amazon.com Inc.    |
| META   | Meta Platforms     |
| NVDA   | NVIDIA Corporation |

---

## Tech Stack

| Layer       | Technology                   |
| ----------- | ---------------------------- |
| Frontend    | React 18, TypeScript, Vite   |
| Backend     | Node.js, WebSocket (`ws`)    |
| Styling     | CSS                          |
| Data Source | Random Stock Price Generator |

---

## Architecture

```text
React Frontend
      │
   WebSocket
      │
Node.js Server
      │
 Stock Engine
```

### Architecture Overview

* React provides the user interface.
* WebSocket enables real-time communication between client and server.
* Node.js maintains the shared application state.
* Stock Engine generates random stock price changes every second.
* The server broadcasts updates to all connected clients.

---

## Project Structure

```text
tradedesk/
├── server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── stockEngine.ts
│   │   ├── stocks.ts
│   │   └── types.ts
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── ActivityFeed.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── MarketOverview.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StockCard.tsx
│   │   └── Topbar.tsx
│   ├── hooks/
│   │   └── useStore.ts
│   ├── store/
│   │   └── stockStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.css
│
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js v18+
* npm v9+

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Devika076/tradedesk.git
cd tradedesk
```

---

## Run the Backend Server

Open a terminal:

```bash
cd server
npm install
npx tsx src/index.ts
```

Expected output:

```text
WebSocket server running on ws://localhost:8080
```

---

## Run the Frontend

Open another terminal:

```bash
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Multi-User Testing

1. Open the application in two browser tabs.
2. Login with different email addresses.
3. Subscribe to different stocks in each tab.
4. Observe:

   * Same stock prices across all users
   * Independent subscriptions per user
   * Live updates every second
   * Online user count updates automatically

Example:

**User 1**

* GOOG
* TSLA

**User 2**

* META
* NVDA

Both users receive the same market data while maintaining separate portfolios.

---

## How It Works

### Login

Users log in using an email address. The frontend establishes a WebSocket connection with the server.

### Stock Subscription

Users can subscribe or unsubscribe from supported stock tickers.

### Price Generation

The Stock Engine generates random price fluctuations every second.

### Broadcasting Updates

The server broadcasts:

* Latest stock prices
* Stock history
* Activity feed
* Online user count
* User subscriptions

to all connected clients.

### Real-Time UI Updates

The frontend store receives updates and automatically re-renders the dashboard.

---

## Demo Users

The login screen provides quick-access demo users:

* alice@tradedesk.io
* bob@tradedesk.io
* carol@tradedesk.io

Any valid email address can also be used.