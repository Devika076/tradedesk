import type { ActivityEntry } from '../types';

interface Props {
  log: ActivityEntry[];
}

export default function ActivityFeed({ log }: Props) {
  return (
    <div className="activity-card">
      <div className="section-title" style={{ marginBottom: 12 }}>
        Recent price changes
      </div>
      {log.length === 0 ? (
        <div className="activity-empty">Waiting for price changes...</div>
      ) : (
        log.map((e, i) => (
          <div key={i} className="activity-row">
            <span className="act-ticker">{e.ticker}</span>
            <span className="act-price">${e.price.toFixed(2)}</span>
            <span className={`act-change ${e.dir}`}>
              {e.dir === 'up' ? '+' : ''}
              {e.diff}%
            </span>
            <span className="act-time">{e.time}</span>
          </div>
        ))
      )}
    </div>
  );
}
