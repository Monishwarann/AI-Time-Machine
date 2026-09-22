import React, { useState } from 'react';
import { Network, FileCode, ShieldCheck, Database, Package, Sparkles, Layers, Info } from 'lucide-react';
import { TimeMachineProject, GraphNode } from '../../types/timeMachine';

interface EvidenceGraphViewProps {
  project: TimeMachineProject;
}

export const EvidenceGraphView: React.FC<EvidenceGraphViewProps> = ({ project }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(project.graphNodes[0] || null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-cyan-500/20 border-cyan-400 text-cyan-300';
      case 'file': return 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
      case 'dependency': return 'bg-purple-500/20 border-purple-400 text-purple-300';
      case 'schema': return 'bg-amber-500/20 border-amber-400 text-amber-300';
      default: return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE EVIDENCE GRAPH</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connects Timeline Events ↔ Files ↔ Dependencies ↔ Database Schemas ↔ Documentation.
          </p>
        </div>

        <div className="flex space-x-2 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Events</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Files</span>
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Dependencies</span>
          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Schemas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Graph Canvas Container */}
        <div className="lg:col-span-2 bg-[#0b0e17]/90 border border-cyan-500/20 rounded-2xl p-6 min-h-[420px] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff10_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          {/* Node Grid Layout */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            {project.graphNodes.map(node => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3.5 rounded-xl border text-left font-mono transition-all transform hover:-translate-y-1 shadow-lg ${getNodeColor(node.type)} ${
                  selectedNode?.id === node.id ? 'ring-2 ring-cyan-400 scale-105' : 'hover:border-cyan-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase mb-1">
                  <span>{node.type}</span>
                  <span className="text-cyan-400">{node.confidence}</span>
                </div>
                <div className="font-bold text-xs truncate">{node.label}</div>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 font-mono text-center pt-4 border-t border-slate-800">
            Click any node in the graph network to inspect full evidence lineage & limitations.
          </p>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold border-b border-slate-800 pb-3">
            <Info className="w-4 h-4 text-amber-400" />
            <span>NODE EVIDENCE INSPECTOR</span>
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase">Node Label</span>
                <h3 className="font-bold text-slate-100 text-sm">{selectedNode.label}</h3>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Node Category:</span>
                  <span className="text-cyan-300 uppercase font-bold">{selectedNode.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confidence Tier:</span>
                  <span className="text-emerald-300 uppercase font-bold">{selectedNode.confidence}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Reconstruction Detail</span>
                <p className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
                  {selectedNode.details || 'Verified evidence signal present in parsed artifact manifests.'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select a graph node to inspect details.</p>
          )}
        </div>
      </div>
    </div>
  );
};
