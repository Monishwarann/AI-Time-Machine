import React, { useState } from 'react';
import { GitBranch, Globe, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchGithubRepository } from '../../engine/githubFetcher';
import { projectStore } from '../../store/projectStore';

interface GithubImporterProps {
  onSuccess: (projectId: string) => void;
  onCancel: () => void;
}

export const GithubImporter: React.FC<GithubImporterProps> = ({ onSuccess, onCancel }) => {
  const [githubUrlInput, setGithubUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrlInput) return;

    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('Connecting to GitHub API...');

    try {
      const project = await fetchGithubRepository(githubUrlInput, (stage) => setStatusMessage(stage));
      projectStore.addProject(project);
      setIsLoading(false);
      onSuccess(project.id);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to fetch GitHub repository. Check repository URL and public accessibility.');
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <form onSubmit={handleImport} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-slate-300 font-bold block">Public GitHub Repository URL</label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="url"
              required
              value={githubUrlInput}
              onChange={e => setGithubUrlInput(e.target.value)}
              placeholder="https://github.com/facebook/react"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 font-mono text-xs"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-2">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-cyan-300 font-bold animate-pulse">{statusMessage}</p>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <GitBranch className="w-4 h-4 text-slate-950" />
            <span>Import & Analyze Repository</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
