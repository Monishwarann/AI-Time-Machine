import React, { useState, useEffect } from 'react';
import { TimeMachineProject, TimelineEvent, ReconstructedVersion, HumanAnnotation } from '../../types/timeMachine';
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
import { CommandPalette } from '../layout/CommandPalette';
import { ConflictDetectorView } from '../audit/ConflictDetectorView';
import { AnomalyDetectorView } from '../audit/AnomalyDetectorView';
import { ProjectDnaView } from './ProjectDnaView';
import { ReconstructionQualityPanel } from '../dashboard/ReconstructionQualityPanel';
import { HumanCorrectionModal } from '../annotations/HumanCorrectionModal';
import { PublicShareModal } from '../sharing/PublicShareModal';
import { CinematicReplayModal } from '../replay/CinematicReplayModal';
import { TimeTravelDebugger } from './TimeTravelDebugger';
import { TemporalCodeDiffViewer } from '../code/TemporalCodeDiffViewer';
import { ClaimLedgerView } from '../audit/ClaimLedgerView';
import { LostAndSurvivedView } from './LostAndSurvivedView';
import { NextBestEvidencePanel } from '../assistant/NextBestEvidencePanel';
import { VersionCertificateModal } from '../export/VersionCertificateModal';
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
  Search,
  Dna,
  Share2,
  Terminal,
  Zap,
  Play,
  Sliders,
  Code,
  FileText,
  Award,
  HelpCircle
} from 'lucide-react';

interface ProjectExplorerProps {
  project: TimeMachineProject;
  onBackToDashboard: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ project, onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState<string>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [annotationEvent, setAnnotationEvent] = useState<TimelineEvent | null>(null);
  const [websitePreviewVersion, setWebsitePreviewVersion] = useState<ReconstructedVersion | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveAnnotation = (annotation: HumanAnnotation) => {
    if (!annotationEvent) return;
    if (!annotationEvent.userAnnotations) {
      annotationEvent.userAnnotations = [];
    }
    annotationEvent.userAnnotations.push(annotation);
    if (annotation.overrideDate) {
      annotationEvent.date = annotation.overrideDate;
    }
  };

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

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsReplayOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>▶ Replay History</span>
            </button>

            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Ctrl+K</span>
            </button>

            <button
              onClick={() => setIsCertOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-bold transition-all"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Version Certificate</span>
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-bold transition-all"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Report V3</span>
            </button>
          </div>
        </div>

        {/* Quality Coverage Panel V3 */}
        {project.reconstructionQuality && (
          <ReconstructionQualityPanel quality={project.reconstructionQuality} />
        )}

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

      {/* Tabs Navigation Bar V3 */}
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
          onClick={() => setActiveTab('timetravel')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'timetravel'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Time Travel Debugger</span>
        </button>

        <button
          onClick={() => setActiveTab('codediff')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'codediff'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4 text-cyan-400" />
          <span>Code Diff Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('claimledger')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'claimledger'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Claim Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('lostsurvived')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'lostsurvived'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Bone className="w-4 h-4 text-amber-400" />
          <span>Lost & Survived</span>
        </button>

        <button
          onClick={() => setActiveTab('nextbest')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'nextbest'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Next Best Evidence</span>
        </button>

        <button
          onClick={() => setActiveTab('dna')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all border ${
            activeTab === 'dna'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Dna className="w-4 h-4 text-purple-400" />
          <span>Project DNA</span>
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
          <span>AI Archaeologist</span>
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
        {activeTab === 'timetravel' && <TimeTravelDebugger project={project} />}
        {activeTab === 'codediff' && <TemporalCodeDiffViewer project={project} />}
        {activeTab === 'claimledger' && <ClaimLedgerView project={project} />}
        {activeTab === 'lostsurvived' && <LostAndSurvivedView project={project} />}
        {activeTab === 'nextbest' && <NextBestEvidencePanel project={project} />}
        {activeTab === 'compare' && <DiffViewer project={project} />}
        {activeTab === 'dna' && <ProjectDnaView project={project} />}
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

      {annotationEvent && (
        <HumanCorrectionModal
          event={annotationEvent}
          onSaveAnnotation={handleSaveAnnotation}
          onClose={() => setAnnotationEvent(null)}
        />
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

      {isPaletteOpen && (
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onSelectCommand={tab => setActiveTab(tab)}
        />
      )}

      {isShareOpen && (
        <PublicShareModal project={project} onClose={() => setIsShareOpen(false)} />
      )}

      {isReplayOpen && (
        <CinematicReplayModal project={project} onClose={() => setIsReplayOpen(false)} />
      )}

      {isCertOpen && (
        <VersionCertificateModal project={project} onClose={() => setIsCertOpen(false)} />
      )}
    </div>
  );
};
