import React, { useState } from 'react';
import { GitBranch, Sparkles, AlertTriangle, ArrowRight, Layers, Play } from 'lucide-react';
import { TimeMachineProject, WhatIfBranch } from '../../types/timeMachine';
import { projectStore } from '../../store/projectStore';

interface WhatIfBranchGeneratorProps {
  project: TimeMachineProject;
}

export const WhatIfBranchGenerator: React.FC<WhatIfBranchGeneratorProps> = ({ project }) => {
  const [baseVersion, setBaseVersion] = useState(project.reconstructedVersions[0]?.yearLabel || '2021');
  const [promptInput, setPromptInput] = useState('');
  const [branchNameInput, setBranchNameInput] = useState('');
  const [activeBranch, setActiveBranch] = useState<WhatIfBranch | null>(project.whatIfBranches[0] || null);

  const handleGenerateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput) return;

    const name = branchNameInput || `What-If: ${promptInput.slice(0, 25)}...`;
    projectStore.addWhatIfBranch(project.id, name, baseVersion, promptInput);
    
    // Select newly added branch
    const updated = projectStore.getActiveProject();
    if (updated && updated.whatIfBranches.length > 0) {
      setActiveBranch(updated.whatIfBranches[updated.whatIfBranches.length - 1]);
    }

    setPromptInput('');
    setBranchNameInput('');
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-purple-500/30 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <GitBranch className="w-6 h-6" />
          <h2 className="font-bold text-slate-100 text-base">"WHAT IF?" ALTERNATIVE TIMELINE EXPLORER</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Simulate alternative technological evolution paths by introducing hypothetical branch decisions.
        </p>

        {/* Mandatory Watermark Warning */}
        <div className="p-3 bg-purple-950/60 border border-purple-800/60 rounded-xl text-purple-300 text-xs flex items-center space-x-2 font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>HYPOTHETICAL SCENARIOS ARE FOR EXPLORATION ONLY — NEVER PRESENTED AS HISTORICAL FACT.</span>
        </div>
      </div>

      {/* Generator Form & Branch List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Box */}
        <form onSubmit={handleGenerateBranch} className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-slate-200 text-xs uppercase flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Generate Alternative Scenario</span>
          </h3>

          <div className="space-y-1 text-xs">
            <label className="text-slate-400">Divergence Base Version:</label>
            <select
              value={baseVersion}
              onChange={e => setBaseVersion(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
            >
              {project.reconstructedVersions.map(v => (
                <option key={v.id} value={v.yearLabel}>{v.yearLabel} ({v.versionTag})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-400">Scenario Prompt ("What if..."):</label>
            <textarea
              required
              rows={3}
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
              placeholder="e.g. What if the codebase had remained a single monolithic application instead of introducing microservices?"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Simulate Branch Evolution</span>
          </button>
        </form>

        {/* Hypothetical Branch Display */}
        <div className="lg:col-span-2 bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm">ACTIVE ALTERNATIVE BRANCH</h3>
            {activeBranch && (
              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded uppercase font-bold">
                HYPOTHETICAL — NOT FACT
              </span>
            )}
          </div>

          {activeBranch ? (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/60 space-y-2">
                <span className="text-[10px] text-purple-400 font-bold uppercase">Branch Scenario</span>
                <h4 className="font-bold text-slate-100 text-sm">{activeBranch.branchName}</h4>
                <p className="text-xs text-slate-300">"{activeBranch.scenarioPrompt}"</p>
              </div>

              {/* Hypothetical Event Timeline strand */}
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-bold block uppercase">Simulated Chronology</span>
                <div className="space-y-3 border-l-2 border-purple-500/40 pl-4 ml-2">
                  {activeBranch.hypotheticalTimeline.map(he => (
                    <div key={he.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-purple-300">{he.date}</span>
                        <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 uppercase font-bold">
                          {he.status}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-100 text-xs">{he.title}</h5>
                      <p className="text-[11px] text-slate-400">{he.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              No hypothetical branches created yet. Generate your first "What If?" scenario using the generator form.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
