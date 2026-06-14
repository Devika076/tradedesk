import { useState } from 'react';
import store from './store/stockStore';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import './index.css';

export default function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    store.connect(email);
    setUser(email);
  };

  const handleLogout = () => {
    store.disconnect();
    setUser(null);
  };

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <LoginScreen onLogin={handleLogin} />
  );
}
