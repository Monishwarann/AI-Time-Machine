import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileCode, Lock, Sparkles } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface ClaimLedgerViewProps {
  project: TimeMachineProject;
}

export const ClaimLedgerView: React.FC<ClaimLedgerViewProps> = ({ project }) => {
  const claims = project.claimLedger;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-emerald-500/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>CLAIM LEDGER & AI HALLUCINATION FIREWALL</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every significant AI statement is registered as a claim and cross-checked against physical evidence objects.
          </p>
        </div>
        <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold">
          {claims.length} Claims Tracked
        </span>
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {claims.map(c => (
          <div key={c.claimId} className="p-4 rounded-2xl bg-[#0b0e17]/90 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-300 font-mono text-xs">{c.claimId}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded uppercase font-bold ${
                c.status === 'supported' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {c.status}
              </span>
            </div>

            <p className="text-slate-100 text-xs font-bold leading-relaxed">{c.statement}</p>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center space-x-2">
                <span>Supporting Evidence IDs:</span>
                {c.supportingEvidenceIds.map(evId => (
                  <span key={evId} className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-mono">
                    {evId}
                  </span>
                ))}
              </div>

              {c.uncertainty && (
                <span className="text-amber-400 text-[10px]">⚠️ {c.uncertainty}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
