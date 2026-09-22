import React, { useState } from 'react';
import { FileDiff, Plus, Minus, ArrowRight, Sparkles, Layers, Package, Code } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';
import { generateWhatChangedAnalysis } from '../../engine/aiAssistantEngine';

interface DiffViewerProps {
  project: TimeMachineProject;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ project }) => {
  const versions = project.reconstructedVersions;
  const [versionAId, setVersionAId] = useState(versions[0]?.yearLabel || '2019');
  const [versionBId, setVersionBId] = useState(versions[versions.length - 1]?.yearLabel || '2025');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const vA = versions.find(v => v.yearLabel === versionAId) || versions[0];
  const vB = versions.find(v => v.yearLabel === versionBId) || versions[versions.length - 1];

  const handleExplainEvolution = () => {
    const analysis = generateWhatChangedAnalysis(project, versionAId, versionBId);
    setAiAnalysis(analysis);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Selection Control */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400">
          <FileDiff className="w-5 h-5" />
          <h2 className="font-bold text-slate-100 text-sm">HISTORICAL VERSION COMPARISON (DIFF ENGINE)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400">Baseline (Version A):</label>
            <select
              value={versionAId}
              onChange={e => {
                setVersionAId(e.target.value);
                setAiAnalysis(null);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
            >
              {versions.map(v => (
                <option key={v.id} value={v.yearLabel}>{v.yearLabel} — {v.versionTag}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400">Target (Version B):</label>
            <select
              value={versionBId}
              onChange={e => {
                setVersionBId(e.target.value);
                setAiAnalysis(null);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 focus:outline-none focus:border-cyan-500"
            >
              {versions.map(v => (
                <option key={v.id} value={v.yearLabel}>{v.yearLabel} — {v.versionTag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Version A Box */}
        <div className="bg-[#0b0e17]/90 border border-cyan-500/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-cyan-300 font-bold text-sm">ERA {vA?.yearLabel} STATE</span>
            <span className="text-[10px] text-slate-400 font-mono">{vA?.filesCount} Files</span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-slate-400 block font-bold">Architecture:</span>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1 text-slate-300">
              <div>UI: {vA?.architecture.frontend || 'Standard'}</div>
              <div>Backend: {vA?.architecture.backend || 'Standard'}</div>
              <div>DB: {vA?.architecture.database || 'Flat storage'}</div>
            </div>
          </div>
        </div>

        {/* Version B Box */}
        <div className="bg-[#0b0e17]/90 border border-amber-500/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-300 font-bold text-sm">ERA {vB?.yearLabel} STATE</span>
            <span className="text-[10px] text-slate-400 font-mono">{vB?.filesCount} Files</span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-slate-400 block font-bold">Architecture:</span>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1 text-slate-300">
              <div>UI: {vB?.architecture.frontend || 'Standard'}</div>
              <div>Backend: {vB?.architecture.backend || 'Standard'}</div>
              <div>DB: {vB?.architecture.database || 'Flat storage'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Diff Highlights */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="font-bold text-slate-100 text-sm">STRUCTURAL SHIFTS & EVOLUTION DIFF</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Added Files */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Plus className="w-4 h-4" />
              <span>Files Added in Era {vB?.yearLabel}</span>
            </div>
            <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
              {vB?.filesList.slice(0, 5).map((f, i) => (
                <li key={i} className="flex items-center space-x-1.5">
                  <span className="text-emerald-400">+</span>
                  <span className="truncate">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dependencies Changed */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-bold">
              <Package className="w-4 h-4" />
              <span>Dependency Version Travel</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-300">
              {Object.keys(vB?.dependencies || {}).length > 0 ? (
                Object.entries(vB?.dependencies || {}).slice(0, 4).map(([pkg, ver]) => (
                  <div key={pkg} className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span>{pkg}</span>
                    <span className="text-purple-300">{vA?.dependencies[pkg] || 'new'} → {ver}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-400">No external dependencies detected.</span>
              )}
            </div>
          </div>
        </div>

        {/* Explain Evolution AI Button */}
        <div className="pt-2">
          <button
            onClick={handleExplainEvolution}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain Evolution (AI Reasoning)</span>
          </button>
        </div>

        {/* AI Analysis Result */}
        {aiAnalysis && (
          <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 leading-relaxed space-y-3">
            <div className="flex items-center space-x-2 text-cyan-300 font-bold border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>EVIDENCE-BASED RECONSTRUCTION REPORT</span>
            </div>
            <div className="whitespace-pre-line font-mono text-[11px] text-slate-200">
              {aiAnalysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
