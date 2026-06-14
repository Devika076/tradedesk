import { STOCKS, TICKER_LIST } from '../store/stockStore';

interface Props {
  prices: { [ticker: string]: number };
}

export default function MarketOverview({ prices }: Props) {
  return (
    <div className="side-card">
      <div className="side-card-title">Market overview</div>
      {TICKER_LIST.map((t) => {
        const diff = (
          ((prices[t] - STOCKS[t].base) / STOCKS[t].base) *
          100
        ).toFixed(2);
        const isUp = parseFloat(diff) >= 0;
        return (
          <div key={t} className="mkt-row">
            <span className="mkt-ticker">{t}</span>
            <span className={`mkt-pct ${isUp ? 'up' : 'down'}`}>
              {isUp ? '+' : ''}
              {diff}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
