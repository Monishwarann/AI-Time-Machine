import React from 'react';
import { Database, TrendingUp, BarChart2, CheckCircle2, Layers, ShieldCheck, AlertCircle } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface DatasetEvolutionViewProps {
  project: TimeMachineProject;
}

export const DatasetEvolutionView: React.FC<DatasetEvolutionViewProps> = ({ project }) => {
  const datasetVersions = project.reconstructedVersions.filter(v => v.schemaSummary);

  const sampleGrowthData = [
    { year: '2018', records: 12500, columns: 8, missingPct: '4.2%' },
    { year: '2020', records: 48000, columns: 16, missingPct: '2.1%' },
    { year: '2022', records: 195000, columns: 23, missingPct: '0.8%' },
    { year: '2024', records: 850000, columns: 31, missingPct: '0.2%' }
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-purple-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-100 text-base flex items-center space-x-2">
            <Database className="w-5 h-5 text-purple-400" />
            <span>DATASET TIME MACHINE (SCHEMA & EVOLUTION CHARTS)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracks record growth, column additions, data types, and schema evolution across dataset versions.
          </p>
        </div>

        <div className="flex space-x-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
            Schema Evolution: 8 → 31 Columns
          </span>
        </div>
      </div>

      {/* Visual Evolution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record Growth Chart */}
        <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-slate-200 text-xs flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>RECORD COUNT GROWTH</span>
            </span>
            <span className="text-[10px] text-slate-400">Total Rows Extrapolated</span>
          </div>

          <div className="space-y-3 pt-2">
            {sampleGrowthData.map(d => (
              <div key={d.year} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold text-cyan-300">{d.year}</span>
                  <span>{d.records.toLocaleString()} rows</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(15, (d.records / 850000) * 100))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature / Column Growth Chart */}
        <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-slate-200 text-xs flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span>SCHEMA COLUMN COUNT EXPANSION</span>
            </span>
            <span className="text-[10px] text-slate-400">Feature Count</span>
          </div>

          <div className="space-y-3 pt-2">
            {sampleGrowthData.map(d => (
              <div key={d.year} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold text-amber-300">{d.year}</span>
                  <span>{d.columns} Columns (Missing: {d.missingPct})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(20, (d.columns / 31) * 100))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schema Evolution Table */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">RECONSTRUCTED SCHEMA CHRONOLOGY</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {sampleGrowthData.map(d => (
            <div key={d.year} className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-cyan-300">Era {d.year}</span>
                <span className="text-[10px] text-slate-400">{d.columns} Cols</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                <li className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>timestamp (datetime)</span>
                </li>
                <li className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>station_id (string)</span>
                </li>
                {d.columns >= 16 && (
                  <li className="flex items-center space-x-1 text-amber-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>wind_speed_ms (float)</span>
                  </li>
                )}
                {d.columns >= 23 && (
                  <li className="flex items-center space-x-1 text-purple-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>elevation_m (int)</span>
                  </li>
                )}
                {d.columns >= 31 && (
                  <li className="flex items-center space-x-1 text-cyan-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>anomaly_score (float)</span>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
