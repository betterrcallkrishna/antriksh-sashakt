'use client';

import { useEffect, useState } from 'react';
import { api, ActivityLog } from '@/lib/api';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await api.getActivityLog();
      setActivities(data.slice(0, 10)); // Show latest 10
      setIsLoading(false);
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'border-l-red-500 bg-red-900/10';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-900/10';
      default:
        return 'border-l-green-500 bg-green-900/10';
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Activity Feed</h2>
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-slate-400 text-sm">Loading activities...</p>
        ) : activities.length === 0 ? (
          <p className="text-slate-400 text-sm">No activities yet</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex gap-3 p-3 rounded border-l-4 ${getSeverityColor(
                activity.severity
              )}`}
            >
              <div className="mt-0.5">{getIcon(activity.severity)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white break-words">{activity.message}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
