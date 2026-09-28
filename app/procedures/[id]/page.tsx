'use client';

import { useEffect, useState } from 'react';
import { api, Procedure } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProcedureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProcedure = async () => {
      if (typeof params.id === 'string') {
        const data = await api.getProcedureById(params.id);
        setProcedure(data);
        setIsLoading(false);
      }
    };

    fetchProcedure();
    const interval = setInterval(fetchProcedure, 3000);

    return () => clearInterval(interval);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-slate-400">Loading procedure...</p>
        </div>
      </div>
    );
  }

  if (!procedure) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <p className="text-slate-400">Procedure not found</p>
        </div>
      </div>
    );
  }

  const progress = (procedure.stepsCompleted / procedure.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Procedures
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{procedure.name}</h1>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200">
              {procedure.status.charAt(0).toUpperCase() + procedure.status.slice(1)}
            </span>
          </div>
          <p className="text-slate-400">ID: {procedure.id}</p>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Execution Progress</h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Step Completion</span>
              <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Counter */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded p-4 text-center">
              <p className="text-2xl font-bold text-white">{procedure.stepsCompleted}</p>
              <p className="text-xs text-slate-400 mt-1">Steps Completed</p>
            </div>
            <div className="bg-slate-700/50 rounded p-4 text-center">
              <p className="text-2xl font-bold text-slate-300">{procedure.totalSteps - procedure.stepsCompleted}</p>
              <p className="text-xs text-slate-400 mt-1">Steps Remaining</p>
            </div>
            <div className="bg-slate-700/50 rounded p-4 text-center">
              <p className="text-2xl font-bold text-white">{procedure.totalSteps}</p>
              <p className="text-xs text-slate-400 mt-1">Total Steps</p>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Procedure Details</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Start Time</p>
                <p className="text-white font-medium">
                  {new Date(procedure.startTime).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Expected Duration</p>
                <p className="text-white font-medium">{procedure.expectedDuration} minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Status</p>
                <p className="text-white font-medium capitalize">{procedure.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
