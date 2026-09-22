import React, { useState } from 'react';
import { TimeMachineProject, TimelineEvent } from '../../types/timeMachine';
import { InteractiveTimeline } from '../timeline/InteractiveTimeline';
import { EventDetailModal } from '../timeline/EventDetailModal';
import { DiffViewer } from '../compare/DiffViewer';
import { EvidenceGraphView } from '../graph/EvidenceGraphView';
import { WhatIfBranchGenerator } from '../whatif/WhatIfBranchGenerator';
import { HistoricalChatbot } from '../assistant/HistoricalChatbot';
import { DigitalFossilsView } from './DigitalFossilsView';
import { AuditTrailViewer } from '../audit/AuditTrailViewer';
import { ExportReportModal } from '../export/ExportReportModal';
import {
  History,
  Compass,
  FileDiff,
  Network,
  GitBranch,
  Bot,
  Bone,
  ShieldCheck,
  Download,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

interface ProjectExplorerProps {
  project: TimeMachineProject;
  onBackToDashboard: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ project, onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'compare' | 'graph' | 'whatif' | 'assistant' | 'fossils' | 'audit'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Top Banner & Project Overview */}
      <div className="bg-[#0b0e17]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToDashboard}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2 text-xs text-cyan-400 mb-0.5">
                <span className="font-bold">{project.artifactType}</span>
                <span>•</span>
                <span>Hash: {project.fileHash.substring(0, 16)}...</span>
              </div>
              <h1 className="text-xl font-bold text-slate-100">{project.name}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Project Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase">Coverage</span>
            <div className="font-bold text-cyan-300">{project.estimatedCoverage}</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase">Reconstructed Eras</span>
            <div className="font-bold text-amber-300">{project.versionCount} versions</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase">Evidence Points</span>
            <div className="font-bold text-emerald-300">{project.evidenceCount} sources</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase">Confidence</span>
            <div className="font-bold text-purple-300">{project.confidenceScore} Tier</div>
          </div>
        </div>

        {/* Strict Historical Disclaimer Notice */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Metadata & AI inferences represent evidence-based reconstructions. Never present an AI-generated reconstruction as confirmed historical fact.
          </span>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'timeline'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Timeline Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'compare'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <FileDiff className="w-4 h-4" />
          <span>Compare Versions</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'graph'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Evidence Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('whatif')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'whatif'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4 text-purple-400" />
          <span>"What If?" Scenarios</span>
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'assistant'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('fossils')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'fossils'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Bone className="w-4 h-4 text-amber-400" />
          <span>Digital Fossils</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'audit'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Audit Trail</span>
        </button>
      </div>

      {/* Tab Content Rendering */}
      <div>
        {activeTab === 'timeline' && (
          <InteractiveTimeline project={project} onSelectEvent={evt => setSelectedEvent(evt)} />
        )}
        {activeTab === 'compare' && <DiffViewer project={project} />}
        {activeTab === 'graph' && <EvidenceGraphView project={project} />}
        {activeTab === 'whatif' && <WhatIfBranchGenerator project={project} />}
        {activeTab === 'assistant' && <HistoricalChatbot project={project} />}
        {activeTab === 'fossils' && <DigitalFossilsView project={project} />}
        {activeTab === 'audit' && <AuditTrailViewer project={project} />}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Export Report Modal */}
      {isExportOpen && (
        <ExportReportModal project={project} onClose={() => setIsExportOpen(false)} />
      )}
    </div>
  );
};
