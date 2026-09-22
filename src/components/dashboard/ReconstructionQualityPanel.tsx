import React from 'react';
import { ShieldCheck, Activity, HelpCircle } from 'lucide-react';
import { ReconstructionQuality } from '../../types/timeMachine';

interface ReconstructionQualityPanelProps {
  quality: ReconstructionQuality;
}

export const ReconstructionQualityPanel: React.FC<ReconstructionQualityPanelProps> = ({ quality }) => {
  const metrics = [
    { label: 'Evidence Coverage', pct: quality.evidenceCoveragePct, color: 'bg-cyan-400' },
    { label: 'Timeline Coverage', pct: quality.timelineCoveragePct, color: 'bg-amber-400' },
    { label: 'Metadata Availability', pct: quality.metadataAvailabilityPct, color: 'bg-emerald-400' },
    { label: 'Version Certainty', pct: quality.versionCertaintyPct, color: 'bg-purple-400' },
  ];

  return (
    <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-sm">RECONSTRUCTION COVERAGE INDICATORS</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase text-[10px]">
          Status: {quality.overallStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
            <div className="flex justify-between text-slate-300 text-[11px]">
              <span>{m.label}</span>
              <span className="font-bold text-slate-100">{m.pct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
