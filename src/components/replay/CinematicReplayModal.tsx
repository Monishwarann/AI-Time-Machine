import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Compass, ShieldCheck, Sparkles, Eye, Info } from 'lucide-react';
import { TimeMachineProject, TimelineEvent } from '../../types/timeMachine';

interface CinematicReplayModalProps {
  project: TimeMachineProject;
  onClose: () => void;
}

export const CinematicReplayModal: React.FC<CinematicReplayModalProps> = ({ project, onClose }) => {
  const events = project.timelineEvents;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMs, setSpeedMs] = useState(2000);
  const [investigatingEvent, setInvestigatingEvent] = useState<TimelineEvent | null>(null);

  const activeEvent = events[currentIndex] || events[0];

  useEffect(() => {
    let timer: any = null;
    if (isPlaying && !investigatingEvent) {
      timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= events.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speedMs, events, investigatingEvent]);

  const togglePlay = () => {
    if (currentIndex >= events.length - 1) setCurrentIndex(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl font-mono text-slate-100">
      <div className="relative w-full max-w-5xl bg-[#0a0d14] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 animate-pulse">
              <Play className="w-5 h-5 fill-cyan-300" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base flex items-center space-x-2">
                <span>CINEMATIC HISTORICAL REPLAY</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono uppercase">
                  REPLAY MODE
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {project.name} • {project.estimatedCoverage}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSpeedMs(speedMs === 2000 ? 1000 : 2000)}
              className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-bold"
            >
              Speed: {speedMs === 2000 ? '1x' : '2x'}
            </button>

            <button
              onClick={togglePlay}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs shadow-lg transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 hover:from-cyan-400 hover:to-amber-300'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'Pause Replay' : 'Resume Replay'}</span>
            </button>

            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Animated Stage */}
        <div className="py-8 px-6 bg-slate-950 border border-cyan-500/20 rounded-2xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-extrabold text-cyan-500/10">
            {activeEvent.date}
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Historical Event #{currentIndex + 1} of {events.length}</span>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-extrabold text-slate-100 font-sans tracking-tight">
              {activeEvent.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {activeEvent.description}
            </p>
          </div>

          {/* Pause & Investigate Drawer Trigger */}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                setInvestigatingEvent(activeEvent);
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Pause & Investigate Evidence</span>
            </button>
          </div>
        </div>

        {/* Timeline Strand Scrubber */}
        <div className="space-y-2 font-mono">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{events[0].date}</span>
            <span>{events[events.length - 1].date}</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(((currentIndex + 1) / events.length) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Investigation Drawer Overlay */}
        {investigatingEvent && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-300 flex items-center space-x-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>INVESTIGATING EVIDENCE: {investigatingEvent.title}</span>
              </span>
              <button onClick={() => setInvestigatingEvent(null)} className="text-slate-400 hover:text-slate-200">
                Close
              </button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div><span className="text-slate-400">Category:</span> {investigatingEvent.type}</div>
              <div><span className="text-slate-400">Confidence Tier:</span> {investigatingEvent.confidence.toUpperCase()}</div>
              <div><span className="text-slate-400">Supporting Evidence Lines:</span></div>
              <ul className="space-y-1">
                {investigatingEvent.evidence.map(ev => (
                  <li key={ev.id} className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[10px] text-cyan-200">
                    [{ev.sourceType}] {ev.sourceReference}: {ev.contentSnippet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
