export interface StockInfo {
  name: string;
  base: number;
}

export interface StockPrices {
  [ticker: string]: number;
}

export interface StockHistory {
  [ticker: string]: number[];
}

export interface ActivityEntry {
  ticker: string;
  dir: 'up' | 'down';
  diff: string;
  time: string;
  price: number;
}
