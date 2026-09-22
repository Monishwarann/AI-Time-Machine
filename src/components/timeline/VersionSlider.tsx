import React, { useState, useEffect } from 'react';
import { Sliders, Layers, Code, CheckCircle, Package, Play, Pause, RotateCcw } from 'lucide-react';
import { ReconstructedVersion } from '../../types/timeMachine';

interface VersionSliderProps {
  versions: ReconstructedVersion[];
  onVersionSelect?: (version: ReconstructedVersion) => void;
}

export const VersionSlider: React.FC<VersionSliderProps> = ({ versions, onVersionSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(versions.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVersion = versions[selectedIndex] || versions[0];

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedIndex(prev => {
          const next = prev + 1;
          if (next >= versions.length) {
            setIsPlaying(false);
            return prev;
          }
          if (versions[next] && onVersionSelect) {
            onVersionSelect(versions[next]);
          }
          return next;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, versions, onVersionSelect]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value);
    setSelectedIndex(idx);
    if (versions[idx] && onVersionSelect) {
      onVersionSelect(versions[idx]);
    }
  };

  const togglePlay = () => {
    if (selectedIndex >= versions.length - 1) {
      setSelectedIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  if (!versions || versions.length === 0) return null;

  return (
    <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-6 font-mono">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 hover:from-cyan-400 hover:to-amber-300'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
                <span>Pause Auto-Play</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Play Timeline Evolution</span>
              </>
            )}
          </button>

          <h3 className="font-bold text-slate-100 text-sm hidden sm:block">HISTORICAL VERSION SCRUBBER</h3>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Reconstructed Era:</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            {activeVersion.yearLabel} ({activeVersion.versionTag})
          </span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{versions[0].yearLabel}</span>
          <span>{versions[versions.length - 1].yearLabel}</span>
        </div>
        <input
          type="range"
          min={0}
          max={versions.length - 1}
          value={selectedIndex}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
        />
        <div className="flex justify-between text-[11px] text-slate-400 pt-1">
          {versions.map((v, idx) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedIndex(idx);
                if (onVersionSelect) onVersionSelect(v);
              }}
              className={`transition-all ${idx === selectedIndex ? 'text-cyan-300 font-bold underline scale-110' : 'hover:text-slate-200'}`}
            >
              {v.yearLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Active State Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Architecture */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <Layers className="w-4 h-4" />
            <span>Architecture State</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div><span className="text-slate-400">Frontend:</span> {activeVersion.architecture.frontend || 'None'}</div>
            <div><span className="text-slate-400">Backend:</span> {activeVersion.architecture.backend || 'None'}</div>
            <div><span className="text-slate-400">Database:</span> {activeVersion.architecture.database || 'None'}</div>
            <div><span className="text-slate-400">Security:</span> {activeVersion.architecture.auth || 'None'}</div>
          </div>
        </div>

        {/* Tracked Files & Features */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Code className="w-4 h-4" />
            <span>Active Modules ({activeVersion.filesCount})</span>
          </div>
          <ul className="space-y-1 text-[11px] text-slate-300 max-h-24 overflow-y-auto">
            {activeVersion.featuresList.map((f, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dependencies */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 font-bold">
            <Package className="w-4 h-4" />
            <span>Package Dependencies</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300 max-h-24 overflow-y-auto">
            {Object.keys(activeVersion.dependencies).length > 0 ? (
              Object.entries(activeVersion.dependencies).map(([pkg, ver]) => (
                <div key={pkg} className="flex justify-between font-mono">
                  <span className="text-slate-300">{pkg}</span>
                  <span className="text-cyan-400">{ver}</span>
                </div>
              ))
            ) : (
              <span className="text-slate-400">No external manifest libraries</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
