import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  GitCompare, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Sliders, 
  ArrowRightLeft,
  Download
} from 'lucide-react';
import { ResearchPaper } from '../../types';

interface AiAnalysisViewProps {
  papers: ResearchPaper[];
}

export const AiAnalysisView: React.FC<AiAnalysisViewProps> = ({ papers }) => {
  const [selectedPaperA, setSelectedPaperA] = useState<string>(papers[0]?.id || 'paper-rag-01');
  const [selectedPaperB, setSelectedPaperB] = useState<string>(papers[1]?.id || 'paper-react-02');
  const [activeTab, setActiveTab] = useState<'matrix' | 'gap_analysis' | 'tradeoffs'>('matrix');

  const paperA = papers.find(p => p.id === selectedPaperA) || papers[0];
  const paperB = papers.find(p => p.id === selectedPaperB) || papers[1];

  const comparisonAttributes = [
    {
      label: 'Core Methodology',
      valA: paperA?.methodology || 'Parametric sequence-to-sequence conditioned on dense neural retrieval.',
      valB: paperB?.methodology || 'Interleaved Thought-Action-Observation trajectories prompting.'
    },
    {
      label: 'Primary Evaluation Dataset',
      valA: paperA?.datasetUsed || 'Natural Questions, TriviaQA, CuratedTREC',
      valB: paperB?.datasetUsed || 'HotpotQA, Fever, ALFWorld, WebShop'
    },
    {
      label: 'Key Strengths & Advantages',
      valA: paperA?.keyFindings?.join(' ') || 'State-of-the-art open-domain accuracy with reduced hallucinations.',
      valB: paperB?.keyFindings?.join(' ') || 'High interpretability and actionable grounding in interactive tools.'
    },
    {
      label: 'Documented Limitations',
      valA: paperA?.limitations?.join(' ') || 'Passage segmentation boundary constraints; top-k retrieval overhead.',
      valB: paperB?.limitations?.join(' ') || 'Context length consumption scales with thought steps; latency.'
    },
    {
      label: 'Identified Research Gap',
      valA: 'Absence of visual modality comprehension (multimodal documents with tables & charts).',
      valB: 'Lack of multi-hop vector caching when navigating multi-step external environments.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-amber-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
              <Cpu className="w-3.5 h-3.5" />
              ENVIRONMENT 06: AI ANALYSIS & COMPARISON LABORATORY
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Cross-Paper Benchmark Dissection & Gap Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Deconstruct algorithms, mathematical formulations, empirical gains, and critical research gaps 
              across multiple scientific publications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
              SYNTHESIS ENGINE ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Paper Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paper A Picker */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
            Reference Paper A:
          </label>
          <select
            value={selectedPaperA}
            onChange={(e) => setSelectedPaperA(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-400 font-medium"
          >
            {papers.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.year})
              </option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">
            {paperA?.authors.slice(0, 2).join(', ')} et al. • {paperA?.conferenceOrJournal}
          </div>
        </div>

        {/* Paper B Picker */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-2">
            Comparative Paper B:
          </label>
          <select
            value={selectedPaperB}
            onChange={(e) => setSelectedPaperB(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 outline-none focus:border-purple-400 font-medium"
          >
            {papers.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.year})
              </option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">
            {paperB?.authors.slice(0, 2).join(', ')} et al. • {paperB?.conferenceOrJournal}
          </div>
        </div>
      </div>

      {/* Comparative Attribute Matrix */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-amber-400" />
            Empirical Comparison Matrix
          </h3>
          <span className="text-xs font-mono text-slate-400">5 MULTI-DIMENSIONAL CRITERIA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-3 px-4 w-1/4">DIMENSION</th>
                <th className="py-3 px-4 w-3/8 text-cyan-300">PAPER A ({paperA?.year})</th>
                <th className="py-3 px-4 w-3/8 text-purple-300">PAPER B ({paperB?.year})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonAttributes.map((attr, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-300 text-xs">
                    {attr.label}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 leading-relaxed bg-cyan-950/10 border-l border-cyan-500/10">
                    {attr.valA}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 leading-relaxed bg-purple-950/10 border-l border-purple-500/10">
                    {attr.valB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
