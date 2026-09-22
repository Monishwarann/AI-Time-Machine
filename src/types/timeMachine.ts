export type ConfidenceLevel = 'verified' | 'strongly_supported' | 'plausible' | 'speculative' | 'unknown';

export type EventCategory = 
  | 'initial_concept'
  | 'architecture'
  | 'feature'
  | 'dependency'
  | 'ui'
  | 'database'
  | 'api'
  | 'security'
  | 'dataset'
  | 'documentation'
  | 'deployment'
  | 'refactoring'
  | 'unknown';

export interface EvidenceItem {
  id: string;
  sourceType: 'file' | 'git' | 'metadata' | 'dependency' | 'schema' | 'doc_heading';
  sourceReference: string;
  contentSnippet: string;
  confidence: ConfidenceLevel;
  timestamp?: string;
  limitations?: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // e.g. "2021" or "2021-06"
  title: string;
  description: string;
  type: EventCategory;
  evidence: EvidenceItem[];
  confidence: ConfidenceLevel;
  status: 'verified' | 'evidence_based' | 'inferred' | 'hypothetical';
  isHypothetical?: boolean;
  affectedFiles?: string[];
  dependencyChanges?: { package: string; oldVersion?: string; newVersion?: string }[];
  schemaChanges?: string[];
}

export interface ReconstructedVersion {
  id: string;
  yearLabel: string;
  versionTag: string;
  date: string;
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    auth?: string;
    ml?: string;
    services?: string[];
  };
  filesCount: number;
  filesList: string[];
  dependencies: Record<string, string>;
  featuresList: string[];
  schemaSummary?: { columnsCount: number; tablesCount: number; keyFields: string[] };
  docDriftNote?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'event' | 'file' | 'dependency' | 'doc' | 'schema' | 'architecture';
  confidence: ConfidenceLevel;
  source?: string;
  details?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface DigitalFossil {
  id: string;
  name: string;
  type: 'dependency' | 'api' | 'naming' | 'framework' | 'doc' | 'schema' | 'config';
  firstObserved: string;
  lastObserved: string;
  description: string;
  currentStatus: 'deprecated' | 'replaced' | 'legacy_active' | 'removed';
  evidence: string[];
}

export interface MissingHistoryGap {
  id: string;
  startYear: string;
  endYear: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  recommendedArtifacts: string[];
}

export interface MultipleHypothesis {
  id: string;
  eventId: string;
  eventTitle: string;
  explanations: {
    letter: 'A' | 'B' | 'C' | 'D';
    title: string;
    evidence: string[];
    uncertaintyReason: string;
  }[];
}

export interface WhatIfBranch {
  id: string;
  branchName: string;
  baseVersion: string;
  scenarioPrompt: string;
  hypotheticalTimeline: TimelineEvent[];
  createdAt: string;
}

export interface AuditTrailItem {
  id: string;
  timestamp: string;
  stage: string;
  status: 'success' | 'warning' | 'info';
  details: string;
  hash?: string;
}

export interface TimeMachineProject {
  id: string;
  name: string;
  description: string;
  artifactType: 'ZIP Archive' | 'Codebase' | 'Website' | 'Document' | 'Dataset' | 'API Schema';
  uploadDate: string;
  estimatedCoverage: string; // e.g. "2019 → 2025"
  versionCount: number;
  evidenceCount: number;
  confidenceScore: 'High' | 'Medium' | 'Low' | 'Speculative';
  lastAnalyzedDate: string;
  fileHash: string;
  timelineEvents: TimelineEvent[];
  reconstructedVersions: ReconstructedVersion[];
  digitalFossils: DigitalFossil[];
  missingHistoryGaps: MissingHistoryGap[];
  hypotheses: MultipleHypothesis[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  whatIfBranches: WhatIfBranch[];
  auditLogs: AuditTrailItem[];
  rawFiles?: { path: string; size: number; modifiedDate?: string; content?: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: { title: string; reference: string; confidence: ConfidenceLevel }[];
}
