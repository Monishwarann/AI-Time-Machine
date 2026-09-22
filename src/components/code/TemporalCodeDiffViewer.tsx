import React, { useState } from 'react';
import { Code, FileDiff, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TimeMachineProject, ComponentEvolution } from '../../types/timeMachine';

interface TemporalCodeDiffViewerProps {
  project: TimeMachineProject;
}

export const TemporalCodeDiffViewer: React.FC<TemporalCodeDiffViewerProps> = ({ project }) => {
  const components = project.componentEvolutions;
  const [selectedComp, setSelectedComp] = useState<ComponentEvolution>(components[0] || components[0]);

  if (!components || components.length === 0) return null;

  return (
    <div className="space-y-8 font-mono text-xs">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-cyan-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <span>TEMPORAL CODE EXPLORER (FUNCTION & CLASS EVOLUTION)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracks semantic component continuity and code syntax evolution across historical eras.
          </p>
        </div>

        {/* Component Switcher */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {components.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedComp(c)}
              className={`px-3.5 py-1.5 rounded-xl capitalize font-bold transition-all border ${
                selectedComp.id === c.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {c.componentName}
            </button>
          ))}
        </div>
      </div>

      {/* Code Evolution Timeline Display */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-slate-100 text-xs">
            EVOLUTION OF `{selectedComp.componentName}` ({selectedComp.type.toUpperCase()})
          </span>
          <span className="text-[10px] text-cyan-400">First Observed: Era {selectedComp.firstObserved}</span>
        </div>

        <div className="space-y-6">
          {selectedComp.history.map((h, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                <span>Era {h.yearLabel} Revision</span>
                <span className="text-[10px] text-slate-400 font-normal">{h.changeNote}</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-cyan-200 border border-slate-900 overflow-x-auto text-[11px] font-mono leading-relaxed shadow-lg">
                {h.snippet}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
