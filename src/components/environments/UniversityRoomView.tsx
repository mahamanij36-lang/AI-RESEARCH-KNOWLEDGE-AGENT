import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Upload, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Layers, 
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ResearchPaper, ChatMessage, AgentActivityTrace, CitationItem } from '../../types';
import { NeuralBrain3D } from '../3d/NeuralBrain3D';
import { HumanResearcherAvatar } from '../3d/HumanResearcherAvatar';

interface UniversityRoomViewProps {
  papers: ResearchPaper[];
  messages: ChatMessage[];
  onSendMessage: (query: string) => Promise<void>;
  isLoading: boolean;
  onOpenUpload: () => void;
  onSelectPaper: (paper: ResearchPaper) => void;
  onNavigateToEnv: (env: any) => void;
}

export const UniversityRoomView: React.FC<UniversityRoomViewProps> = ({
  papers,
  messages,
  onSendMessage,
  isLoading,
  onOpenUpload,
  onSelectPaper,
  onNavigateToEnv
}) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    const query = inputQuery;
    setInputQuery('');
    onSendMessage(query);
  };

  const sampleQueries = [
    'How does ReAct mitigate hallucinations compared to pure Chain-of-Thought?',
    'Compare the latency and memory trade-offs between RAG and ColPali.',
    'Explain the scaled dot-product self-attention formula from Attention Is All You Need.',
    'Synthesize a literature review on multimodal visual document retrieval.'
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero & 3D Neural Nexus Banner */}
      <div className="relative rounded-2xl glass-panel-glow p-6 overflow-hidden border border-cyan-500/30">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ENVIRONMENT 01: UNIVERSITY RESEARCH LABORATORY
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Autonomous Multimodal <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                Research & Knowledge Agent
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              An agentic research laboratory utilizing hybrid vector retrieval (Qdrant), 
              multi-agent orchestration, hallucination verification, and Claude/Gemini reasoning 
              to dissect, compare, and synthesize scientific literature.
            </p>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenUpload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Upload className="w-4 h-4" />
                Upload Papers (PDF / DOCX)
              </button>

              <button
                onClick={() => onNavigateToEnv('rag_lab')}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 flex items-center gap-2 transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                Inspect Vector DB (48 Chunks)
              </button>

              <button
                onClick={() => onNavigateToEnv('command_center')}
                className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                8 Multi-Agents Live
              </button>
            </div>
          </div>

          {/* Interactive 3D Synaptic Brain */}
          <div className="lg:col-span-5 h-72 rounded-xl glass-panel relative border border-cyan-500/20">
            <NeuralBrain3D className="w-full h-full" intensity={isLoading ? 2.2 : 1.0} />
          </div>
        </div>
      </div>

      {/* Human Researcher & Team Avatar Component */}
      <HumanResearcherAvatar />

      {/* Workspace Split: Indexed Papers & Active Research Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Indexed Research Papers */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-200">Active Knowledge Base</h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {papers.length} Papers
              </span>
            </div>

            <div className="mt-3 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => onSelectPaper(paper)}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {paper.title}
                    </h4>
                    <span className="text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {paper.year}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {paper.abstract}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono">
                    <span className="text-cyan-400/90">{paper.conferenceOrJournal}</span>
                    <span className="text-emerald-400">{paper.embeddingCount} Chunks</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenUpload}
              className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Additional Paper
            </button>
          </div>
        </div>

        {/* Right: Research Dialog & Agentic RAG Feed */}
        <div className="lg:col-span-8 flex flex-col glass-panel rounded-2xl p-5 border border-slate-800 min-h-[620px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  Autonomous Multi-Agent Dialogue
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Agentic RAG Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">Orchestrated with Deterministic Citations & Claim Sentinel</p>
              </div>
            </div>
            
            <button
              onClick={() => onNavigateToEnv('verification_center')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/40 text-emerald-400 flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verification Radar
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-200">Start Your Autonomous Research Session</h4>
                  <p className="text-xs text-slate-400 max-w-md mt-1">
                    Ask questions across uploaded papers, request comparative methodology breakdowns, 
                    or formulate literature reviews with grounded citations.
                  </p>
                </div>

                {/* Suggested Queries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl text-left pt-2">
                  {sampleQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSendMessage(q)}
                      className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-cyan-200 transition-all text-left flex items-start justify-between group"
                    >
                      <span className="line-clamp-2">{q}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-1 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/20'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800'
                    }`}
                  >
                    {/* Role badge */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] font-mono opacity-80">
                      <span>{msg.role === 'user' ? 'RESEARCHER' : 'ORCHESTRATOR & AGENT COLLECTIVE'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-line">{msg.content}</div>

                    {/* Agent Activity Trace */}
                    {msg.agentActivities && msg.agentActivities.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Multi-Agent Execution Telemetry:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {msg.agentActivities.map((act) => (
                            <div
                              key={act.id}
                              className="text-[11px] font-mono p-1.5 rounded bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                            >
                              <span className="text-slate-300 font-medium">{act.agentName}</span>
                              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> {act.action}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grounded Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80">
                        <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Grounded Academic Citations ({msg.citations.length}):</span>
                          <span className="text-emerald-400 text-[10px]">VERIFIED 100%</span>
                        </div>
                        <div className="space-y-1.5">
                          {msg.citations.map((c) => (
                            <div
                              key={c.id}
                              className="p-2 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs"
                            >
                              <div className="font-semibold text-purple-300 flex items-center justify-between">
                                <span>[{c.documentTitle}, Page {c.page}]</span>
                                <span className="text-emerald-400 text-[10px] font-mono">Conf: {(c.confidenceScore * 100).toFixed(0)}%</span>
                              </div>
                              <blockquote className="italic text-slate-300 text-[11px] mt-1 border-l border-purple-400/40 pl-2">
                                "{c.exactQuote}"
                              </blockquote>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Multi-agent reasoning pipeline executing (Orchestrator → Dense Retrieval → Verification Sentinel)...</span>
              </div>
            )}
          </div>

          {/* Input Prompt Box */}
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a scientific research question across papers or compare methodologies..."
              className="w-full pl-4 pr-24 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 font-sans shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-1.5 disabled:opacity-40 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
