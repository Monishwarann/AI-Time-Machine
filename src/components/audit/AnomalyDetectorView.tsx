import React from 'react';
import { ShieldAlert, Zap, AlertTriangle, FileCode } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface AnomalyDetectorViewProps {
  project: TimeMachineProject;
}

export const AnomalyDetectorView: React.FC<AnomalyDetectorViewProps> = ({ project }) => {
  const anomalies = project.anomalies;

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>HISTORICAL ANOMALY DETECTOR</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Detects sudden architectural jumps, unexpected dependency additions, and un-staged structural shifts.
          </p>
        </div>
        <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-bold">
          {anomalies.length} Anomalies Tracked
        </span>
      </div>

      {/* Anomaly Cards */}
      {anomalies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {anomalies.map(a => (
            <div key={a.id} className="bg-[#0b0e17]/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">{a.type.replace('_', ' ')}</span>
                  <h3 className="font-bold text-slate-100 text-sm">{a.title}</h3>
                </div>
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold uppercase">
                  {a.severity}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-900">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
          No abrupt historical anomalies or un-staged architectural jumps detected.
        </div>
      )}
    </div>
  );
};
