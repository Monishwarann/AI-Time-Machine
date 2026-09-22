import React from 'react';
import { Dna, Cpu, Database, Layers, Code, CheckCircle2 } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface ProjectDnaViewProps {
  project: TimeMachineProject;
}

export const ProjectDnaView: React.FC<ProjectDnaViewProps> = ({ project }) => {
  const dna = project.projectDna;

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-purple-500/30 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-base flex items-center space-x-2">
            <Dna className="w-5 h-5 text-purple-400" />
            <span>PROJECT DNA & TECHNICAL IDENTITY</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Deep analysis of repository languages, framework composition, design patterns, and database schemas.
          </p>
        </div>
        <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full font-bold">
          DNA VERIFIED
        </span>
      </div>

      {/* Languages Composition Bars */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">PROGRAMMING LANGUAGES DNA</h3>

        <div className="space-y-3">
          {Object.entries(dna.languagesPct).map(([lang, pct]) => (
            <div key={lang} className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="font-bold text-cyan-300">{lang}</span>
                <span>{pct}% Composition</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology DNA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 rounded-2xl bg-[#0b0e17]/90 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4" />
            <span>Architecture Style</span>
          </div>
          <p className="text-slate-200 text-sm font-bold pt-1">{dna.architectureType}</p>
          <p className="text-slate-400 text-[11px]">API Protocol: {dna.apiStyle}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b0e17]/90 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold border-b border-slate-800 pb-2">
            <Database className="w-4 h-4" />
            <span>Database Architecture</span>
          </div>
          <p className="text-slate-200 text-sm font-bold pt-1">{dna.databaseType}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0b0e17]/90 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <Cpu className="w-4 h-4" />
            <span>Design Patterns & ML</span>
          </div>
          <ul className="space-y-1 text-slate-300 font-mono text-[11px] pt-1">
            {dna.designPatterns.map((p, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
