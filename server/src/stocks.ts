export const STOCKS: Record<string, { name: string; base: number }> = {
  GOOG: { name: 'Alphabet Inc.', base: 175 },
  TSLA: { name: 'Tesla Inc.', base: 250 },
  AMZN: { name: 'Amazon.com Inc.', base: 210 },
  META: { name: 'Meta Platforms', base: 590 },
  NVDA: { name: 'NVIDIA Corp.', base: 130 },
};

export const TICKER_LIST = Object.keys(STOCKS);
