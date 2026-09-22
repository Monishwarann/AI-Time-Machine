import { TimeMachineProject, ChatMessage, ConfidenceLevel } from '../types/timeMachine';

export async function askHistoricalAssistant(
  project: TimeMachineProject,
  query: string,
  history: ChatMessage[]
): Promise<ChatMessage> {
  const lowerQuery = query.toLowerCase();
  
  // Search project evidence & timeline for matching context
  const matchingEvents = project.timelineEvents.filter(
    e => e.title.toLowerCase().includes(lowerQuery) || e.description.toLowerCase().includes(lowerQuery) || e.type.toLowerCase().includes(lowerQuery)
  );

  const citations: { title: string; reference: string; confidence: ConfidenceLevel }[] = [];

  let responseText = '';

  if (lowerQuery.includes('first') || lowerQuery.includes('start') || lowerQuery.includes('origin') || lowerQuery.includes('concept')) {
    const firstEvt = project.timelineEvents[0];
    if (firstEvt) {
      responseText = `Based on the physical evidence, the earliest observed state is **${firstEvt.title}** (${firstEvt.date}).\n\n**Evidence Summary:**\n- ${firstEvt.description}\n- Affected files: \`${firstEvt.affectedFiles?.slice(0, 3).join('`, `') || 'Initial files'}\`\n\n*Confidence Status:* **${firstEvt.confidence.toUpperCase().replace('_', ' ')}** (${firstEvt.status}).`;
      citations.push({
        title: firstEvt.title,
        reference: firstEvt.evidence[0]?.sourceReference || `Event ${firstEvt.date}`,
        confidence: firstEvt.confidence
      });
    }
  } else if (lowerQuery.includes('database') || lowerQuery.includes('db') || lowerQuery.includes('schema') || lowerQuery.includes('sql')) {
    const dbEvt = project.timelineEvents.find(e => e.type === 'database' || e.title.toLowerCase().includes('database') || e.title.toLowerCase().includes('schema'));
    if (dbEvt) {
      responseText = `Database integration was first detected in state **${dbEvt.date} — ${dbEvt.title}**.\n\n**Key Evidence:**\n${dbEvt.description}\n\n*Note on Metadata:* Database presence is verified by schema files and ORM imports. Exact historical insertion timestamp cannot be assumed without Git commit logs.`;
      citations.push({
        title: dbEvt.title,
        reference: dbEvt.evidence[0]?.sourceReference || 'Schema files',
        confidence: dbEvt.confidence
      });
    } else {
      responseText = `No explicit relational database schema or ORM files were verified in the uploaded artifact. Data storage appears to use flat files or external APIs.`;
    }
  } else if (lowerQuery.includes('auth') || lowerQuery.includes('jwt') || lowerQuery.includes('security') || lowerQuery.includes('login')) {
    const authEvt = project.timelineEvents.find(e => e.type === 'security' || e.title.toLowerCase().includes('auth') || e.title.toLowerCase().includes('jwt'));
    if (authEvt) {
      responseText = `Authentication & Security mechanisms were detected in state **${authEvt.date} — ${authEvt.title}**.\n\n**Evidence:**\n- Presence of auth directories & token handlers\n- Dependencies: \`${authEvt.dependencyChanges?.map(d => d.package).join(', ') || 'Security packages'}\`\n\n*Confidence:* **${authEvt.confidence.toUpperCase().replace('_', ' ')}**.`;
      citations.push({
        title: authEvt.title,
        reference: authEvt.evidence[0]?.sourceReference || 'Auth files',
        confidence: authEvt.confidence
      });
    } else {
      responseText = `Authentication mechanisms were not detected as a dedicated event in the reconstructed timeline.`;
    }
  } else if (lowerQuery.includes('missing') || lowerQuery.includes('gap') || lowerQuery.includes('uncertain')) {
    if (project.missingHistoryGaps.length > 0) {
      const gap = project.missingHistoryGaps[0];
      responseText = `**Missing History Analysis:**\n\nWe identified a coverage gap between **${gap.startYear} and ${gap.endYear}**.\n\n*Reason:* ${gap.description}\n\n**To reduce uncertainty, consider uploading:**\n${gap.recommendedArtifacts.map(a => `• ${a}`).join('\n')}`;
    } else {
      responseText = `The historical evidence across ${project.estimatedCoverage} shows contiguous signals, though exact day-level precision requires Git commit metadata.`;
    }
  } else if (matchingEvents.length > 0) {
    const evt = matchingEvents[0];
    responseText = `Found relevant historical evidence in state **${evt.date} — ${evt.title}**:\n\n${evt.description}\n\n**Evidence Details:**\n${evt.evidence.map(e => `• ${e.sourceReference}: ${e.contentSnippet}`).join('\n')}`;
    citations.push({
      title: evt.title,
      reference: evt.evidence[0]?.sourceReference || 'Artifact file',
      confidence: evt.confidence
    });
  } else {
    responseText = `I analyzed **${project.name}** across **${project.estimatedCoverage}** (${project.versionCount} reconstructed versions, ${project.evidenceCount} evidence points).\n\n**Key Evolution Summary:**\n${project.timelineEvents.slice(0, 4).map(e => `• **${e.date}**: ${e.title}`).join('\n')}\n\nAsk me specific questions like:\n- *"What was the first major change?"*\n- *"When was the database added?"*\n- *"What history is missing?"*\n- *"Which files support the ${project.timelineEvents[0]?.date || '2021'} event?"*`;
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: citations.length > 0 ? citations : undefined
  };
}

export function generateWhatChangedAnalysis(project: TimeMachineProject, versionA: string, versionB: string): string {
  const vA = project.reconstructedVersions.find(v => v.yearLabel === versionA) || project.reconstructedVersions[0];
  const vB = project.reconstructedVersions.find(v => v.yearLabel === versionB) || project.reconstructedVersions[project.reconstructedVersions.length - 1];

  return `### Evolution Analysis: ${vA?.yearLabel || 'Version A'} → ${vB?.yearLabel || 'Version B'}

#### 1. What changed?
- **Architecture**: Shifted from \`${vA?.architecture.frontend || 'Early UI'}\` + \`${vA?.architecture.backend || 'Backend'}\` to \`${vB?.architecture.frontend || 'Modern SPA'}\` + \`${vB?.architecture.backend || 'Microservices'}\`.
- **Tracked Files**: File count grew from **${vA?.filesCount || 0}** files to **${vB?.filesCount || 0}** files.
- **Dependencies**: Integrated **${Object.keys(vB?.dependencies || {}).length}** active dependencies.

#### 2. Why might this change have happened?
Evidence suggests expansion of user capacity and architectural modularization. Moving to decoupled endpoints improves maintainability and allows independent scaling.

#### 3. Supporting Evidence:
- Verified presence of new module declarations in \`${vB?.yearLabel}\` version files.
- Package manifest version increments.

#### 4. What remains uncertain?
Exact human engineering motivations and commit author notes cannot be confirmed solely from static file snapshots.`;
}
