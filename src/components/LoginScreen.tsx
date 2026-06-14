import { useState } from 'react';

interface Props {
  onLogin: (email: string) => void;
}

const DEMO_USERS = [
  'alice@tradedesk.io',
  'bob@tradedesk.io',
  'carol@tradedesk.io',
];

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onLogin(trimmed);
  };

  return (
    <div className="login-wrapper">
      <div className="login-hero">
        <h1 className="logo-text">TradeDesk</h1>
        <p className="logo-sub">Real-time portfolio tracker</p>
      </div>

      <div className="login-card">
        <h2>Sign in</h2>
        <p>Enter your email to access your dashboard</p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
        {error && <div className="error-msg">{error}</div>}
        <button className="btn-primary" onClick={handleSubmit}>
          Continue
        </button>
      </div>

      <div className="demo-section">
        <p className="demo-label">Or sign in as a demo user</p>
        <div className="quick-logins">
          {DEMO_USERS.map((e) => (
            <button key={e} className="quick-btn" onClick={() => onLogin(e)}>
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
