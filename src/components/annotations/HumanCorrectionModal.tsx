import React, { useState } from 'react';
import { UserCheck, MessageSquare, Calendar, X, CheckCircle2 } from 'lucide-react';
import { TimelineEvent, HumanAnnotation } from '../../types/timeMachine';

interface HumanCorrectionModalProps {
  event: TimelineEvent;
  onSaveAnnotation: (annotation: HumanAnnotation) => void;
  onClose: () => void;
}

export const HumanCorrectionModal: React.FC<HumanCorrectionModalProps> = ({ event, onSaveAnnotation, onClose }) => {
  const [authorName, setAuthorName] = useState('Dr. Monish Warann');
  const [commentInput, setCommentInput] = useState('');
  const [overrideDateInput, setOverrideDateInput] = useState(event.date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newAnnotation: HumanAnnotation = {
      id: `ann-${Date.now()}`,
      targetId: event.id,
      targetType: 'event',
      author: authorName,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      comment: commentInput,
      overrideDate: overrideDateInput !== event.date ? overrideDateInput : undefined,
      isOverride: overrideDateInput !== event.date
    };

    onSaveAnnotation(newAnnotation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-lg bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-sm">HUMAN CORRECTION & ANNOTATION</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400">Target Event:</label>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-cyan-300 font-bold">
              {event.date} — {event.title}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Archaeologist Name</label>
            <input
              type="text"
              required
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Date Override (Optional)</label>
            <input
              type="text"
              value={overrideDateInput}
              onChange={e => setOverrideDateInput(e.target.value)}
              placeholder="e.g. 2021-05"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Annotation / Physical Evidence Note</label>
            <textarea
              required
              rows={4}
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="Provide user-verified context or screenshot proof overriding the AI inference..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold text-xs shadow-lg"
          >
            Save User Correction & Annotation
          </button>
        </form>
      </div>
    </div>
  );
};
