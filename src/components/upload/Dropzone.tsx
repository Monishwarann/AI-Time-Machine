import React, { useState, useRef } from 'react';
import { Upload, FileCode, CheckCircle, AlertCircle, Sparkles, FolderArchive, Layers, ArrowRight } from 'lucide-react';
import { processZipFile, processFileList, ExtractedFile } from '../../engine/archiveExtractor';
import { reconstructTimeMachine } from '../../engine/timelineReconstructor';
import { projectStore } from '../../store/projectStore';

interface DropzoneProps {
  onComplete: (projectId: string) => void;
  onCancel: () => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onComplete, onCancel }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [projectNameInput, setProjectNameInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const stages = [
    'Uploading artifact files...',
    'Extracting archive contents...',
    'Scanning AST & document syntax...',
    'Analyzing metadata & timestamps...',
    'Analyzing structural evolution signals...',
    'Detecting dependency versions...',
    'Building chronological timeline...',
    'Generating evidence graph...'
  ];

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    let extracted: ExtractedFile[] = [];

    try {
      const firstFile = files[0];
      if (firstFile.name.toLowerCase().endsWith('.zip')) {
        setProgressStage(stages[0]);
        setProgressPercent(15);
        await new Promise(r => setTimeout(r, 400));

        setProgressStage(stages[1]);
        setProgressPercent(30);
        extracted = await processZipFile(firstFile);
      } else {
        setProgressStage(stages[0]);
        setProgressPercent(20);
        extracted = await processFileList(files);
      }

      setProgressStage(stages[2]);
      setProgressPercent(45);
      await new Promise(r => setTimeout(r, 400));

      setProgressStage(stages[4]);
      setProgressPercent(70);
      await new Promise(r => setTimeout(r, 400));

      setProgressStage(stages[6]);
      setProgressPercent(90);

      const name = projectNameInput || firstFile.name.replace(/\.[^/.]+$/, '') || 'Uploaded Project';
      const timeMachine = reconstructTimeMachine(name, extracted, (stage) => setProgressStage(stage));

      setProgressPercent(100);
      await new Promise(r => setTimeout(r, 300));

      projectStore.addProject(timeMachine);
      setIsProcessing(false);
      onComplete(timeMachine.id);
    } catch (err) {
      console.error('Processing error:', err);
      alert('Error parsing uploaded artifact. Ensure file format is valid.');
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-slate-100 text-base">ARTIFACT ANALYSIS ENGINE</h2>
              <p className="text-xs text-slate-400 font-mono">Upload project archive, codebase, document, or dataset.</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-200 text-xs font-mono">
            Cancel
          </button>
        </div>

        {/* Name Input */}
        <div className="space-y-1.5 font-mono text-xs">
          <label className="text-slate-300">Project Name (Optional)</label>
          <input
            type="text"
            value={projectNameInput}
            onChange={e => setProjectNameInput(e.target.value)}
            placeholder="e.g. Legacy E-Commerce Backend (2019-2024)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Processing State Overlay */}
        {isProcessing ? (
          <div className="py-10 px-6 bg-slate-900/80 border border-cyan-500/40 rounded-2xl text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping"></div>
              <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-amber-400 animate-spin flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-300" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono font-bold text-slate-200 text-sm">
                RECONSTRUCTING DIGITAL ARTIFACT HISTORY
              </h3>
              <p className="font-mono text-xs text-cyan-300 animate-pulse">{progressStage}</p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto space-y-1">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{progressPercent}% Completed</span>
            </div>
          </div>
        ) : (
          /* Dropzone Box */
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center space-y-4 transition-all ${
              isDragging
                ? 'border-cyan-400 bg-cyan-950/40'
                : 'border-slate-800 hover:border-cyan-500/40 bg-slate-900/40'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Upload className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="font-mono font-semibold text-slate-200 text-sm">
                Drag and drop your project ZIP or files here
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Supported: ZIP, PDF, DOCX, CSV, JSON, MD, JS, TS, PY, JAVA, CPP, SQL, HTML, CSS
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".zip,.pdf,.docx,.pptx,.xlsx,.csv,.json,.txt,.md,.html,.css,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.sql"
                onChange={e => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs transition-all"
              >
                Select File / ZIP
              </button>

              <input
                ref={folderInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                onChange={e => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => folderInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-all"
              >
                Select Code Folder
              </button>
            </div>
          </div>
        )}

        {/* Security & Verification Disclaimer */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-[11px] font-mono text-slate-400 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Metadata can be modified or lost and should not automatically be treated as definitive historical evidence. Processing is performed locally within your session.
          </span>
        </div>
      </div>
    </div>
  );
};
