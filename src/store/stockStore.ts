import type { ActivityEntry } from '../types';

export const STOCKS: Record<string, { name: string; base: number }> = {
  GOOG: { name: 'Alphabet Inc.', base: 175 },
  TSLA: { name: 'Tesla Inc.', base: 250 },
  AMZN: { name: 'Amazon.com Inc.', base: 210 },
  META: { name: 'Meta Platforms', base: 590 },
  NVDA: { name: 'NVIDIA Corp.', base: 130 },
};

export const TICKER_LIST = Object.keys(STOCKS);

const WS_URL = 'ws://localhost:8080';

interface ClientStore {
  prices: Record<string, number>;
  history: Record<string, number[]>;
  activityLog: ActivityEntry[];
  onlineCount: number;
  subscriptions: string[];
  subscribers: Set<() => void>;
  socket: WebSocket | null;
  user: string | null;

  notify: () => void;
  connect: (user: string) => void;
  disconnect: () => void;
  toggleSubscription: (ticker: string) => void;
}

const store: ClientStore = {
  prices: Object.fromEntries(TICKER_LIST.map((t) => [t, STOCKS[t].base])),

  history: Object.fromEntries(TICKER_LIST.map((t) => [t, [STOCKS[t].base]])),

  activityLog: [],

  onlineCount: 0,

  subscriptions: [],

  subscribers: new Set(),

  socket: null,

  user: null,

  notify() {
    this.subscribers.forEach((cb) => cb());
  },

  connect(user) {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.user = user;

    const ws = new WebSocket(WS_URL);

    this.socket = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'login',
          user,
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'state') {
        this.prices = msg.prices;
        this.history = msg.history;
        this.activityLog = msg.activityLog;
        this.onlineCount = msg.onlineCount;
        this.subscriptions = msg.subscriptions;

        this.notify();
      }
    };

    ws.onclose = () => {
      this.socket = null;
    };
  },

  disconnect() {
    if (this.socket && this.user) {
      this.socket.send(
        JSON.stringify({
          type: 'logout',
          user: this.user,
        })
      );

      this.socket.close();
    }

    this.socket = null;
    this.user = null;

    this.subscriptions = [];
    this.onlineCount = 0;
    this.activityLog = [];

    this.notify();
  },

  toggleSubscription(ticker) {
    if (!this.socket || !this.user) return;

    const type = this.subscriptions.includes(ticker)
      ? 'unsubscribe'
      : 'subscribe';

    this.socket.send(
      JSON.stringify({
        type,
        user: this.user,
        ticker,
      })
    );
  },
};

export default store;
