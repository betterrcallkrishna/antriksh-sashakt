'use client';

import { useEffect, useState } from 'react';
import { api, Procedure } from '@/lib/api';
import Link from 'next/link';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

export default function ProceduresPage() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProcedures = async () => {
      const data = await api.getProcedures();
      setProcedures(data);
      setIsLoading(false);
    };

    fetchProcedures();
    const interval = setInterval(fetchProcedures, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900 text-green-200';
      case 'completed':
        return 'bg-blue-900 text-blue-200';
      default:
        return 'bg-slate-700 text-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Procedures</h1>
          <p className="text-slate-400">
            Monitoring {procedures.length} experiment procedures
          </p>
        </div>

        {/* Procedures List */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-slate-400">Loading procedures...</p>
          ) : procedures.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
              <p className="text-slate-400">No procedures available</p>
            </div>
          ) : (
            procedures.map((proc) => (
              <Link
                key={proc.id}
                href={`/procedures/${proc.id}`}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 hover:bg-slate-750 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{proc.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proc.status)}`}>
                        {proc.status.charAt(0).toUpperCase() + proc.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{proc.id}</p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Progress</span>
                        <span className="text-xs text-slate-300 font-medium">
                          {proc.stepsCompleted} / {proc.totalSteps} steps
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                          style={{
                            width: `${(proc.stepsCompleted / proc.totalSteps) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(proc.startTime).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Est. {proc.expectedDuration} min
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-400 ml-4" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
