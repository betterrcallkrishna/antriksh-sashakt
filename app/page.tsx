'use client';

import StatsDashboard from '@/components/StatsDashboard';
import ActivityFeed from '@/components/ActivityFeed';
import StatusBadge from '@/components/StatusBadge';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">Mission Dashboard</h1>
            <StatusBadge />
          </div>
          <p className="text-slate-400">Real-time monitoring of ANTRIKSH system performance</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsDashboard />
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
