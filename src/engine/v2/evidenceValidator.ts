import { EvidenceConflict, HistoricalAnomaly, TimelineEvent } from '../../types/timeMachine';

export function detectEvidenceConflicts(events: TimelineEvent[]): EvidenceConflict[] {
  const conflicts: EvidenceConflict[] = [];

  // Check for metadata vs documentation conflicts
  const docEvent = events.find(e => e.type === 'documentation' || e.title.toLowerCase().includes('doc'));
  const codeEvent = events.find(e => e.type === 'api' || e.type === 'security');

  if (docEvent && codeEvent && parseInt(docEvent.date) > parseInt(codeEvent.date)) {
    conflicts.push({
      id: 'conflict-001',
      title: 'Retroactive Documentation Timestamp Shift',
      conflictingSources: [
        { sourceName: 'Documentation file header', dateClaimed: docEvent.date, detail: `Document claims API availability in ${docEvent.date}` },
        { sourceName: 'Source code routes', dateClaimed: codeEvent.date, detail: `Code implementation observed in ${codeEvent.date} artifact` }
      ],
      possibleExplanations: [
        'Documentation was updated retrospectively after code deployment',
        'Artifact files originated from different development branches',
        'File modification timestamp was altered during file transfer'
      ],
      severity: 'medium'
    });
  }

  return conflicts;
}

export function detectHistoricalAnomalies(events: TimelineEvent[]): HistoricalAnomaly[] {
  const anomalies: HistoricalAnomaly[] = [];

  // Look for sudden jumps in architectural complexity
  if (events.length >= 3) {
    const suddenShift = events.find(e => e.type === 'refactoring' || e.title.toLowerCase().includes('microservice'));
    if (suddenShift) {
      anomalies.push({
        id: 'anomaly-001',
        title: 'Sudden Microservice Architectural Jump',
        type: 'sudden_architecture',
        description: `Discovered an abrupt structural migration to decoupled microservices in state ${suddenShift.date} without intermediate staging records.`,
        evidenceIds: suddenShift.evidence.map(e => e.id),
        severity: 'high'
      });
    }
  }

  return anomalies;
}
