import React, { useState } from 'react';
import { TimeMachineProject, TimelineEvent, ReconstructedVersion } from '../../types/timeMachine';
import { InteractiveTimeline } from '../timeline/InteractiveTimeline';
import { EventDetailModal } from '../timeline/EventDetailModal';
import { DiffViewer } from '../compare/DiffViewer';
import { EvidenceGraphView } from '../graph/EvidenceGraphView';
import { WhatIfBranchGenerator } from '../whatif/WhatIfBranchGenerator';
import { HistoricalChatbot } from '../assistant/HistoricalChatbot';
import { DigitalFossilsView } from './DigitalFossilsView';
import { AuditTrailViewer } from '../audit/AuditTrailViewer';
import { ExportReportModal } from '../export/ExportReportModal';
import { WebsitePreviewModal } from './WebsitePreviewModal';
import { DatasetEvolutionView } from '../dataset/DatasetEvolutionView';
import { ChangeScorecardView } from '../dashboard/ChangeScorecard';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
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
  ArrowLeft,
  Globe,
  Database,
  Search
} from 'lucide-react';

interface ProjectExplorerProps {
  project: TimeMachineProject;
  onBackToDashboard: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ project, onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'compare' | 'dataset' | 'graph' | 'whatif' | 'assistant' | 'fossils' | 'audit'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [websitePreviewVersion, setWebsitePreviewVersion] = useState<ReconstructedVersion | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                {project.hasVerifiedGitHistory && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                    VERIFIED GIT HISTORY
                  </span>
                )}
                <span>• Hash: {project.fileHash.substring(0, 16)}...</span>
              </div>
              <h1 className="text-xl font-bold text-slate-100">{project.name}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-bold transition-all"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Search History</span>
            </button>

            <button
              onClick={() => setWebsitePreviewVersion(project.reconstructedVersions[0])}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-amber-300 text-xs font-bold transition-all"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>UI Website Preview</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Scorecard Component */}
        <ChangeScorecardView scorecard={project.scorecard} />

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
          onClick={() => setActiveTab('dataset')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'dataset'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-purple-400" />
          <span>Dataset Time Machine</span>
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
        {activeTab === 'dataset' && <DatasetEvolutionView project={project} />}
        {activeTab === 'graph' && <EvidenceGraphView project={project} />}
        {activeTab === 'whatif' && <WhatIfBranchGenerator project={project} />}
        {activeTab === 'assistant' && <HistoricalChatbot project={project} />}
        {activeTab === 'fossils' && <DigitalFossilsView project={project} />}
        {activeTab === 'audit' && <AuditTrailViewer project={project} />}
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {websitePreviewVersion && (
        <WebsitePreviewModal version={websitePreviewVersion} onClose={() => setWebsitePreviewVersion(null)} />
      )}

      {isExportOpen && (
        <ExportReportModal project={project} onClose={() => setIsExportOpen(false)} />
      )}

      {isSearchOpen && (
        <GlobalSearchModal project={project} onSelectEvent={evt => setSelectedEvent(evt)} onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  );
};
