import React from 'react';
import { Layers, FileCode, GitCommit, Cpu, Layout, Database, ShieldCheck } from 'lucide-react';
import { ChangeScorecard as ScorecardType } from '../../types/timeMachine';

interface ChangeScorecardProps {
  scorecard: ScorecardType;
}

export const ChangeScorecardView: React.FC<ChangeScorecardProps> = ({ scorecard }) => {
  const metrics = [
    { label: 'Versions Detected', val: scorecard.versionsDetected, icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { label: 'Files Analyzed', val: scorecard.filesAnalyzed, icon: <FileCode className="w-5 h-5 text-amber-400" /> },
    { label: 'Major Changes', val: scorecard.majorChanges, icon: <GitCommit className="w-5 h-5 text-purple-400" /> },
    { label: 'Technologies Detected', val: scorecard.technologiesDetected, icon: <Cpu className="w-5 h-5 text-emerald-400" /> },
    { label: 'Architecture Changes', val: scorecard.architectureChanges, icon: <Database className="w-5 h-5 text-cyan-400" /> },
    { label: 'UI Shifts Reconstructed', val: scorecard.uiChanges, icon: <Layout className="w-5 h-5 text-amber-400" /> },
    { label: 'Evidence Sources', val: scorecard.evidenceSources, icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-bold text-slate-100 text-sm">PROJECT EVOLUTION SCORECARD</h3>
        <span className="text-[10px] text-slate-400 uppercase">Measurable Forensic Telemetry</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        {metrics.map((m, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-2 text-center">
            <div className="mx-auto w-fit">{m.icon}</div>
            <div className="text-lg font-bold text-slate-100">{m.val}</div>
            <div className="text-[10px] text-slate-400 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
