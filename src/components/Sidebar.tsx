import { STOCKS, TICKER_LIST } from '../store/stockStore';
import MarketOverview from './MarketOverview';

interface Props {
  user: string;
  subscriptions: string[];
  prices: { [ticker: string]: number };
  onToggle: (ticker: string) => void;
}

export default function Sidebar({ subscriptions, prices, onToggle }: Props) {
  return (
    <div className="sidebar">
      <div className="side-card">
        <div className="side-card-title">Available stocks</div>
        {TICKER_LIST.map((ticker) => (
          <div key={ticker} className="stock-row">
            <div>
              <div className="row-ticker">{ticker}</div>
              <div className="row-name">{STOCKS[ticker].name}</div>
            </div>
            <button
              className={`sub-btn ${
                subscriptions.includes(ticker) ? 'active' : ''
              }`}
              onClick={() => onToggle(ticker)}
            >
              {subscriptions.includes(ticker) ? 'Watching' : '+ Watch'}
            </button>
          </div>
        ))}
      </div>

      <MarketOverview prices={prices} />
    </div>
  );
}
