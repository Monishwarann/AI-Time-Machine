import React, { useState, useEffect } from 'react';
import { History, Sparkles, Upload, User, LogOut, ShieldAlert, Layers, ChevronDown, Compass } from 'lucide-react';
import { projectStore } from '../../store/projectStore';
import { authStore } from '../../store/authStore';
import { TimeMachineProject } from '../../types/timeMachine';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onOpenUpload }) => {
  const [projects, setProjects] = useState<TimeMachineProject[]>(projectStore.getProjects());
  const [activeProject, setActiveProject] = useState<TimeMachineProject | undefined>(projectStore.getActiveProject());
  const [user, setUser] = useState(authStore.getUser());
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubProject = projectStore.subscribe(() => {
      setProjects(projectStore.getProjects());
      setActiveProject(projectStore.getActiveProject());
    });
    const unsubAuth = authStore.subscribe(() => {
      setUser(authStore.getUser());
    });
    return () => {
      unsubProject();
      unsubAuth();
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 flex items-center justify-between text-sm">
      {/* Brand */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-400 to-amber-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
              <History className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono font-extrabold text-base tracking-wider bg-gradient-to-r from-cyan-300 via-cyan-100 to-amber-300 bg-clip-text text-transparent">
              AI TIME MACHINE
            </span>
            <span className="text-[10px] tracking-widest text-cyan-400/70 font-mono -mt-1 uppercase">
              Digital Archaeology
            </span>
          </div>
        </button>

        {/* View Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'landing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'dashboard' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>

          {activeProject && (
            <button
              onClick={() => setCurrentView('project')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentView === 'project' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Explorer</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Active Project Switcher */}
      {activeProject && (
        <div className="relative hidden xl:block">
          <button
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center space-x-2 bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 px-3.5 py-1.5 rounded-xl text-xs font-mono text-cyan-200 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="max-w-[200px] truncate">{activeProject.name}</span>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800/50">
              {activeProject.estimatedCoverage}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#0c101a] border border-cyan-500/30 rounded-xl shadow-2xl p-2 z-50">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 border-b border-slate-800">
                Switch Time Machine
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1 mt-1">
                {projects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      projectStore.setActiveProjectId(p.id);
                      setIsProjectDropdownOpen(false);
                      setCurrentView('project');
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                      p.id === activeProject.id ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="text-[10px] text-slate-400">{p.estimatedCoverage}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Controls & Auth */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenUpload}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-semibold px-4 py-1.5 rounded-xl shadow-lg shadow-cyan-500/20 text-xs transition-all active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Artifact</span>
        </button>

        {user ? (
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
            <div className="flex items-center space-x-2">
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-7 h-7 rounded-full border border-cyan-400/50"
              />
              <span className="hidden sm:inline font-mono text-xs text-slate-300">{user.name.split(' ')[0]}</span>
            </div>
            <button
              onClick={() => authStore.logout()}
              title="Logout"
              className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => authStore.openAuthModal()}
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-xl transition-all"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
};
