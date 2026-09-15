import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  CheckCircle2, 
  SlidersHorizontal,
  BookmarkPlus
} from 'lucide-react';
import { WebSearchResult } from '../../types';

export const WebResearchView: React.FC = () => {
  const [query, setQuery] = useState('agentic rag multi-agent orchestration architectures');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<WebSearchResult[]>([
    {
      title: 'Agentic RAG: Survey on Autonomous Agent-Driven Retrieval Augmented Generation',
      snippet: 'An extensive survey evaluating router-based, iterative, and branching multi-agent RAG architectures over complex multi-hop question answering benchmarks.',
      url: 'https://arxiv.org/abs/2501.09138',
      source: 'arXiv CS.AI',
      relevanceScore: 0.96
    },
    {
      title: 'Multi-Agent Collaboration with Dynamic Task Decomposition for Scientific Discovery',
      snippet: 'Proposes an agent orchestration framework where specialized researcher, verifier, and coder agents collaborate through structured JSON protocols.',
      url: 'https://semanticscholar.org/paper/mac-scientific',
      source: 'Semantic Scholar',
      relevanceScore: 0.92
    },
    {
      title: 'Benchmarking Hallucination Mitigation in Large Language Models via Multi-Document NLI',
      snippet: 'Investigates Natural Language Inference (NLI) sentence-level verification models to enforce strict citation anchors on scientific outputs.',
      url: 'https://aclanthology.org/2024.findings-acl.128',
      source: 'ACL Anthology',
      relevanceScore: 0.89
    },
    {
      title: 'Dense Retrieval vs. ColPali: Late Interaction for Graphical and Tabular Document QA',
      snippet: 'Examines trade-offs in GPU memory footprint, index throughput, and late-interaction MaxSim precision on financial tables and patent diagrams.',
      url: 'https://neurips.cc/virtual/2024/poster/88412',
      source: 'NeurIPS 2024',
      relevanceScore: 0.88
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-sky-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-2">
              <Globe className="w-3.5 h-3.5" />
              ENVIRONMENT 05: WEB RESEARCH CENTER
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              External Academic Literature Indexing & Crawlers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Holographic search engines integrating arXiv, Semantic Scholar, CrossRef, and PubMed 
              to enrich internal document knowledge with external empirical citations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-sky-500/20">
            <span className="text-slate-400">STATUS:</span>
            <span className="text-sky-400 font-bold">4 OPEN API GATEWAYS</span>
          </div>
        </div>
      </div>

      {/* Query Bar */}
      <form onSubmit={handleSearch} className="glass-panel rounded-2xl p-4 border border-slate-800 flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search external scientific literature across arXiv, PubMed, and CrossRef..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-sky-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
          <span>Query External Sources</span>
        </button>
      </form>

      {/* Holographic Source Display Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((res, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 font-mono text-[11px]">
                <span className="text-sky-400 font-semibold">{res.source}</span>
                <span className="text-emerald-400">Relevance: {(res.relevanceScore * 100).toFixed(0)}%</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-2 leading-snug hover:text-sky-300 transition-colors">
                {res.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {res.snippet}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1 transition-colors"
              >
                <span>View Source Preprint</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button className="px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-mono border border-sky-500/20 flex items-center gap-1 transition-all">
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Ingest into Vector DB</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
