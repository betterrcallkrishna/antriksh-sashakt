'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function StatusBadge() {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await api.getHealth();
      setIsOnline(healthy);
      setIsLoading(false);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" />
        Checking...
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
        isOnline
          ? 'bg-green-900 text-green-200'
          : 'bg-red-900 text-red-200'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'
        }`}
      />
      {isOnline ? 'System Online' : 'System Offline'}
    </div>
  );
}
