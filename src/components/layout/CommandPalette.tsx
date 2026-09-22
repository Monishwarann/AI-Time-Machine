import React, { useState, useEffect } from 'react';
import { Search, Compass, FileDiff, Network, GitBranch, Bot, Bone, ShieldCheck, Terminal, X, AlertTriangle, Dna } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (tabName: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectCommand }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent window
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'timeline', title: 'Timeline Explorer', desc: 'Interactive historical timeline & version scrubber', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { id: 'compare', title: 'Compare Versions', desc: 'Side-by-side diff engine & what-changed analysis', icon: <FileDiff className="w-4 h-4 text-amber-400" /> },
    { id: 'dna', title: 'Project DNA Analysis', desc: 'Technical identity breakdown & framework percentages', icon: <Dna className="w-4 h-4 text-purple-400" /> },
    { id: 'conflicts', title: 'Evidence Conflict Detector', desc: 'Inspect historical source contradictions & discrepancies', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
    { id: 'graph', title: 'Interactive Evidence Graph', desc: 'Node network connecting events, files, and schemas', icon: <Network className="w-4 h-4 text-cyan-400" /> },
    { id: 'whatif', title: '"What If?" Scenario Simulator', desc: 'Generate hypothetical branch evolution paths', icon: <GitBranch className="w-4 h-4 text-purple-400" /> },
    { id: 'assistant', title: 'Ask AI Archaeologist', desc: 'RAG chatbot grounded in physical artifact evidence', icon: <Bot className="w-4 h-4 text-emerald-400" /> },
    { id: 'fossils', title: 'Digital Fossils Detector', desc: 'Discover legacy code traces, deprecated APIs, and old packages', icon: <Bone className="w-4 h-4 text-amber-400" /> },
    { id: 'audit', title: 'Cryptographic Audit Trail', desc: 'SHA-256 integrity logs & reproducibility manifests', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
  ];

  const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/85 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-xl bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl space-y-4">
        {/* Search input */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3 px-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search workspace (e.g. DNA, Timeline, Conflicts)..."
            className="w-full bg-transparent text-xs text-slate-100 focus:outline-none placeholder-slate-500 font-mono"
          />
          <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">ESC</span>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto space-y-1">
          {filtered.map(cmd => (
            <button
              key={cmd.id}
              onClick={() => {
                onSelectCommand(cmd.id);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                {cmd.icon}
                <div>
                  <span className="font-bold text-slate-100 text-xs group-hover:text-cyan-300 block">{cmd.title}</span>
                  <span className="text-[10px] text-slate-400 block">{cmd.desc}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Jump →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
