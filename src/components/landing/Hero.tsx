import React from 'react';
import { Upload, Play, Sparkles, ShieldCheck, GitCommit, FileDiff, Cpu, Layers, GitBranch, Search, HelpCircle, FileSearch, Scale } from 'lucide-react';
import { TimelineBackground } from './TimelineBackground';
import { projectStore } from '../../store/projectStore';
import { TimeMachineProject } from '../../types/timeMachine';

interface HeroProps {
  onOpenUpload: () => void;
  onSelectDemo: (demoId: string) => void;
  onExploreFeatures: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenUpload, onSelectDemo, onExploreFeatures }) => {
  const demoProjects = projectStore.getProjects().filter(p => p.id.startsWith('demo'));

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      <TimelineBackground />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-lg shadow-cyan-500/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>AI-Powered Historical Reconstruction Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="text-[10px] text-cyan-400/80 uppercase tracking-wider">v1.0 Operational</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans text-slate-100">
            AI TIME MACHINE <span className="inline-block animate-bounce">⏳</span>
          </h1>
          <p className="text-xl sm:text-2xl font-mono font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-amber-300 max-w-3xl mx-auto">
            “Reconstruct the evolution of your digital artifacts.”
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Upload an old software project, website, document, codebase, or dataset and use AI to reconstruct its probable history, discover major changes, compare versions, and explore how it may have evolved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenUpload}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Artifact</span>
          </button>

          <button
            onClick={() => onSelectDemo(demoProjects[0]?.id || 'demo-ai-platform')}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-300 font-mono text-sm shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Try Interactive Demo</span>
          </button>

          <button
            onClick={onExploreFeatures}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 font-mono text-xs transition-all border border-transparent hover:border-slate-800"
          >
            <span>Explore Features</span>
          </button>
        </div>

        {/* Animated Timeline Diagram Requirement Section */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="bg-[#0b0e17]/90 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>PAST</span>
              </span>
              <span className="text-cyan-300 font-semibold tracking-widest uppercase text-[11px]">
                RECONSTRUCTED CHRONOLOGY
              </span>
              <span className="flex items-center gap-2">
                <span>POSSIBLE</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </span>
            </div>

            {/* Interactive Strand visualization */}
            <div className="relative py-6 flex items-center justify-between font-mono">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 via-cyan-400 to-amber-500 -translate-y-1/2 opacity-70"></div>

              {[
                { year: '2019', label: 'Initial Concept', conf: 'VERIFIED', color: 'bg-emerald-400 border-emerald-300' },
                { year: '2020', label: 'Prototype', conf: 'STRONGLY SUPPORTED', color: 'bg-cyan-400 border-cyan-200' },
                { year: '2021', label: 'Database Added', conf: 'STRONGLY SUPPORTED', color: 'bg-cyan-400 border-cyan-200' },
                { year: '2022', label: 'Auth Added', conf: 'PLAUSIBLE', color: 'bg-amber-400 border-amber-200' },
                { year: '2023', label: 'AI Module', conf: 'STRONGLY SUPPORTED', color: 'bg-cyan-400 border-cyan-200' },
                { year: '2024', label: 'UI Redesign', conf: 'VERIFIED', color: 'bg-emerald-400 border-emerald-300' },
                { year: 'Current', label: 'Present State', conf: 'VERIFIED', color: 'bg-purple-400 border-purple-200' },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center group cursor-pointer">
                  <span className="text-[10px] text-cyan-400/80 font-mono mb-2 group-hover:text-cyan-200 transition-colors">
                    {step.year}
                  </span>
                  <div className={`w-4 h-4 rounded-full ${step.color} border-2 shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform duration-300`}></div>
                  <span className="text-[11px] font-semibold text-slate-200 mt-2 text-center group-hover:text-amber-300 transition-colors max-w-[80px]">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left pt-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <FileSearch className="w-5 h-5 text-cyan-400 mb-2" />
            <h3 className="text-xs font-mono font-bold text-slate-200 mb-1">Evidence Extraction</h3>
            <p className="text-[11px] text-slate-400">Scans ASTs, timestamps, package manifests, and schemas to find evolution signals.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
            <Scale className="w-5 h-5 text-amber-400 mb-2" />
            <h3 className="text-xs font-mono font-bold text-slate-200 mb-1">Strict Confidence System</h3>
            <p className="text-[11px] text-slate-400">Separates verified facts from AI inferences. Never presents speculation as confirmed fact.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
            <GitBranch className="w-5 h-5 text-purple-400 mb-2" />
            <h3 className="text-xs font-mono font-bold text-slate-200 mb-1">"What-If?" Branching</h3>
            <p className="text-[11px] text-slate-400">Explore hypothetical alternative evolution paths clearly labeled HYPOTHETICAL.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <Cpu className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="text-xs font-mono font-bold text-slate-200 mb-1">RAG Historical Assistant</h3>
            <p className="text-[11px] text-slate-400">Interactive chatbot grounded in project evidence with exact file citations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
