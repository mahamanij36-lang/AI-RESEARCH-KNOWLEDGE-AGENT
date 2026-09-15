import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Play, 
  CheckCircle2, 
  Radio, 
  Zap, 
  Layers, 
  ShieldAlert, 
  FileCheck2,
  RefreshCw,
  Globe,
  Sliders
} from 'lucide-react';
import { AGENTS } from '../../data/agents';
import { AgentInfo } from '../../types';
import { AgentNetwork3D } from '../3d/AgentNetwork3D';

interface CommandCenterViewProps {
  onRunAgentTask?: (agentId: string) => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({ onRunAgentTask }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-orchestrator');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [liveLogs, setLiveLogs] = useState<string[]>([
    '[00:01.04] Orchestrator: Master execution DAG initialized with 8 sub-agents',
    '[00:01.22] Retrieval Agent: Qdrant HNSW vector index loaded (48 document chunks)',
    '[00:01.45] Verification Agent: Grounding boundary initialized (threshold 0.88)',
    '[00:02.10] Citation Agent: IEEE/APA BibTeX style parser primed',
    '[00:02.40] Web Research Agent: arXiv & CrossRef live API gateways authenticated'
  ]);

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0];

  const handleTriggerOrchestration = () => {
    setIsSimulating(true);
    const newLogs = [
      `[${new Date().toLocaleTimeString()}] Orchestrator: Dispatched task to ${selectedAgent.name}`,
      `[${new Date().toLocaleTimeString()}] ${selectedAgent.name}: Processing high-dimensional inference payload`,
      `[${new Date().toLocaleTimeString()}] Verification Agent: Real-time claim check complete (0 hallucinations detected)`
    ];
    setTimeout(() => {
      setLiveLogs(prev => [...prev, ...newLogs]);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              ENVIRONMENT 02: AI COMMAND CENTER
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Multi-Agent Autonomous Orchestration Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time visualization of 8 autonomous agents communicating via inter-process message buses, 
              coordinating semantic retrieval, reasoning verification, and scientific synthesis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerOrchestration}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>Execute Agent IPC Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Visualizer & Selected Agent Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive 3D Orbit of Agent Nodes */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-4 border border-purple-500/20 relative flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>LIVE AGENT TOPOLOGY MESH (THREE.JS 3D)</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
              8 NODES CONVERGED
            </span>
          </div>

          <div className="flex-1 h-80 relative">
            <AgentNetwork3D
              className="w-full h-full"
              activeAgentId={selectedAgentId}
              onSelectAgent={setSelectedAgentId}
            />
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>DRAG / ROTATE 3D MESH</span>
            <span className="text-cyan-400">BUS PROTOCOL: JSON-RPC over WebSocket</span>
          </div>
        </div>

        {/* Right: Selected Agent Detail Card */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedAgent.avatar}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{selectedAgent.name}</h3>
                  <div className="text-xs text-purple-400 font-mono">{selectedAgent.role}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                READY
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800 mb-4">
              {selectedAgent.description}
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">BACKING LLM / ENGINE:</span>
                <span className="text-cyan-300 font-mono font-medium">{selectedAgent.model}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">TASKS COMPLETED:</span>
                <span className="text-slate-200 font-mono font-medium">{selectedAgent.metrics.tasksCompleted.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">AVERAGE LATENCY:</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedAgent.metrics.avgLatency}</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-mono">ACCURACY RATE:</span>
                <span className="text-purple-300 font-mono font-medium">{selectedAgent.metrics.accuracyRate}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4">
            <button
              onClick={() => setSelectedAgentId(selectedAgent.id)}
              className="w-full py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              Focus Agent Pipeline Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* 8 Agent Grid & Communication Matrix */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          Autonomous Multi-Agent Matrix
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {AGENTS.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-purple-500/60 bg-purple-950/30 shadow-md shadow-purple-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{agent.avatar}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {agent.metrics.avgLatency}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 mt-2">{agent.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{agent.role}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Agent Terminal Logs */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>INTER-AGENT DISPATCH LOGS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">POLLING STREAM: 250ms</span>
        </div>
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
          {liveLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed text-slate-300">
              <span className="text-cyan-400">{log.split(' ')[0]}</span>{' '}
              <span className="text-slate-200">{log.substring(log.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
