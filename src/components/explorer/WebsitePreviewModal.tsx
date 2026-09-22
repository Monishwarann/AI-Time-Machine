import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Globe, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { ReconstructedVersion } from '../../types/timeMachine';

interface WebsitePreviewModalProps {
  version: ReconstructedVersion;
  onClose: () => void;
}

export const WebsitePreviewModal: React.FC<WebsitePreviewModalProps> = ({ version, onClose }) => {
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getViewportWidth = () => {
    switch (deviceViewport) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-4xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6 font-mono max-h-[95vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-sm">
                RECONSTRUCTED WEBSITE PREVIEW — ERA {version.yearLabel}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                UI Frame Simulation ({version.architecture.frontend || 'React/HTML5'})
              </p>
            </div>
          </div>

          {/* Viewport Device Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setDeviceViewport('desktop')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                deviceViewport === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDeviceViewport('tablet')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                deviceViewport === 'tablet' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDeviceViewport('mobile')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                deviceViewport === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Browser Device Frame */}
        <div className={`mx-auto bg-[#07090e] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${getViewportWidth()}`}>
          {/* Browser Address Bar Header */}
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="px-4 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 truncate max-w-sm">
              https://reconstructed-ui-{version.yearLabel}.archive.internal
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Reconstructed Mock Web Page Content */}
          <div className="p-8 space-y-6 text-slate-100 bg-[#0a0d14] min-h-[360px]">
            {/* Nav */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-bold text-cyan-300 tracking-wider text-sm font-mono">
                [RECONSTRUCTED {version.yearLabel} BRAND]
              </span>
              <div className="flex space-x-4 text-xs font-mono text-slate-400">
                <span>Features</span>
                <span>Docs</span>
                <span>Sign In</span>
              </div>
            </div>

            {/* Hero */}
            <div className="text-center py-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                {version.architecture.frontend || 'Reconstructed Interface'} ({version.yearLabel})
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Historical snapshot of web UI layout based on physical HTML/CSS templates present in artifact archive.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
                  {version.featuresList[0] || 'Explore Features'}
                </button>
              </div>
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Backend Layer</span>
                <p className="text-[11px] text-slate-400">{version.architecture.backend || 'Core API'}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Database Layer</span>
                <p className="text-[11px] text-slate-400">{version.architecture.database || 'Relational DB'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
