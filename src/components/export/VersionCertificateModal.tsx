import React from 'react';
import { Award, Download, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { TimeMachineProject } from '../../types/timeMachine';

interface VersionCertificateModalProps {
  project: TimeMachineProject;
  onClose: () => void;
}

export const VersionCertificateModal: React.FC<VersionCertificateModalProps> = ({ project, onClose }) => {
  const certificateId = `CERT-TM3-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const downloadCertificateJson = () => {
    const certObj = {
      certificateId,
      artifactName: project.name,
      sha256Hash: project.fileHash,
      analyzedTimestamp: project.lastAnalyzedDate,
      fileCount: project.scorecard.filesAnalyzed,
      evidenceCount: project.evidenceCount,
      eventsCount: project.timelineEvents.length,
      snapshotId: 'SNAPSHOT-#0042',
      issuer: 'AI Time Machine V3 Temporal Intelligence Engine'
    };
    const blob = new Blob([JSON.stringify(certObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '_')}_version_certificate.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md font-mono text-xs">
      <div className="relative w-full max-w-lg bg-[#0c101a] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-sm">CRYPTOGRAPHIC VERSION CERTIFICATE</h2>
              <p className="text-[11px] text-slate-400">Forensic Integrity & Snapshot Proof</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-[#07090e] border border-amber-500/30 rounded-2xl space-y-4 text-center">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
            OFFICIAL ANALYSIS SNAPSHOT #0042
          </span>
          <h3 className="text-lg font-bold text-slate-100">{project.name}</h3>

          <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-b border-slate-800 py-3 font-mono">
            <div className="flex justify-between"><span className="text-slate-400">Certificate ID:</span> <span className="text-cyan-300">{certificateId}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Artifact SHA-256:</span> <span className="text-cyan-300 truncate max-w-[200px]">{project.fileHash}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Evidence Count:</span> <span className="text-emerald-300 font-bold">{project.evidenceCount} Points</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reconstruction Status:</span> <span className="text-purple-300 font-bold">{project.reconstructionQuality.overallStatus}</span></div>
          </div>

          <div className="text-[10px] text-slate-400">
            Issued by AI Time Machine V3 Temporal Intelligence Engine • Immutable Log
          </div>
        </div>

        <button
          onClick={downloadCertificateJson}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Download Cryptographic Certificate (.json)</span>
        </button>
      </div>
    </div>
  );
};
