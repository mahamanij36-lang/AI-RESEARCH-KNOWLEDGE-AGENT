import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Search, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { VectorDatabase3D } from '../3d/VectorDatabase3D';
import { INITIAL_CHUNKS } from '../../data/mockPapers';
import { DocumentChunk } from '../../types';

export const RagLabView: React.FC = () => {
  const [chunks, setChunks] = useState<DocumentChunk[]>(INITIAL_CHUNKS);
  const [testQuery, setTestQuery] = useState('How does RAG combine parametric and non-parametric memory?');
  const [isSearching, setIsSearching] = useState(false);
  const [searchScores, setSearchScores] = useState<Record<string, { dense: number; sparse: number; fused: number }>>({});
  const [hybridWeight, setHybridWeight] = useState<number>(0.7); // 0.7 Dense, 0.3 Lexical

  const pipelineSteps = [
    { title: 'PDF Ingest', desc: 'Raw document stream & OCR layout', icon: FileText, status: 'complete' },
    { title: 'Semantic Chunking', desc: 'Sliding window (512 tokens, 64 overlap)', icon: Layers, status: 'complete' },
    { title: 'Dense Embeddings', desc: 'text-embedding-004 (1536 dims)', icon: Cpu, status: 'complete' },
    { title: 'Qdrant Vector DB', desc: 'HNSW Cosine Index graph storage', icon: Database, status: 'complete' },
    { title: 'Hybrid Search', desc: 'Dense Vector + BM25 Lexical Fusion', icon: Search, status: 'active' },
    { title: 'Reranker & Filter', desc: 'Cross-encoder scoring (BGE-Reranker)', icon: Sparkles, status: 'active' },
    { title: 'Context Compression', desc: 'Token pruning & citation anchors', icon: CheckCircle2, status: 'active' }
  ];

  const handleExecuteHybridSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      // Simulate real-time hybrid scoring for each chunk
      const scores: Record<string, { dense: number; sparse: number; fused: number }> = {};
      chunks.forEach((c) => {
        const hasKeyword = c.content.toLowerCase().includes('rag') || c.content.toLowerCase().includes('memory') || c.content.toLowerCase().includes('parametric');
        const dense = hasKeyword ? 0.82 + Math.random() * 0.15 : 0.45 + Math.random() * 0.2;
        const sparse = hasKeyword ? 0.78 + Math.random() * 0.18 : 0.35 + Math.random() * 0.15;
        const fused = dense * hybridWeight + sparse * (1 - hybridWeight);
        scores[c.id] = {
          dense: parseFloat(dense.toFixed(3)),
          sparse: parseFloat(sparse.toFixed(3)),
          fused: parseFloat(fused.toFixed(3))
        };
      });
      setSearchScores(scores);
      setIsSearching(false);
    }, 850);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-emerald-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
              <Database className="w-3.5 h-3.5" />
              ENVIRONMENT 04: RAG & VECTOR DATABASE LABORATORY
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              High-Dimensional Embedding Index & Hybrid Retrieval Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time vector operations with Qdrant, cosine similarity, reciprocal rank fusion (RRF), 
              and cross-encoder context reranking before inference.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-950/80 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-slate-400">VECTOR SPACE:</span>
            <span className="text-emerald-400 font-bold">1536-D HNSW GRAPH</span>
          </div>
        </div>
      </div>

      {/* 3D Vector Database Cluster + Pipeline Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 3D Visualizer */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-4 border border-emerald-500/20 relative flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>QDRANT 3D STORAGE RACK CLUSTER & PARTICLE FLUX</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              COSINE METRIC
            </span>
          </div>

          <div className="flex-1 h-80 relative">
            <VectorDatabase3D className="w-full h-full" isSearching={isSearching} />
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>INDEX STATUS: MEMORY LOADED</span>
            <span className="text-cyan-400">SEARCH LATENCY: 2.8ms</span>
          </div>
        </div>

        {/* Pipeline Architecture Visualizer */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Agentic RAG Ingestion & Retrieval Pipeline
            </h3>
            
            <div className="space-y-2.5">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">{step.title}</div>
                        <div className="text-[11px] text-slate-400">{step.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                      STEP 0{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hybrid Search Slider */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Hybrid Search Fusion Weight:</span>
              <span className="text-cyan-400">{(hybridWeight * 100).toFixed(0)}% Vector / {((1 - hybridWeight) * 100).toFixed(0)}% BM25</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={hybridWeight}
              onChange={(e) => setHybridWeight(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Live Hybrid Vector Search Tester */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-400" />
          Test Real-time Vector Similarity & BM25 Scoring
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Enter research query to test semantic search..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 outline-none focus:border-emerald-400"
          />
          <button
            onClick={handleExecuteHybridSearch}
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Execute Vector Query</span>
          </button>
        </div>

        {/* Retrieved Chunks Grid */}
        <div className="space-y-3">
          {chunks.map((chunk) => {
            const score = searchScores[chunk.id];
            return (
              <div
                key={chunk.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 font-mono">
                  <span className="text-cyan-400 font-bold">
                    {chunk.documentTitle} (Page {chunk.pageNumber}, Chunk #{chunk.chunkIndex})
                  </span>
                  {score && (
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        Dense Cos: {score.dense}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                        BM25: {score.sparse}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                        Fused RRF: {score.fused}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">{chunk.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
