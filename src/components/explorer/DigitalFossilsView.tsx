import React from 'react';
import { Bone, Search, AlertCircle, ShieldCheck, History, Clock, FileText } from 'lucide-react';
import { TimeMachineProject, DigitalFossil } from '../../types/timeMachine';

interface DigitalFossilsViewProps {
  project: TimeMachineProject;
}

export const DigitalFossilsView: React.FC<DigitalFossilsViewProps> = ({ project }) => {
  const fossils = project.digitalFossils;

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Bone className="w-5 h-5 text-amber-400" />
            <span>DIGITAL FOSSILS & FIRST APPEARANCE DETECTOR</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Discovers legacy code traces, deprecated dependencies, orphan configs, and old framework signatures.
          </p>
        </div>
        <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-bold">
          {fossils.length} Fossils Detected
        </span>
      </div>

      {/* Grid */}
      {fossils.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fossils.map(f => (
            <div key={f.id} className="bg-[#0b0e17]/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">{f.type} Fossil</span>
                  <h3 className="font-bold text-slate-100 text-sm">{f.name}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${
                  f.currentStatus === 'deprecated' ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}>
                  {f.currentStatus}
                </span>
              </div>

              {/* First Appearance Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>First Observed:</span>
                  <span className="text-cyan-300 font-bold">{f.firstObserved}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Observed:</span>
                  <span className="text-amber-300 font-bold">{f.lastObserved}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {f.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300">Supporting Evidence Lines:</span>
                {f.evidence.map((e, i) => (
                  <div key={i} className="text-[10px] bg-slate-900 p-1.5 rounded border border-slate-800/60 truncate font-mono text-cyan-200">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
          No legacy digital fossils detected in this project snapshot.
        </div>
      )}
    </div>
  );
};
