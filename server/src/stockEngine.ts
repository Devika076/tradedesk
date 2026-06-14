import { STOCKS, TICKER_LIST } from './stocks';
import type { ActivityEntry } from './types';

export class StockEngine {
  prices: Record<string, number>;
  prevPrices: Record<string, number>;
  history: Record<string, number[]>;
  activityLog: ActivityEntry[] = [];

  constructor() {
    this.prices = Object.fromEntries(
      TICKER_LIST.map((t) => [t, STOCKS[t].base])
    );
    this.prevPrices = { ...this.prices };
    this.history = Object.fromEntries(
      TICKER_LIST.map((t) => [t, [STOCKS[t].base]])
    );
  }

  tick() {
    TICKER_LIST.forEach((ticker) => {
      const volatility = 0.003 + Math.random() * 0.004;
      const delta =
        this.prices[ticker] * volatility * (Math.random() > 0.5 ? 1 : -1);

      this.prevPrices[ticker] = this.prices[ticker];
      this.prices[ticker] = Math.max(
        this.prices[ticker] + delta,
        STOCKS[ticker].base * 0.7
      );
      this.history[ticker] = [
        ...this.history[ticker],
        this.prices[ticker],
      ].slice(-60);

      const dir: 'up' | 'down' =
        this.prices[ticker] >= this.prevPrices[ticker] ? 'up' : 'down';
      const diff = (
        ((this.prices[ticker] - this.prevPrices[ticker]) /
          this.prevPrices[ticker]) *
        100
      ).toFixed(3);
      const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      this.activityLog.unshift({
        ticker,
        dir,
        diff,
        time: now,
        price: this.prices[ticker],
      });
    });

    this.activityLog = this.activityLog.slice(0, 12);
  }
}
