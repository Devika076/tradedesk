import { WebSocketServer, WebSocket } from 'ws';
import { StockEngine } from './stockEngine';
import type { ClientMessage } from './types';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
const engine = new StockEngine();

const connections = new Map<WebSocket, string>(); // socket -> user email
const subscriptions = new Map<string, Set<string>>(); // user email -> tickers

const onlineCount = () => new Set(connections.values()).size;

function broadcast() {
  wss.clients.forEach((ws) => {
    const user = connections.get(ws);
    if (!user) return;
    ws.send(
      JSON.stringify({
        type: 'state',
        prices: engine.prices,
        history: engine.history,
        activityLog: engine.activityLog,
        onlineCount: onlineCount(),
        subscriptions: Array.from(subscriptions.get(user) || []),
      })
    );
  });
}

setInterval(() => {
  engine.tick();
  broadcast();
}, 1000);

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    const msg: ClientMessage = JSON.parse(raw.toString());
    switch (msg.type) {
      case 'login':
        connections.set(ws, msg.user);
        if (!subscriptions.has(msg.user))
          subscriptions.set(msg.user, new Set());
        broadcast();
        break;
      case 'subscribe':
        subscriptions.get(msg.user)?.add(msg.ticker);
        broadcast();
        break;
      case 'unsubscribe':
        subscriptions.get(msg.user)?.delete(msg.ticker);
        broadcast();
        break;
      case 'logout':
        connections.delete(ws);
        broadcast();
        break;
    }
  });

  ws.on('close', () => {
    connections.delete(ws);
    broadcast();
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
