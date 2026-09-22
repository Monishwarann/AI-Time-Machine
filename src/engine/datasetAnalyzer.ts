import Papa from 'papaparse';
import { ExtractedFile } from './archiveExtractor';

export interface DatasetAnalysisResult {
  isDataset: boolean;
  columnsCount: number;
  columnsList: string[];
  sampleRowCount: number;
  evolutionHint?: string;
}

export function analyzeDataset(files: ExtractedFile[]): DatasetAnalysisResult {
  const csvFiles = files.filter(f => f.extension === 'csv' && f.content);
  const jsonFiles = files.filter(f => f.extension === 'json' && f.content && !f.name.includes('package'));

  if (csvFiles.length === 0 && jsonFiles.length === 0) {
    return { isDataset: false, columnsCount: 0, columnsList: [], sampleRowCount: 0 };
  }

  // Pick largest CSV
  const mainCsv = csvFiles.sort((a, b) => b.size - a.size)[0];
  if (mainCsv && mainCsv.content) {
    const parsed = Papa.parse(mainCsv.content, { header: true, preview: 10 });
    const columns = parsed.meta.fields || [];
    return {
      isDataset: true,
      columnsCount: columns.length,
      columnsList: columns,
      sampleRowCount: parsed.data.length,
      evolutionHint: `Extracted ${columns.length} schema fields from ${mainCsv.name}.`
    };
  }

  return { isDataset: false, columnsCount: 0, columnsList: [], sampleRowCount: 0 };
}
