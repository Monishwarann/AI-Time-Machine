import React, { useState } from 'react';
import { Search, X, ShieldCheck, Filter, ChevronRight, FileCode } from 'lucide-react';
import { TimeMachineProject, TimelineEvent } from '../../types/timeMachine';

interface GlobalSearchModalProps {
  project: TimeMachineProject;
  onSelectEvent: (event: TimelineEvent) => void;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ project, onSelectEvent, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = project.timelineEvents.filter(e => {
    const matchQuery = e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase()) ||
      e.affectedFiles?.some(f => f.toLowerCase().includes(query.toLowerCase()));
    const matchCat = selectedCategory === 'all' || e.type === selectedCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-5 h-5 text-cyan-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search historical events, files, authentication, database, React..."
              className="w-full bg-transparent text-sm text-slate-100 focus:outline-none placeholder-slate-500"
            />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1">
          {['all', 'architecture', 'database', 'security', 'feature', 'ui'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-xl capitalize border ${
                selectedCategory === c
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(e => (
              <div
                key={e.id}
                onClick={() => {
                  onSelectEvent(e);
                  onClose();
                }}
                className="p-3.5 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-cyan-300">{e.date}</span>
                    <span className="text-[10px] uppercase text-slate-400 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {e.type}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{e.confidence}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs group-hover:text-amber-300 transition-colors">
                    {e.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{e.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No historical events match "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
