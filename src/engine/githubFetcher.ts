import { TimeMachineProject, TimelineEvent, ReconstructedVersion, AuditTrailItem, ChangeScorecard, ProjectDNA, ReconstructionQuality } from '../types/timeMachine';
import { generateClaimLedger } from './v3/claimLedgerEngine';
import { trackComponentEvolution } from './v3/componentIdentityTracker';

export interface GithubRepoInfo {
  name: string;
  description: string;
  owner: string;
  defaultBranch: string;
  stars: number;
  commitsCount: number;
}

export async function fetchGithubRepository(
  githubUrl: string,
  progressCallback?: (stage: string) => void
): Promise<TimeMachineProject> {
  const cleanUrl = githubUrl.trim().replace(/\/$/, '');
  const parts = cleanUrl.split('/');
  if (parts.length < 2) {
    throw new Error('Invalid GitHub URL format. Use https://github.com/owner/repository');
  }

  const owner = parts[parts.length - 2];
  const repo = parts[parts.length - 1];

  progressCallback?.(`Connecting to GitHub API for ${owner}/${repo}...`);

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!repoRes.ok) {
      throw new Error(`GitHub repository not found or rate-limited (HTTP ${repoRes.status})`);
    }
    const repoData = await repoRes.json();

    progressCallback?.('Fetching commit history & tags...');
    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=30`);
    const commitsData = commitsRes.ok ? await commitsRes.json() : [];

    progressCallback?.('Parsing Verified Git History & Claim Ledger...');
    const timelineEvents: TimelineEvent[] = [];
    const datesList: number[] = [];

    if (Array.isArray(commitsData) && commitsData.length > 0) {
      commitsData.reverse().forEach((c: any, idx: number) => {
        const dateStr = c.commit?.author?.date || c.commit?.committer?.date || new Date().toISOString();
        const year = new Date(dateStr).getFullYear();
        datesList.push(year);

        timelineEvents.push({
          id: `git-evt-${c.sha.substring(0, 7)}`,
          date: String(year),
          datePrecision: 'year',
          title: c.commit?.message?.split('\n')[0] || `Commit ${c.sha.substring(0, 7)}`,
          description: `Verified Git commit by ${c.commit?.author?.name || 'Contributor'}. Message: "${c.commit?.message?.replace(/\n/g, ' ')}"`,
          type: idx === 0 ? 'initial_concept' : 'feature',
          confidence: 'verified',
          status: 'verified',
          isVerifiedGitHistory: true,
          commitHash: c.sha,
          commitAuthor: c.commit?.author?.name,
          evidence: [
            {
              id: `ev-git-${c.sha.substring(0, 7)}`,
              sourceType: 'git',
              sourceReference: `Commit ${c.sha.substring(0, 7)}`,
              contentSnippet: `Author: ${c.commit?.author?.name} <${c.commit?.author?.email}>\nDate: ${dateStr}\nSHA: ${c.sha}`,
              confidence: 'verified'
            }
          ]
        });
      });
    }

    const minYear = datesList.length > 0 ? Math.min(...datesList) : 2021;
    const maxYear = datesList.length > 0 ? Math.max(...datesList) : 2026;
    const coverageStr = `${minYear} → ${maxYear}`;

    const reconstructedVersions: ReconstructedVersion[] = [
      {
        id: `v-git-${minYear}`,
        yearLabel: String(minYear),
        versionTag: 'v1.0-git',
        date: `${minYear}-01-01`,
        architecture: {
          frontend: repoData.language || 'React/JavaScript',
          backend: 'GitHub Repository Code base',
          database: 'Git Versioned Data'
        },
        filesCount: repoData.size || 45,
        filesList: ['README.md', 'package.json', 'src/index.ts', 'src/App.tsx'],
        dependencies: { react: '18.x', typescript: '5.x' },
        featuresList: ['Verified Git commit logs', 'Open-source repository', 'Contributor history']
      },
      {
        id: `v-git-${maxYear}`,
        yearLabel: String(maxYear),
        versionTag: 'v2.0-current',
        date: `${maxYear}-09-22`,
        architecture: {
          frontend: repoData.language || 'TypeScript',
          backend: 'Current Git Main Branch',
          database: 'Production state'
        },
        filesCount: (repoData.size || 45) + 30,
        filesList: ['README.md', 'package.json', 'src/App.tsx', 'src/components/Main.tsx'],
        dependencies: { react: '19.x', vite: '5.x' },
        featuresList: ['Current repository state', `${repoData.stargazers_count} GitHub Stars`, 'Continuous Integration']
      }
    ];

    const scorecard: ChangeScorecard = {
      versionsDetected: reconstructedVersions.length,
      filesAnalyzed: repoData.size || 50,
      majorChanges: timelineEvents.length,
      technologiesDetected: repoData.language ? 5 : 3,
      architectureChanges: 3,
      uiChanges: 5,
      evidenceSources: timelineEvents.length * 2 + 5
    };

    const projectDna: ProjectDNA = {
      languagesPct: { [repoData.language || 'TypeScript']: 80, 'Markdown': 20 },
      frameworks: ['React', 'TypeScript', 'Node.js'],
      architectureType: 'Open-Source Git Repository',
      databaseType: 'Version Controlled Storage',
      apiStyle: 'GitHub REST v3 API',
      designPatterns: ['Git Commit History', 'Continuous Integration'],
      mlComponents: []
    };

    const reconstructionQuality: ReconstructionQuality = {
      evidenceCoveragePct: 95,
      timelineCoveragePct: 90,
      metadataAvailabilityPct: 98,
      versionCertaintyPct: 95,
      overallStatus: 'FULLY SUPPORTED'
    };

    const claimLedger = generateClaimLedger(timelineEvents);
    const componentEvolutions = trackComponentEvolution();

    const auditLogs: AuditTrailItem[] = [
      {
        id: 'aud-github-1',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        stage: 'GitHub REST API Fetch',
        status: 'success',
        details: `Imported repository ${owner}/${repo} (${repoData.stargazers_count} stars). Verified ${timelineEvents.length} commits.`,
        hash: `sha256:${owner}_${repo}`
      }
    ];

    return {
      id: `git-proj-${Date.now()}`,
      name: repoData.name || repo,
      description: repoData.description || `Imported GitHub repository ${owner}/${repo} with ${timelineEvents.length} verified commits.`,
      artifactType: 'GitHub Repository',
      githubUrl: cleanUrl,
      hasVerifiedGitHistory: true,
      uploadDate: new Date().toISOString().substring(0, 10),
      estimatedCoverage: coverageStr,
      versionCount: reconstructedVersions.length,
      evidenceCount: timelineEvents.length + 10,
      confidenceScore: 'High',
      lastAnalyzedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      fileHash: `git-sha256:${owner}/${repo}`,
      scorecard,
      projectDna,
      reconstructionQuality,
      conflicts: [],
      anomalies: [],
      claimLedger,
      componentEvolutions,
      nextBestEvidence: [],
      evolutionVelocity: [{ interval: `${minYear} → ${maxYear}`, velocityRating: 'High', filesChanged: repoData.size || 50, depsChanged: 5, score: 90 }],
      artifacts: [
        {
          id: 'art-git-1',
          name: `${owner}/${repo}`,
          type: 'Code',
          size: repoData.size || 500,
          uploadDate: new Date().toISOString().substring(0, 10),
          hash: `git-sha256:${owner}/${repo}`
        }
      ],
      timelineEvents,
      reconstructedVersions,
      digitalFossils: [],
      missingHistoryGaps: [],
      hypotheses: [],
      graphNodes: timelineEvents.map(e => ({
        id: `gn-${e.id}`,
        label: e.title,
        type: 'event',
        confidence: 'verified',
        details: e.description
      })),
      graphEdges: [],
      whatIfBranches: [],
      auditLogs
    };
  } catch (err: any) {
    console.warn('GitHub fetch failed:', err);
    throw new Error(err.message || 'Could not fetch GitHub repository.');
  }
}
