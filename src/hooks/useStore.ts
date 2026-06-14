import { useEffect, useState } from 'react';
import store from '../store/stockStore';

export function useStore() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const cb = () => forceRender((n) => n + 1);

    store.subscribers.add(cb);

    return () => {
      store.subscribers.delete(cb);
    };
  }, []);

  return store;
}
