'use client';

import { Satellite } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
            <Satellite className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ANTRIKSH</h1>
            <p className="text-xs text-slate-400">AI Human Activity Recognition for BAS</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-300">Bharatiya Antariksh Station</p>
          <p className="text-xs text-slate-500">Mission Control System</p>
        </div>
      </div>
    </header>
  );
}
