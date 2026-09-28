'use client';

import { useEffect, useState } from 'react';
import { api, Stats } from '@/lib/api';
import { Activity, AlertCircle, Clock, Zap } from 'lucide-react';

export default function StatsDashboard() {
  const [stats, setStats] = useState<Stats>({
    activeProcedures: 0,
    stepsDetected: 0,
    systemUptime: 0,
    alertsToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await api.getStats();
      setStats(data);
      setIsLoading(false);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Active Procedures',
      value: stats.activeProcedures,
      icon: Activity,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Steps Detected',
      value: stats.stepsDetected,
      icon: Zap,
      color: 'from-green-500 to-emerald-400',
    },
    {
      title: 'System Uptime (hrs)',
      value: Math.round(stats.systemUptime),
      icon: Clock,
      color: 'from-purple-500 to-pink-400',
    },
    {
      title: 'Alerts Today',
      value: stats.alertsToday,
      icon: AlertCircle,
      color: 'from-orange-500 to-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">{card.title}</h3>
              <div className={`p-2 bg-gradient-to-br ${card.color} rounded-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {isLoading ? '-' : stats[Object.keys(stats)[idx] as keyof Stats]}
            </div>
            <p className="text-xs text-slate-400">Real-time metric</p>
          </div>
        );
      })}
    </div>
  );
}
