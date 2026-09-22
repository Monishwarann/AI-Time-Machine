import React from 'react';
import { Layers, Calendar, ShieldCheck, Compass, FileText, Database, Code, Activity, Trash2 } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';
import { projectStore } from '../../store/projectStore';

interface ProjectCardProps {
  project: TimeMachineProject;
  onSelect: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getConfidenceBadge = (score: string) => {
    switch (score.toLowerCase()) {
      case 'high':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'medium':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800';
      default:
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
    }
  };

  const getArtifactIcon = (type: string) => {
    if (type.includes('Dataset')) return <Database className="w-4 h-4 text-purple-400" />;
    if (type.includes('Document')) return <FileText className="w-4 h-4 text-amber-400" />;
    return <Code className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="group relative bg-[#0b0e17]/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-cyan-500/10 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
              {getArtifactIcon(project.artifactType)}
            </div>
            <div>
              <h3 className="font-mono font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">
                {project.name}
              </h3>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {project.artifactType}
              </span>
            </div>
          </div>

          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getConfidenceBadge(project.confidenceScore)}`}>
            {project.confidenceScore} Confidence
          </span>
        </div>

        {/* Timeline Range Visual */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5 text-[11px]">
            <span>Historical Coverage</span>
            <span className="text-cyan-300 font-semibold">{project.estimatedCoverage}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
            <div className="w-full bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500"></div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-400">
          <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <span>Versions:</span>
            <span className="text-cyan-300 font-bold">{project.versionCount}</span>
          </div>
          <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex items-center justify-between">
            <span>Evidence:</span>
            <span className="text-amber-300 font-bold">{project.evidenceCount} pts</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">
          Analyzed {project.lastAnalyzedDate}
        </span>

        <button
          onClick={() => onSelect(project.id)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 font-mono text-xs transition-all shadow-md"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Explore Timeline</span>
        </button>
      </div>
    </div>
  );
};
