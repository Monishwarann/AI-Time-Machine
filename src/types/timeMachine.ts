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
  sourceType: 'file' | 'git' | 'metadata' | 'dependency' | 'schema' | 'doc_heading' | 'screenshot' | 'user_annotation';
  sourceReference: string;
  contentSnippet: string;
  confidence: ConfidenceLevel;
  timestamp?: string;
  limitations?: string;
  contradictingEventIds?: string[];
}

export interface ClaimLedgerEntry {
  claimId: string;
  statement: string;
  status: 'supported' | 'partially_supported' | 'contradicted' | 'unresolved' | 'user_corrected';
  supportingEvidenceIds: string[];
  contradictingEvidenceIds: string[];
  uncertainty?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  datePrecision?: 'exact' | 'year' | 'month' | 'approximate';
  title: string;
  description: string;
  type: EventCategory;
  evidence: EvidenceItem[];
  confidence: ConfidenceLevel;
  status: 'verified' | 'evidence_based' | 'inferred' | 'hypothetical';
  isVerifiedGitHistory?: boolean;
  isHypothetical?: boolean;
  affectedFiles?: string[];
  dependencyChanges?: { package: string; oldVersion?: string; newVersion?: string }[];
  schemaChanges?: string[];
  commitHash?: string;
  commitAuthor?: string;
  userAnnotations?: HumanAnnotation[];
}

export interface HumanAnnotation {
  id: string;
  targetId: string;
  targetType: 'event' | 'file' | 'screenshot' | 'evidence';
  author: string;
  timestamp: string;
  comment: string;
  overrideDate?: string;
  isOverride?: boolean;
}

export interface EvidenceConflict {
  id: string;
  title: string;
  conflictingSources: { sourceName: string; dateClaimed: string; detail: string }[];
  possibleExplanations: string[];
  severity: 'high' | 'medium' | 'low';
}

export interface HistoricalAnomaly {
  id: string;
  title: string;
  type: 'sudden_architecture' | 'unexpected_dependency' | 'missing_files' | 'schema_jump' | 'terminology_shift';
  description: string;
  evidenceIds: string[];
  severity: 'high' | 'medium' | 'low';
}

export interface ProjectDNA {
  languagesPct: Record<string, number>;
  frameworks: string[];
  architectureType: string;
  databaseType: string;
  apiStyle: string;
  designPatterns: string[];
  mlComponents: string[];
}

export interface ReconstructionQuality {
  evidenceCoveragePct: number;
  timelineCoveragePct: number;
  metadataAvailabilityPct: number;
  versionCertaintyPct: number;
  overallStatus: 'FULLY SUPPORTED' | 'PARTIALLY SUPPORTED' | 'SPARSE EVIDENCE';
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
  websiteSnapshotHtml?: string;
}

export interface TemporalGraphEdge {
  id: string;
  source: string;
  target: string;
  relation: 'CONTAINS' | 'DEPENDS_ON' | 'REFERENCES' | 'MODIFIED_IN' | 'FIRST_SEEN_IN' | 'LAST_SEEN_IN' | 'SUPPORTS' | 'CONTRADICTS' | 'REPLACED_BY';
  validFrom: string;
  validUntil?: string;
  evidenceId?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'event' | 'file' | 'dependency' | 'doc' | 'schema' | 'architecture' | 'function' | 'api';
  confidence: ConfidenceLevel;
  source?: string;
  details?: string;
  validFrom?: string;
  validUntil?: string;
  x?: number;
  y?: number;
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

export interface ComponentEvolution {
  id: string;
  componentName: string;
  type: 'function' | 'class' | 'api';
  firstObserved: string;
  history: { yearLabel: string; snippet: string; changeNote: string }[];
}

export interface NextBestEvidence {
  id: string;
  targetQuestion: string;
  currentEvidence: string;
  recommendedArtifacts: string[];
  expectedUncertaintyReduction: string;
}

export interface VersionCertificate {
  certificateId: string;
  artifactName: string;
  sha256Hash: string;
  analyzedTimestamp: string;
  fileCount: number;
  evidenceCount: number;
  eventsCount: number;
  snapshotId: string;
}

export interface EvolutionVelocityItem {
  interval: string;
  velocityRating: 'Low' | 'Medium' | 'High' | 'Very High';
  filesChanged: number;
  depsChanged: number;
  score: number;
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

export interface ChangeScorecard {
  versionsDetected: number;
  filesAnalyzed: number;
  majorChanges: number;
  technologiesDetected: number;
  architectureChanges: number;
  uiChanges: number;
  evidenceSources: number;
}

export interface MultiArtifactItem {
  id: string;
  name: string;
  type: 'ZIP' | 'Code' | 'PDF' | 'SQL' | 'CSV' | 'Screenshot' | 'Doc';
  size: number;
  uploadDate: string;
  hash: string;
}

export interface TimeMachineProject {
  id: string;
  name: string;
  description: string;
  artifactType: 'ZIP Archive' | 'Codebase' | 'Website' | 'Document' | 'Dataset' | 'API Schema' | 'GitHub Repository' | 'Multi-Artifact Investigation';
  githubUrl?: string;
  hasVerifiedGitHistory?: boolean;
  uploadDate: string;
  estimatedCoverage: string;
  versionCount: number;
  evidenceCount: number;
  confidenceScore: 'High' | 'Medium' | 'Low' | 'Speculative';
  lastAnalyzedDate: string;
  fileHash: string;
  scorecard: ChangeScorecard;
  projectDna: ProjectDNA;
  reconstructionQuality: ReconstructionQuality;
  conflicts: EvidenceConflict[];
  anomalies: HistoricalAnomaly[];
  claimLedger: ClaimLedgerEntry[];
  componentEvolutions: ComponentEvolution[];
  nextBestEvidence: NextBestEvidence[];
  evolutionVelocity: EvolutionVelocityItem[];
  artifacts: MultiArtifactItem[];
  timelineEvents: TimelineEvent[];
  reconstructedVersions: ReconstructedVersion[];
  digitalFossils: DigitalFossil[];
  missingHistoryGaps: MissingHistoryGap[];
  hypotheses: MultipleHypothesis[];
  graphNodes: GraphNode[];
  graphEdges: TemporalGraphEdge[];
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
