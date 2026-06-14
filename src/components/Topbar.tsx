interface Props {
  user: string;
  onlineCount: number;
  onLogout: () => void;
}

function getInitials(email: string): string {
  const name = email.split('@')[0];
  const parts = name.split(/[._-]/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

export default function Topbar({ user, onlineCount, onLogout }: Props) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="logo-text">TradeDesk</span>
        <div className="divider" />
        <span className="live-indicator">
          <span className="live-dot" />
          Live
        </span>
        <span className="online-pill">
          {onlineCount} user{onlineCount !== 1 ? 's' : ''} online
        </span>
      </div>

      <div className="topbar-right">
        <div className="avatar">{getInitials(user)}</div>
        <span className="user-email">{user}</span>
        <button className="btn-logout" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}
