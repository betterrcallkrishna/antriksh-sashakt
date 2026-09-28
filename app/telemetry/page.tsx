'use client';

import { useEffect, useState } from 'react';
import { api, TelemetryData } from '@/lib/api';
import { Activity, Gauge, Zap, Database } from 'lucide-react';

export default function TelemetryPage() {
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      const data = await api.getTelemetry();
      setTelemetry(data);
      setIsLoading(false);
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);

    return () => clearInterval(interval);
  }, []);

  const latest = telemetry[telemetry.length - 1];
  const average = telemetry.length > 0
    ? {
        fps: Math.round(telemetry.reduce((sum, t) => sum + t.fpsCamera, 0) / telemetry.length),
        latency: Math.round(telemetry.reduce((sum, t) => sum + t.latencyMs, 0) / telemetry.length),
        cpu: Math.round(telemetry.reduce((sum, t) => sum + t.cpuUsage, 0) / telemetry.length),
        memory: Math.round(telemetry.reduce((sum, t) => sum + t.memoryUsage, 0) / telemetry.length),
      }
    : { fps: 0, latency: 0, cpu: 0, memory: 0 };

  const metrics = [
    {
      title: 'Camera FPS',
      current: latest?.fpsCamera || 0,
      average: average.fps,
      unit: 'fps',
      icon: Activity,
      target: 30,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Inference Latency',
      current: latest?.latencyMs || 0,
      average: average.latency,
      unit: 'ms',
      icon: Gauge,
      target: 45,
      color: 'from-green-500 to-emerald-400',
    },
    {
      title: 'CPU Usage',
      current: latest?.cpuUsage || 0,
      average: average.cpu,
      unit: '%',
      icon: Zap,
      target: 80,
      color: 'from-orange-500 to-red-400',
    },
    {
      title: 'Memory Usage',
      current: latest?.memoryUsage || 0,
      average: average.memory,
      unit: '%',
      icon: Database,
      target: 85,
      color: 'from-purple-500 to-pink-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Telemetry</h1>
          <p className="text-slate-400">Real-time performance metrics from ANTRIKSH</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-300">{metric.title}</h3>
                  <div className={`p-2 bg-gradient-to-br ${metric.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-3xl font-bold text-white">
                    {isLoading ? '-' : metric.current.toFixed(1)}
                    <span className="text-sm text-slate-400 ml-1">{metric.unit}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Avg: {metric.average.toFixed(1)} {metric.unit}
                  </p>
                </div>

                {/* Mini Progress Bar */}
                {metric.unit === '%' && (
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className={metric.current > metric.target ? 'bg-red-500' : 'bg-green-500'}
                      style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Performance Timeline</h2>

          {isLoading || telemetry.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Collecting telemetry data...</p>
          ) : (
            <div className="space-y-6">
              {/* FPS Chart */}
              <div>
                <p className="text-sm text-slate-300 mb-2">Camera FPS</p>
                <div className="flex items-end gap-1 h-12 bg-slate-700/30 p-2 rounded">
                  {telemetry.slice(-30).map((t, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${(t.fpsCamera / 60) * 100}%` }}
                      title={`${t.fpsCamera} fps`}
                    />
                  ))}
                </div>
              </div>

              {/* Latency Chart */}
              <div>
                <p className="text-sm text-slate-300 mb-2">Inference Latency (ms)</p>
                <div className="flex items-end gap-1 h-12 bg-slate-700/30 p-2 rounded">
                  {telemetry.slice(-30).map((t, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.min((t.latencyMs / 100) * 100, 100)}%` }}
                      title={`${t.latencyMs} ms`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
