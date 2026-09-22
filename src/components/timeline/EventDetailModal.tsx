import React from 'react';
import { X, ShieldCheck, FileCode, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { TimelineEvent } from '../../types/timeMachine';

interface EventDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 font-mono max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-cyan-400 mb-1">
              <span className="font-bold">{event.date}</span>
              <span>•</span>
              <span className="uppercase text-amber-300">{event.type.replace('_', ' ')}</span>
            </div>
            <h2 className="font-bold text-slate-100 text-lg">{event.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase">Event Analysis</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            {event.description}
          </p>
        </div>

        {/* Confidence System Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Confidence Tier:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold uppercase">
              {event.confidence.replace('_', ' ')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Status: <span className="text-slate-200 uppercase font-semibold">{event.status}</span>
          </p>
        </div>

        {/* Evidence Sources Panel */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Supporting Physical Evidence ({event.evidence.length})</span>
          </h3>

          <div className="space-y-2.5">
            {event.evidence.map((ev, idx) => (
              <div key={ev.id || idx} className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                  <span className="flex items-center space-x-1.5">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ev.sourceReference}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">{ev.sourceType}</span>
                </div>
                <pre className="text-[11px] bg-slate-950 p-2.5 rounded-lg text-slate-300 overflow-x-auto border border-slate-900">
                  {ev.contentSnippet}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Affected Files */}
        {event.affectedFiles && event.affectedFiles.length > 0 && (
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-300 uppercase">Affected File Artifacts</h3>
            <div className="flex flex-wrap gap-1.5">
              {event.affectedFiles.map((f, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
