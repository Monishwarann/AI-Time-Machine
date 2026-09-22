import React from 'react';
import { AlertTriangle, ShieldAlert, FileCode, CheckCircle2, Info } from 'lucide-react';
import { TimeMachineProject, EvidenceConflict } from '../../types/timeMachine';

interface ConflictDetectorViewProps {
  project: TimeMachineProject;
}

export const ConflictDetectorView: React.FC<ConflictDetectorViewProps> = ({ project }) => {
  const conflicts = project.conflicts;

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-rose-500/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>EVIDENCE CONFLICT DETECTOR</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Identifies historical contradictions between file timestamps, source code routes, and documentation.
          </p>
        </div>
        <span className="text-xs bg-rose-950 text-rose-300 border border-rose-800 px-3 py-1 rounded-full font-bold">
          {conflicts.length} Discrepancies Discovered
        </span>
      </div>

      {/* Conflict List */}
      {conflicts.length > 0 ? (
        <div className="space-y-4">
          {conflicts.map(c => (
            <div key={c.id} className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>{c.title}</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded">
                  {c.severity} Severity Discrepancy
                </span>
              </div>

              {/* Conflicting Sources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {c.conflictingSources.map((src, i) => (
                  <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                    <div className="flex justify-between text-cyan-300 font-bold">
                      <span>{src.sourceName}</span>
                      <span>Claimed Era: {src.dateClaimed}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{src.detail}</p>
                  </div>
                ))}
              </div>

              {/* Explanations */}
              <div className="space-y-1.5 text-xs">
                <span className="text-amber-400 font-bold block uppercase text-[11px]">Possible Explanations:</span>
                <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                  {c.possibleExplanations.map((exp, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
          No historical evidence conflicts or timestamp contradictions detected across analyzed artifacts.
        </div>
      )}
    </div>
  );
};
