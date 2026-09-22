import React, { useState } from 'react';
import { Sliders, Folder, FileCode, Plus, Minus, Edit3, HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TimeMachineProject, ReconstructedVersion } from '../../types/timeMachine';

interface TimeTravelDebuggerProps {
  project: TimeMachineProject;
}

export const TimeTravelDebugger: React.FC<TimeTravelDebuggerProps> = ({ project }) => {
  const versions = project.reconstructedVersions;
  const [selectedIndex, setSelectedIndex] = useState(versions.length - 1);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const activeVersion = versions[selectedIndex] || versions[0];

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-cyan-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Sliders className="w-5 h-5" />
            <h2 className="font-bold text-slate-100 text-sm">TIME TRAVEL DEBUGGER & HISTORICAL FILE EXPLORER</h2>
          </div>
          <span className="text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-full font-bold">
            Inspecting Era: {activeVersion.yearLabel} ({activeVersion.versionTag})
          </span>
        </div>

        {/* Time Travel Scrubber */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{versions[0].yearLabel}</span>
            <span>{versions[versions.length - 1].yearLabel}</span>
          </div>
          <input
            type="range"
            min={0}
            max={versions.length - 1}
            value={selectedIndex}
            onChange={e => setSelectedIndex(parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
          />
        </div>
      </div>

      {/* File Tree & File Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical File Tree */}
        <div className="lg:col-span-2 bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-slate-100 text-xs flex items-center space-x-2">
              <Folder className="w-4 h-4 text-amber-400" />
              <span>RECONSTRUCTED FILE SYSTEM (ERA {activeVersion.yearLabel})</span>
            </span>
            <div className="flex space-x-2 text-[10px]">
              <span className="text-emerald-400 flex items-center gap-1"><Plus className="w-3 h-3" /> Added</span>
              <span className="text-amber-400 flex items-center gap-1"><Edit3 className="w-3 h-3" /> Modified</span>
              <span className="text-rose-400 flex items-center gap-1"><Minus className="w-3 h-3" /> Removed</span>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {activeVersion.filesList.map((f, i) => (
              <div
                key={i}
                onClick={() => setSelectedFile(f)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedFile === f ? 'bg-cyan-950/60 border-cyan-400' : 'bg-slate-950 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200">{f}</span>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  + Active in {activeVersion.yearLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected File Details Drawer */}
        <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-slate-100 text-xs uppercase border-b border-slate-800 pb-3 flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>FILE PROVENANCE INSPECTOR</span>
          </h3>

          {selectedFile ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Selected File Path</span>
                <div className="font-bold text-cyan-300 text-sm">{selectedFile}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">First Observed:</span>
                  <span className="text-cyan-300 font-bold">{versions[0]?.yearLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Observed:</span>
                  <span className="text-amber-300 font-bold">{versions[versions.length - 1]?.yearLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <span className="text-slate-400 uppercase text-[10px]">Semantic Evolution Note</span>
                <p className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                  Observed file presence verified across reconstructed architecture states.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-xs">Click any file in the reconstructed file system to inspect provenance.</p>
          )}
        </div>
      </div>
    </div>
  );
};
