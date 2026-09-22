import React from 'react';
import { Bone, ShieldCheck, History, CheckCircle2, AlertCircle } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface LostAndSurvivedViewProps {
  project: TimeMachineProject;
}

export const LostAndSurvivedView: React.FC<LostAndSurvivedViewProps> = ({ project }) => {
  return (
    <div className="space-y-8 font-mono text-xs">
      {/* Survived Components */}
      <div className="bg-[#0b0e17]/90 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-emerald-300 text-sm flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>"WHAT SURVIVED?" DASHBOARD (PERSISTENT COMPONENTS)</span>
          </span>
          <span className="text-[10px] text-slate-400">Observed Across All Historical Eras</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
            <span className="font-bold text-slate-100 block">Core Script Engine (`main.py`)</span>
            <span className="text-[10px] text-emerald-400">Observed 2019 ─────────────── 2025</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
            <span className="font-bold text-slate-100 block">Relational Database Models</span>
            <span className="text-[10px] text-emerald-400">Observed 2021 ─────────────── 2025</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
            <span className="font-bold text-slate-100 block">Authentication & Security</span>
            <span className="text-[10px] text-emerald-400">Observed 2022 ─────────────── 2025</span>
          </div>
        </div>
      </div>

      {/* Disappeared / Removed Components */}
      <div className="bg-[#0b0e17]/90 border border-amber-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-amber-300 text-sm flex items-center space-x-2">
            <Bone className="w-5 h-5 text-amber-400" />
            <span>"WHAT DISAPPEARED?" DASHBOARD (LOST COMPONENTS)</span>
          </span>
          <span className="text-[10px] text-slate-400">Last Observed In Earlier Artifacts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.digitalFossils.map(f => (
            <div key={f.id} className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
              <span className="font-bold text-slate-100 block">{f.name}</span>
              <span className="text-[10px] text-rose-400">Last Observed: {f.lastObserved}</span>
              <p className="text-[11px] text-slate-400 pt-1">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
