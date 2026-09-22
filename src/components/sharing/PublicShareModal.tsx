import React, { useState } from 'react';
import { Share2, Copy, Check, Globe, X, Lock } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface PublicShareModalProps {
  project: TimeMachineProject;
  onClose: () => void;
}

export const PublicShareModal: React.FC<PublicShareModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/inspect/${project.id.replace('git-proj-', '').replace('proj-', '')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-md bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-sm">PUBLIC INVESTIGATION LINK</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-slate-300 leading-relaxed">
            Generate a read-only public investigation URL to share the reconstructed timeline, evidence graph, and digital fossils with external collaborators.
          </p>
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-mono text-[11px]"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold flex items-center space-x-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-[11px] text-slate-400 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Public links grant read-only timeline exploration without write access.</span>
        </div>
      </div>
    </div>
  );
};
