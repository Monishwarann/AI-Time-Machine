import React from 'react';
import { HelpCircle, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface NextBestEvidencePanelProps {
  project: TimeMachineProject;
}

export const NextBestEvidencePanel: React.FC<NextBestEvidencePanelProps> = ({ project }) => {
  const nbeList = project.nextBestEvidence;

  return (
    <div className="bg-[#0b0e17]/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>AI INVESTIGATION PLAN — NEXT BEST EVIDENCE</span>
        </h3>
        <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-0.5 rounded font-bold">
          Uncertainty Reduction Engine
        </span>
      </div>

      <div className="space-y-3">
        {nbeList.map(nbe => (
          <div key={nbe.id} className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
            <span className="text-[10px] text-amber-400 uppercase font-bold">Target Research Question</span>
            <h4 className="font-bold text-slate-100 text-xs">{nbe.targetQuestion}</h4>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1 text-[11px] text-slate-300">
              <div><span className="text-slate-400">Current Artifact Evidence:</span> {nbe.currentEvidence}</div>
              <div><span className="text-slate-400">Expected Reduction:</span> {nbe.expectedUncertaintyReduction}</div>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[10px] text-cyan-400 font-bold block uppercase">Recommended Artifacts to Upload:</span>
              <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                {nbe.recommendedArtifacts.map((art, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
