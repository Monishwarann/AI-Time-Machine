import { ExtractedFile } from './archiveExtractor';

export interface CodeAnalysisResult {
  detectedLanguages: string[];
  detectedFrameworks: string[];
  dependencies: Record<string, string>;
  keyFilesFound: string[];
  authDetected: boolean;
  databaseDetected: boolean;
  apiDetected: boolean;
  vectorDbDetected: boolean;
}

export function analyzeCodebase(files: ExtractedFile[]): CodeAnalysisResult {
  const languagesSet = new Set<string>();
  const frameworksSet = new Set<string>();
  const dependencies: Record<string, string> = {};
  const keyFilesFound: string[] = [];

  let authDetected = false;
  let databaseDetected = false;
  let apiDetected = false;
  let vectorDbDetected = false;

  for (const file of files) {
    const ext = file.extension.toLowerCase();
    const lowerPath = file.path.toLowerCase();

    // Languages
    if (ext === 'py') languagesSet.add('Python');
    if (ext === 'js' || ext === 'jsx') languagesSet.add('JavaScript');
    if (ext === 'ts' || ext === 'tsx') languagesSet.add('TypeScript');
    if (ext === 'java') languagesSet.add('Java');
    if (ext === 'cpp' || ext === 'c') languagesSet.add('C/C++');
    if (ext === 'go') languagesSet.add('Go');
    if (ext === 'rs') languagesSet.add('Rust');
    if (ext === 'php') languagesSet.add('PHP');
    if (ext === 'html') languagesSet.add('HTML');
    if (ext === 'css') languagesSet.add('CSS');
    if (ext === 'sql') languagesSet.add('SQL');

    // Key file patterns & framework hints
    if (lowerPath.includes('package.json') && file.content) {
      keyFilesFound.push(file.path);
      try {
        const pkg = JSON.parse(file.content);
        const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
        for (const [depName, version] of Object.entries(deps)) {
          dependencies[depName] = String(version);
          if (depName === 'react') frameworksSet.add('React');
          if (depName === 'next') frameworksSet.add('Next.js');
          if (depName === 'vue') frameworksSet.add('Vue');
          if (depName === 'angular' || depName.startsWith('@angular/')) frameworksSet.add('Angular');
          if (depName === 'express') frameworksSet.add('Express');
          if (depName === 'jsonwebtoken' || depName === 'jose' || depName === 'passport') authDetected = true;
          if (depName.includes('pg') || depName.includes('mysql') || depName.includes('prisma') || depName.includes('sequelize')) databaseDetected = true;
          if (depName.includes('chromadb') || depName.includes('pinecone') || depName.includes('weaviate') || depName.includes('pgvector')) vectorDbDetected = true;
        }
      } catch (err) {
        console.warn('Could not parse package.json', err);
      }
    }

    if ((lowerPath.includes('requirements.txt') || lowerPath.includes('pyproject.toml')) && file.content) {
      keyFilesFound.push(file.path);
      const lines = file.content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim().toLowerCase();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const parts = trimmed.split(/==|>=|<=|~=/);
        const depName = parts[0].trim();
        const ver = parts[1]?.trim() || 'latest';
        if (depName) {
          dependencies[depName] = ver;
          if (depName === 'django') frameworksSet.add('Django');
          if (depName === 'flask') frameworksSet.add('Flask');
          if (depName === 'fastapi') frameworksSet.add('FastAPI');
          if (depName === 'pyjwt' || depName === 'passlib') authDetected = true;
          if (depName === 'sqlalchemy' || depName === 'psycopg2' || depName === 'peewee') databaseDetected = true;
          if (depName === 'chromadb' || depName === 'qdrant-client' || depName === 'langchain') vectorDbDetected = true;
        }
      }
    }

    if (lowerPath.includes('auth') || lowerPath.includes('login') || lowerPath.includes('jwt') || lowerPath.includes('session')) {
      authDetected = true;
    }
    if (lowerPath.includes('schema.sql') || lowerPath.includes('migration') || lowerPath.includes('models.py') || lowerPath.includes('database')) {
      databaseDetected = true;
    }
    if (lowerPath.includes('api/') || lowerPath.includes('routes/') || lowerPath.includes('controllers/')) {
      apiDetected = true;
    }
  }

  return {
    detectedLanguages: Array.from(languagesSet),
    detectedFrameworks: Array.from(frameworksSet),
    dependencies,
    keyFilesFound,
    authDetected,
    databaseDetected,
    apiDetected,
    vectorDbDetected,
  };
}
