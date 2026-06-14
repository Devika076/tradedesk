import { useEffect, useRef, useState } from 'react';
import { STOCKS } from '../store/stockStore';

interface Props {
  ticker: string;
  prices: { [ticker: string]: number };
  history: { [ticker: string]: number[] };
}

function buildSparkline(history: number[], w: number, h: number): string {
  if (history.length < 2) return '';
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const pts = history.map((v, i) => {
    const x = (i / (history.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - h * 0.075;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return 'M' + pts.join('L');
}

export default function StockCard({ ticker, prices, history }: Props) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevRef = useRef(prices[ticker]);

  useEffect(() => {
    const cur = prices[ticker];
    const prev = prevRef.current;
    if (Math.abs(cur - prev) > 0.001) {
      setFlash(cur >= prev ? 'up' : 'down');
      const t = setTimeout(() => setFlash(null), 400);
      prevRef.current = cur;
      return () => clearTimeout(t);
    }
  }, [prices, ticker]);

  const price = prices[ticker];
  const diff = price - STOCKS[ticker].base;
  const pct = ((diff / STOCKS[ticker].base) * 100).toFixed(2);
  const isUp = parseFloat(pct) >= 0;
  const sparkPath = buildSparkline(history[ticker] || [price], 160, 36);
  const strokeColor = isUp ? '#1D9E75' : '#D85A30';

  const flashBg =
    flash === 'up' ? '#E1F5EE' : flash === 'down' ? '#FAECE7' : '';

  return (
    <div
      className="stock-card"
      style={{
        backgroundColor: flashBg || undefined,
        transition: flash ? 'none' : 'background-color 0.4s ease',
      }}
    >
      <div className="card-ticker">{ticker}</div>
      <div className="card-name">{STOCKS[ticker].name}</div>
      <div className="card-price">${price.toFixed(2)}</div>
      <div className={`card-change ${isUp ? 'up' : 'down'}`}>
        {isUp ? '▲' : '▼'} {isUp ? '+' : ''}
        {pct}% today
      </div>
      <svg
        viewBox="0 0 160 36"
        preserveAspectRatio="none"
        className="sparkline"
      >
        <path
          d={sparkPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
