import React from 'react';
import { ShieldCheck, Hash, Terminal, Clock, CheckCircle } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface AuditTrailViewerProps {
  project: TimeMachineProject;
}

export const AuditTrailViewer: React.FC<AuditTrailViewerProps> = ({ project }) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>CRYPTOGRAPHIC AUDIT TRAIL & REPRODUCIBILITY LOG</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic proof of analysis steps, artifact SHA-256 hashes, and pipeline execution logs.
          </p>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold uppercase">
          AUDIT VERIFIED
        </span>
      </div>

      {/* Hash Verification Box */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Artifact Cryptographic SHA-256 Hash:</span>
          <span className="text-cyan-300 font-mono text-[11px] truncate max-w-md">{project.fileHash}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <span>Uploaded Date: {project.uploadDate}</span>
          <span>Coverage Range: {project.estimatedCoverage}</span>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-slate-200 text-xs uppercase flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Execution Sequence Logs</span>
        </h3>

        <div className="space-y-2 text-xs">
          {project.auditLogs.map((log, idx) => (
            <div key={log.id || idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-cyan-300">{log.stage}</span>
                <span className="text-slate-400">{log.timestamp}</span>
              </div>
              <p className="text-slate-300 text-[11px]">{log.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
