import React from 'react';
import { Activity, ShieldCheck, HelpCircle } from 'lucide-react';
import { TimelineEvent } from '../../types/timeMachine';

interface EvidenceHeatmapProps {
  events: TimelineEvent[];
}

export const EvidenceHeatmap: React.FC<EvidenceHeatmapProps> = ({ events }) => {
  const years = Array.from(new Set(events.map(e => e.date))).sort();
  
  const getYearDensity = (yr: string) => {
    const yrEvents = events.filter(e => e.date === yr);
    return yrEvents.reduce((sum, e) => sum + e.evidence.length, 0) || 1;
  };

  const maxDensity = Math.max(...years.map(y => getYearDensity(y)), 1);

  return (
    <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200">EVIDENCE DENSITY HEATMAP</span>
        </div>
        <span className="text-[10px] text-slate-400">Strong vs Weak Evidence Coverage</span>
      </div>

      <div className="space-y-2">
        {years.map(yr => {
          const density = getYearDensity(yr);
          const pct = Math.min(100, Math.max(10, Math.round((density / maxDensity) * 100)));
          const confidence = events.find(e => e.date === yr)?.confidence || 'plausible';

          return (
            <div key={yr} className="flex items-center space-x-3 text-[11px]">
              <span className="w-12 text-cyan-300 font-bold">{yr}</span>
              <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    confidence === 'verified'
                      ? 'bg-emerald-400'
                      : confidence === 'strongly_supported'
                      ? 'bg-cyan-400'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
              <span className="w-16 text-right text-slate-400">{density} signals</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
