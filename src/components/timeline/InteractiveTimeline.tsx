import React, { useState } from 'react';
import { TimelineEvent, ConfidenceLevel, EventCategory } from '../../types/timeMachine';
import { ShieldCheck, HelpCircle, FileText, Database, Lock, Code, Sparkles, Filter, ChevronRight, AlertTriangle } from 'lucide-react';
import { EvidenceHeatmap } from './EvidenceHeatmap';
import { VersionSlider } from './VersionSlider';
import { TimeMachineProject } from '../../types/timeMachine';

interface InteractiveTimelineProps {
  project: TimeMachineProject;
  onSelectEvent: (event: TimelineEvent) => void;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ project, onSelectEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');

  const getConfidenceBadge = (level: ConfidenceLevel) => {
    switch (level) {
      case 'verified':
        return { label: 'VERIFIED', color: 'bg-emerald-950 text-emerald-300 border-emerald-800' };
      case 'strongly_supported':
        return { label: 'STRONGLY SUPPORTED', color: 'bg-cyan-950 text-cyan-300 border-cyan-800' };
      case 'plausible':
        return { label: 'PLAUSIBLE', color: 'bg-amber-950 text-amber-300 border-amber-800' };
      case 'speculative':
        return { label: 'SPECULATIVE', color: 'bg-purple-950 text-purple-300 border-purple-800' };
      default:
        return { label: 'UNKNOWN', color: 'bg-slate-900 text-slate-400 border-slate-700' };
    }
  };

  const categories = [
    'all', 'initial_concept', 'architecture', 'feature', 'database', 'security', 'ui', 'refactoring'
  ];

  const filteredEvents = project.timelineEvents.filter(e => {
    const matchCat = selectedCategory === 'all' || e.type === selectedCategory;
    const matchConf = selectedConfidence === 'all' || e.confidence === selectedConfidence;
    return matchCat && matchConf;
  });

  return (
    <div className="space-y-8 font-mono">
      {/* Version Slider Component */}
      <VersionSlider versions={project.reconstructedVersions} />

      {/* Timeline Controls & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="font-bold">Filter Categories:</span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl capitalize transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Horizontal & Vertical Timeline Display */}
      <div className="bg-[#0b0e17]/90 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-bold text-slate-100 text-base flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>RECONSTRUCTED HISTORICAL TIMELINE</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any historical event node to inspect supporting file evidence & confidence proofs.
            </p>
          </div>
          <span className="text-xs text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            {filteredEvents.length} Events Tracked
          </span>
        </div>

        {/* Timeline Strand Node Chain */}
        <div className="relative border-l-2 border-cyan-500/30 pl-6 sm:pl-8 space-y-8 ml-3 sm:ml-4">
          {filteredEvents.map((evt, idx) => {
            const confBadge = getConfidenceBadge(evt.confidence);
            return (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="relative group cursor-pointer"
              >
                {/* Node Bullet Circle */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#0a0d14] border-2 border-cyan-400 group-hover:border-amber-400 group-hover:scale-125 transition-all shadow-lg shadow-cyan-500/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-amber-400"></div>
                </div>

                {/* Event Card */}
                <div className="bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 shadow-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-bold text-cyan-300">{evt.date}</span>
                      <span className="text-xs uppercase text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {evt.type.replace('_', ' ')}
                      </span>
                    </div>

                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${confBadge.color}`}>
                      {confBadge.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Evidence Pills Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{evt.evidence.length} Evidence Sources</span>
                    </div>

                    <span className="flex items-center text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Inspect Proofs <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Density Heatmap Component */}
      <EvidenceHeatmap events={project.timelineEvents} />
    </div>
  );
};
