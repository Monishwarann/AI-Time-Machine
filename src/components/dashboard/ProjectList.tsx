import React, { useState, useEffect } from 'react';
import { Layers, Plus, Upload, Search, Filter, History } from 'lucide-react';
import { projectStore } from '../../store/projectStore';
import { ProjectCard } from './ProjectCard';
import { TimeMachineProject } from '../../types/timeMachine';

interface ProjectListProps {
  onSelectProject: (id: string) => void;
  onOpenUpload: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject, onOpenUpload }) => {
  const [projects, setProjects] = useState<TimeMachineProject[]>(projectStore.getProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    return projectStore.subscribe(() => {
      setProjects(projectStore.getProjects());
    });
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || p.artifactType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 flex items-center space-x-3">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>MY TIME MACHINES</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Reconstructed historical projects, datasets, and document evolution repositories.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Historical Analysis</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Time Machines..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 font-mono text-xs w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['all', 'codebase', 'dataset', 'document'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl border text-xs capitalize transition-all ${
                filterType === t
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <ProjectCard key={p.id} project={p} onSelect={onSelectProject} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <History className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="font-mono text-slate-400 text-sm">No historical time machines match your search.</p>
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Artifact</span>
          </button>
        </div>
      )}
    </div>
  );
};
