import { TimeMachineProject } from '../types/timeMachine';

export const DEMO_PROJECTS: TimeMachineProject[] = [
  {
    id: 'demo-ai-platform',
    name: 'AI Research Platform Evolution',
    description: 'Reconstructed software evolution of an AI research codebase from 2019 prototype script to 2025 multi-tenant agent system.',
    artifactType: 'Codebase',
    uploadDate: '2026-09-22',
    estimatedCoverage: '2019 → 2025',
    versionCount: 7,
    evidenceCount: 43,
    confidenceScore: 'High',
    lastAnalyzedDate: '2026-09-22 14:30',
    fileHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    scorecard: {
      versionsDetected: 7,
      filesAnalyzed: 142,
      majorChanges: 37,
      technologiesDetected: 14,
      architectureChanges: 6,
      uiChanges: 12,
      evidenceSources: 43
    },
    projectDna: {
      languagesPct: { 'Python': 55, 'TypeScript': 35, 'SQL': 10 },
      frameworks: ['FastAPI', 'React', 'Tailwind CSS', 'Next.js'],
      architectureType: 'Decoupled REST Microservices + Agents',
      databaseType: 'PostgreSQL + pgvector extension',
      apiStyle: 'OpenAPI REST + WebSockets',
      designPatterns: ['Repository Pattern', 'Agentic Loop Orchestration'],
      mlComponents: ['ChromaDB Vector Store', 'Gemini & Groq Multi-LLM Gateway']
    },
    reconstructionQuality: {
      evidenceCoveragePct: 88,
      timelineCoveragePct: 82,
      metadataAvailabilityPct: 75,
      versionCertaintyPct: 85,
      overallStatus: 'FULLY SUPPORTED'
    },
    conflicts: [
      {
        id: 'conf-demo-1',
        title: 'Retroactive Documentation Timestamp Shift',
        conflictingSources: [
          { sourceName: 'README.md header', dateClaimed: '2020', detail: 'Document claims REST API existed in 2020' },
          { sourceName: 'api/router.py', dateClaimed: '2022', detail: 'FastAPI router files introduced in 2022 artifact' }
        ],
        possibleExplanations: [
          'Documentation was written retrospectively during the 2022 refactoring',
          'Earlier Flask REST routes were replaced entirely by FastAPI'
        ],
        severity: 'medium'
      }
    ],
    anomalies: [
      {
        id: 'anom-demo-1',
        title: 'Sudden Vector Database Adoption',
        type: 'unexpected_dependency',
        description: 'Discovered abrupt addition of ChromaDB and OpenAI dependencies in year 2023 without prior staging logs.',
        evidenceIds: ['ev-7'],
        severity: 'high'
      }
    ],
    artifacts: [
      {
        id: 'art-demo-1',
        name: 'ai_research_platform_v1_v5.zip',
        type: 'ZIP',
        size: 14500000,
        uploadDate: '2026-09-22',
        hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ],
    timelineEvents: [
      {
        id: 'evt-2019',
        date: '2019',
        datePrecision: 'year',
        title: 'Initial Concept & CLI Script',
        description: 'Single standalone Python script with basic NumPy array processing and command-line execution.',
        type: 'initial_concept',
        confidence: 'verified',
        status: 'verified',
        affectedFiles: ['main.py', 'requirements.txt'],
        dependencyChanges: [{ package: 'numpy', newVersion: '1.16.2' }],
        evidence: [
          {
            id: 'ev-1',
            sourceType: 'metadata',
            sourceReference: 'main.py (Created 2019-03-14)',
            contentSnippet: '# Single-file experiment runner created by K. M.',
            confidence: 'verified'
          },
          {
            id: 'ev-2',
            sourceType: 'dependency',
            sourceReference: 'requirements.txt',
            contentSnippet: 'numpy==1.16.2\nscipy==1.2.1',
            confidence: 'verified'
          }
        ]
      },
      {
        id: 'evt-2020',
        date: '2020',
        datePrecision: 'year',
        title: 'Flask Web Prototype',
        description: 'Introduced web server layer with Flask and basic HTML templates for uploading inputs.',
        type: 'architecture',
        confidence: 'strongly_supported',
        status: 'evidence_based',
        affectedFiles: ['app.py', 'templates/index.html', 'static/css/style.css'],
        dependencyChanges: [
          { package: 'flask', newVersion: '1.1.2' },
          { package: 'numpy', oldVersion: '1.16.2', newVersion: '1.18.5' }
        ],
        evidence: [
          {
            id: 'ev-3',
            sourceType: 'file',
            sourceReference: 'app.py',
            contentSnippet: 'from flask import Flask, render_template\napp = Flask(__name__)',
            confidence: 'verified'
          }
        ]
      },
      {
        id: 'evt-2021',
        date: '2021',
        datePrecision: 'year',
        title: 'Database & Relational Persistence',
        description: 'SQLite backend introduced for storing run metrics and user query history.',
        type: 'database',
        confidence: 'strongly_supported',
        status: 'evidence_based',
        affectedFiles: ['models.py', 'database.py', 'schema.sql'],
        schemaChanges: ['Created users table', 'Created runs table with execution_time'],
        dependencyChanges: [{ package: 'sqlalchemy', newVersion: '1.4.15' }],
        evidence: [
          {
            id: 'ev-4',
            sourceType: 'schema',
            sourceReference: 'schema.sql',
            contentSnippet: 'CREATE TABLE runs (id INTEGER PRIMARY KEY, metric REAL);',
            confidence: 'strongly_supported'
          }
        ]
      },
      {
        id: 'evt-2022',
        date: '2022',
        datePrecision: 'year',
        title: 'FastAPI & JWT Authentication Added',
        description: 'Migration from Flask to FastAPI for async execution, adding bearer token JWT security.',
        type: 'security',
        confidence: 'strongly_supported',
        status: 'evidence_based',
        affectedFiles: ['api/auth.py', 'api/router.py', 'core/jwt.py'],
        dependencyChanges: [
          { package: 'fastapi', newVersion: '0.78.0' },
          { package: 'pyjwt', newVersion: '2.4.0' }
        ],
        evidence: [
          {
            id: 'ev-5',
            sourceType: 'file',
            sourceReference: 'api/auth.py',
            contentSnippet: 'def create_access_token(data: dict):\n  # JWT sign',
            confidence: 'strongly_supported'
          }
        ]
      },
      {
        id: 'evt-2023',
        date: '2023',
        datePrecision: 'year',
        title: 'Vector Embeddings & RAG Module Introduced',
        description: 'First integration of vector embeddings and semantic search pipelines.',
        type: 'feature',
        confidence: 'strongly_supported',
        status: 'evidence_based',
        affectedFiles: ['services/vector_store.py', 'services/llm_client.py'],
        dependencyChanges: [
          { package: 'chromadb', newVersion: '0.3.21' },
          { package: 'openai', newVersion: '0.27.4' }
        ],
        evidence: [
          {
            id: 'ev-7',
            sourceType: 'dependency',
            sourceReference: 'requirements.txt',
            contentSnippet: 'chromadb>=0.3.21\nopenai>=0.27.4',
            confidence: 'verified'
          }
        ]
      },
      {
        id: 'evt-2024',
        date: '2024',
        datePrecision: 'year',
        title: 'React Dashboard & Microservice Decoupling',
        description: 'Frontend migrated to modern React + Tailwind CSS SPA with decoupled REST API.',
        type: 'ui',
        confidence: 'strongly_supported',
        status: 'evidence_based',
        affectedFiles: ['frontend/src/App.tsx', 'frontend/package.json'],
        dependencyChanges: [
          { package: 'react', newVersion: '18.2.0' },
          { package: 'tailwindcss', newVersion: '3.3.0' }
        ],
        evidence: [
          {
            id: 'ev-8',
            sourceType: 'file',
            sourceReference: 'frontend/package.json',
            contentSnippet: '"react": "^18.2.0", "vite": "^4.0.0"',
            confidence: 'verified'
          }
        ]
      },
      {
        id: 'evt-2025',
        date: '2025',
        datePrecision: 'year',
        title: 'Current State: Autonomous Agent Hub',
        description: 'Multi-agent orchestration loop with full audit trail logging and PostgreSQL vector search.',
        type: 'refactoring',
        confidence: 'verified',
        status: 'verified',
        affectedFiles: ['agents/orchestrator.ts', 'db/pgvector_migration.sql'],
        evidence: [
          {
            id: 'ev-9',
            sourceType: 'file',
            sourceReference: 'agents/orchestrator.ts',
            contentSnippet: 'export class AgentOrchestrator { runToolLoop() }',
            confidence: 'verified'
          }
        ]
      }
    ],
    reconstructedVersions: [
      {
        id: 'v-2019',
        yearLabel: '2019',
        versionTag: 'v0.1-script',
        date: '2019-03-14',
        architecture: {
          frontend: 'None (CLI execution)',
          backend: 'Python numpy script',
          database: 'Flat CSV files',
          auth: 'None',
          ml: 'NumPy calculations'
        },
        filesCount: 3,
        filesList: ['main.py', 'utils.py', 'requirements.txt'],
        dependencies: { numpy: '1.16.2', scipy: '1.2.1' },
        featuresList: ['Batch calculation', 'Command-line execution', 'CSV exporter']
      },
      {
        id: 'v-2020',
        yearLabel: '2020',
        versionTag: 'v0.5-prototype',
        date: '2020-07-20',
        architecture: {
          frontend: 'Jinja2 HTML templates',
          backend: 'Flask WSGI server',
          database: 'JSON file storage',
          auth: 'None'
        },
        filesCount: 9,
        filesList: ['app.py', 'main.py', 'templates/index.html', 'static/css/style.css', 'requirements.txt'],
        dependencies: { flask: '1.1.2', numpy: '1.18.5', scipy: '1.4.1' },
        featuresList: ['Web input upload', 'Browser visualizer', 'JSON session saving']
      },
      {
        id: 'v-2021',
        yearLabel: '2021',
        versionTag: 'v1.0-monolith',
        date: '2021-11-05',
        architecture: {
          frontend: 'Flask HTML + jQuery',
          backend: 'Flask + SQLAlchemy',
          database: 'SQLite',
          auth: 'Basic HTTP Auth'
        },
        filesCount: 18,
        filesList: ['app.py', 'models.py', 'database.py', 'schema.sql', 'templates/dashboard.html'],
        dependencies: { flask: '2.0.1', sqlalchemy: '1.4.15', numpy: '1.20.3' },
        featuresList: ['SQL run persistence', 'User query tables', 'Basic authentication']
      },
      {
        id: 'v-2022',
        yearLabel: '2022',
        versionTag: 'v2.0-fastapi',
        date: '2022-09-12',
        architecture: {
          frontend: 'Vanilla JS SPA',
          backend: 'FastAPI ASGI',
          database: 'PostgreSQL 14',
          auth: 'JWT Bearer Tokens'
        },
        filesCount: 34,
        filesList: ['api/main.py', 'api/auth.py', 'core/jwt.py', 'models/user.py', 'models/run.py'],
        dependencies: { fastapi: '0.78.0', pyjwt: '2.4.0', psycopg2: '2.9.3' },
        featuresList: ['Async API routes', 'JWT Token auth', 'PostgreSQL database backend', 'Interactive Swagger UI']
      },
      {
        id: 'v-2024',
        yearLabel: '2024',
        versionTag: 'v3.5-react',
        date: '2024-04-18',
        architecture: {
          frontend: 'React 18 + Vite',
          backend: 'FastAPI + Celery Workers',
          database: 'PostgreSQL + Redis',
          auth: 'OAuth2 + JWT',
          ml: 'Vector DB (Chroma)'
        },
        filesCount: 78,
        filesList: ['frontend/src/App.tsx', 'backend/api/router.py', 'backend/services/vector_store.py'],
        dependencies: { react: '18.2.0', fastapi: '0.104.1', chromadb: '0.4.18' },
        featuresList: ['React frontend SPA', 'Background task queue', 'Semantic vector search', 'Role-based access control']
      },
      {
        id: 'v-2025',
        yearLabel: '2025',
        versionTag: 'v4.0-agentic',
        date: '2026-09-22',
        architecture: {
          frontend: 'Next.js 14 + Tailwind',
          backend: 'FastAPI Microservices',
          database: 'PostgreSQL + pgvector',
          auth: 'Supabase Auth',
          ml: 'Multi-provider LLM (Gemini + Groq)'
        },
        filesCount: 142,
        filesList: ['agents/orchestrator.ts', 'db/pgvector_migration.sql', 'frontend/app/page.tsx'],
        dependencies: { '@google/generative-ai': '0.1.1', react: '19.0.0-rc', fastapi: '0.110.0' },
        featuresList: ['Autonomous agent execution loop', 'pgvector database', 'Real-time WebSocket streaming', 'Audit log verification']
      }
    ],
    digitalFossils: [
      {
        id: 'fos-1',
        name: 'flask_session_cookie',
        type: 'config',
        firstObserved: '2020 artifact',
        lastObserved: '2021 artifact',
        description: 'Legacy Flask cookie authentication config replaced by JWT Bearer tokens in 2022.',
        currentStatus: 'replaced',
        evidence: ['app.py line 14: SECRET_KEY = "old_flask_key"', 'config.py comment: deprecated in v2.0']
      },
      {
        id: 'fos-2',
        name: 'numpy.matrix() call',
        type: 'api',
        firstObserved: '2019 artifact',
        lastObserved: '2022 artifact',
        description: 'Deprecated NumPy matrix data structure replaced by standard ndarray objects.',
        currentStatus: 'deprecated',
        evidence: ['utils.py: np.matrix([[1,2],[3,4]])']
      },
      {
        id: 'fos-3',
        name: 'chromadb==0.3.21',
        type: 'dependency',
        firstObserved: '2023 artifact',
        lastObserved: '2024 artifact',
        description: 'Early experimental vector database library replaced by PostgreSQL pgvector extension.',
        currentStatus: 'replaced',
        evidence: ['requirements_2023.txt: chromadb==0.3.21', 'db/pgvector_migration.sql']
      }
    ],
    missingHistoryGaps: [
      {
        id: 'gap-1',
        startYear: '2022-10',
        endYear: '2023-05',
        description: 'No direct code commits or configuration changes recorded between initial FastAPI release and ChromaDB integration.',
        severity: 'medium',
        recommendedArtifacts: ['Git commit logs (2022-2023)', 'Slack architecture discussion exports', 'Deployment logs']
      }
    ],
    hypotheses: [
      {
        id: 'hyp-1',
        eventId: 'evt-2022',
        eventTitle: 'FastAPI & JWT Authentication Added',
        explanations: [
          {
            letter: 'A',
            title: 'Refactored for Async Scalability',
            evidence: ['Presence of asyncio syntax in router', 'Async database driver asyncpg in requirements'],
            uncertaintyReason: 'FastAPI adoption coincided with database migration.'
          },
          {
            letter: 'B',
            title: 'Compliance & Security Requirements',
            evidence: ['JWT secret handling', 'User permissions schema created in DB'],
            uncertaintyReason: 'Exact internal business requirement date unavailable in code artifacts.'
          }
        ]
      }
    ],
    graphNodes: [
      { id: 'n-evt-2019', label: '2019 Script', type: 'event', confidence: 'verified', details: 'Initial Python prototype' },
      { id: 'n-evt-2021', label: '2021 SQLite DB', type: 'event', confidence: 'strongly_supported', details: 'Relational database added' },
      { id: 'n-evt-2022', label: '2022 FastAPI + Auth', type: 'event', confidence: 'strongly_supported', details: 'Security and REST layer' },
      { id: 'n-evt-2025', label: '2025 Agent Hub', type: 'event', confidence: 'verified', details: 'Multi-agent orchestration' },
      { id: 'n-file-main', label: 'main.py', type: 'file', confidence: 'verified', details: 'Core entry point script' },
      { id: 'n-file-auth', label: 'api/auth.py', type: 'file', confidence: 'verified', details: 'JWT authentication module' },
      { id: 'n-file-agent', label: 'agents/orchestrator.ts', type: 'file', confidence: 'verified', details: 'Agent loop' },
      { id: 'n-dep-fastapi', label: 'FastAPI 0.78', type: 'dependency', confidence: 'verified', details: 'REST Framework' },
      { id: 'n-dep-jwt', label: 'PyJWT 2.4', type: 'dependency', confidence: 'verified', details: 'Auth library' },
      { id: 'n-schema-users', label: 'users table', type: 'schema', confidence: 'strongly_supported', details: 'SQL user authentication table' }
    ],
    graphEdges: [
      { id: 'e1', source: 'n-evt-2019', target: 'n-file-main', label: 'created' },
      { id: 'e2', source: 'n-evt-2022', target: 'n-file-auth', label: 'introduced' },
      { id: 'e3', source: 'n-evt-2022', target: 'n-dep-fastapi', label: 'requires' },
      { id: 'e4', source: 'n-evt-2022', target: 'n-dep-jwt', label: 'requires' },
      { id: 'e5', source: 'n-file-auth', target: 'n-schema-users', label: 'queries' },
      { id: 'e6', source: 'n-evt-2025', target: 'n-file-agent', label: 'implements' }
    ],
    whatIfBranches: [],
    auditLogs: [
      {
        id: 'aud-1',
        timestamp: '2026-09-22 14:30:00',
        stage: 'File Validation & Extraction',
        status: 'success',
        details: 'Uploaded archive sha256:e3b0c44... extracted 142 files across 6 historical branches.',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ]
  }
];
