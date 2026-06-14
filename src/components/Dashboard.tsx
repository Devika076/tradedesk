import { useCallback } from 'react';
import store from '../store/stockStore';
import { useStore } from '../hooks/useStore';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import StockCard from './StockCard';
import ActivityFeed from './ActivityFeed';

interface Props {
  user: string;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: Props) {
  const s = useStore();

  const subs = s.subscriptions;

  const toggleSub = useCallback((ticker: string) => {
    store.toggleSubscription(ticker);
  }, []);

  const onlineCount = s.onlineCount;

  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="dashboard-wrapper">
      <Topbar user={user} onlineCount={onlineCount} onLogout={onLogout} />

      <div className="body">
        <Sidebar
          user={user}
          subscriptions={subs}
          prices={s.prices}
          onToggle={toggleSub}
        />

        <div className="main">
          <div className="main-header">
            <span className="section-title">My portfolio</span>
            <span className="updated-at">Updated {now}</span>
          </div>

          {subs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📈</div>
              No stocks watched yet.
              <br />
              Select stocks from the sidebar to start tracking.
            </div>
          ) : (
            <div className="cards-grid">
              {subs.map((ticker) => (
                <StockCard
                  key={ticker}
                  ticker={ticker}
                  prices={s.prices}
                  history={s.history}
                />
              ))}
            </div>
          )}

          <ActivityFeed log={s.activityLog} />
        </div>
      </div>
    </div>
  );
}
