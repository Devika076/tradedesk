export interface ActivityEntry {
  ticker: string;
  dir: 'up' | 'down';
  diff: string;
  time: string;
  price: number;
}

export type ClientMessage =
  | { type: 'login'; user: string }
  | { type: 'subscribe'; user: string; ticker: string }
  | { type: 'unsubscribe'; user: string; ticker: string }
  | { type: 'logout'; user: string };

export interface ServerState {
  type: 'state';
  prices: Record<string, number>;
  history: Record<string, number[]>;
  activityLog: ActivityEntry[];
  onlineCount: number;
  subscriptions: string[]; // only this user's subscriptions
}
