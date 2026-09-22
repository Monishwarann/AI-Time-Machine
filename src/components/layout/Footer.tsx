import React from 'react';
import { History, Shield, Trash2, Cpu, FileCheck, ExternalLink } from 'lucide-react';
import { projectStore } from '../../store/projectStore';
import { TimeMachineProject } from '../../types/timeMachine';

interface FooterProps {
  activeProject?: TimeMachineProject;
}

export const Footer: React.FC<FooterProps> = ({ activeProject }) => {
  const handleDeleteProject = () => {
    if (!activeProject) return;
    if (confirm(`Are you sure you want to permanently delete "${activeProject.name}"? All artifacts, embeddings, and generated analysis will be erased.`)) {
      projectStore.deleteProject(activeProject.id);
    }
  };

  return (
    <footer className="mt-auto border-t border-cyan-500/10 bg-[#06080e] text-slate-400 py-8 px-6 lg:px-12 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & Doctrine */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-cyan-400" />
            <span className="font-mono font-bold text-slate-200 tracking-wider">AI TIME MACHINE</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            “Reconstruct history from evidence, not imagination.”
          </p>
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-snug">
            <span className="font-semibold block mb-0.5">⚠️ Historical Accuracy Notice</span>
            Metadata & AI inferences are evidence-based reconstructions. Never treat speculative extrapolations as confirmed fact.
          </div>
        </div>

        {/* AI & Infrastructure Pipeline */}
        <div className="space-y-2">
          <span className="font-mono text-cyan-400 text-[11px] uppercase tracking-wider block font-semibold">
            AI Provider Stack
          </span>
          <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
            <li className="flex items-center justify-between">
              <span>Google Gemini 1.5/2.0</span>
              <span className="text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded text-[10px]">Multimodal / Long Context</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Groq Llama 3.3</span>
              <span className="text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded text-[10px]">Ultra-Fast Reasoning</span>
            </li>
            <li className="flex items-center justify-between">
              <span>HuggingFace / Local NLP</span>
              <span className="text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded text-[10px]">Embeddings / Vectors</span>
            </li>
            <li className="flex items-center justify-between">
              <span>PostgreSQL + pgvector</span>
              <span className="text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded text-[10px]">RAG Vector Index</span>
            </li>
          </ul>
        </div>

        {/* Audit & Data Governance */}
        <div className="space-y-2">
          <span className="font-mono text-cyan-400 text-[11px] uppercase tracking-wider block font-semibold">
            Security & Privacy
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Uploaded artifacts are processed locally in your secure session context. Hashes are audited with SHA-256 for cryptographic integrity.
          </p>
          {activeProject && (
            <button
              onClick={handleDeleteProject}
              className="flex items-center space-x-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Project Data</span>
            </button>
          )}
        </div>

        {/* System Status */}
        <div className="space-y-2 font-mono text-[11px]">
          <span className="text-cyan-400 uppercase tracking-wider block font-semibold">
            System Telemetry
          </span>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Analysis Pipeline:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Confidence Classifier:</span>
              <span className="text-cyan-400">Strict 5-Tier</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Vector RAG Index:</span>
              <span className="text-amber-400">Ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-slate-400 font-mono text-[11px]">
        <div>
          AI Time Machine &copy; 2026. Built for Digital Archaeology, Forensics & Evolution Tracking.
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Audit Specs</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">GitHub Repository</a>
        </div>
      </div>
    </footer>
  );
};
