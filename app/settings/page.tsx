'use client';

import { useState } from 'react';
import { Settings, AlertCircle, CheckCircle2, Wifi } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: true,
    refreshInterval: 5,
    theme: 'dark',
    alertThreshold: 80,
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-slate-400">Configure ANTRIKSH system preferences</p>
        </div>

        {/* System Status */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Backend Connection</p>
                <p className="text-white font-medium">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Database</p>
                <p className="text-white font-medium">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Vision Pipeline</p>
                <p className="text-white font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Display Settings</h2>

          <div className="space-y-4">
            {/* Auto Refresh */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded">
              <div>
                <p className="text-white font-medium">Auto-Refresh Dashboard</p>
                <p className="text-sm text-slate-400">Automatically refresh metrics</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={(e) => handleChange('autoRefresh', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </div>

            {/* Refresh Interval */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded">
              <div>
                <p className="text-white font-medium">Refresh Interval</p>
                <p className="text-sm text-slate-400">How often to update data (seconds)</p>
              </div>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.refreshInterval}
                onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                className="bg-slate-600 text-white px-3 py-2 rounded w-20 text-right"
              />
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded">
              <div>
                <p className="text-white font-medium">Theme</p>
                <p className="text-sm text-slate-400">Visual appearance</p>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="bg-slate-600 text-white px-3 py-2 rounded"
              >
                <option value="dark">Dark (Space)</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alert Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Alert Settings
          </h2>

          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded">
              <div>
                <p className="text-white font-medium">Enable Notifications</p>
                <p className="text-sm text-slate-400">Receive system alerts and warnings</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </div>

            {/* Alert Threshold */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded">
              <div>
                <p className="text-white font-medium">Alert Threshold</p>
                <p className="text-sm text-slate-400">Trigger alerts above (% CPU/Memory)</p>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.alertThreshold}
                onChange={(e) => handleChange('alertThreshold', parseInt(e.target.value))}
                className="bg-slate-600 text-white px-3 py-2 rounded w-20 text-right"
              />
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">System Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">ANTRIKSH Version</p>
              <p className="text-white font-medium">2.4.0</p>
            </div>
            <div>
              <p className="text-slate-400">Frontend Framework</p>
              <p className="text-white font-medium">Next.js 16.3.6</p>
            </div>
            <div>
              <p className="text-slate-400">Backend API</p>
              <p className="text-white font-medium">https://antriksh-sashakt-8.onrender.com</p>
            </div>
            <div>
              <p className="text-slate-400">Last Updated</p>
              <p className="text-white font-medium">28 September 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
