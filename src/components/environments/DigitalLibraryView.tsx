import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Library, 
  Search, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  Layers, 
  Download,
  Calendar,
  User,
  CheckCircle2
} from 'lucide-react';
import { ResearchPaper } from '../../types';

interface DigitalLibraryViewProps {
  papers: ResearchPaper[];
  onSelectPaper: (paper: ResearchPaper) => void;
  onOpenUpload: () => void;
}

export const DigitalLibraryView: React.FC<DigitalLibraryViewProps> = ({
  papers,
  onSelectPaper,
  onOpenUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [inspectedPaper, setInspectedPaper] = useState<ResearchPaper | null>(papers[0] || null);

  // Extract all unique topics across papers
  const allTopics = Array.from(new Set(papers.flatMap(p => p.topics)));

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = selectedTopic === 'all' || p.topics.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2">
              <Library className="w-3.5 h-3.5" />
              ENVIRONMENT 03: 3D DIGITAL RESEARCH LIBRARY
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Multimodal Scientific Repository & Paper Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Floating holographic papers indexed with dense semantic vectors, metadata extraction, 
              and full text chunking for agentic cross-referencing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenUpload}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              Upload PDF / Document
            </button>
          </div>
        </div>
      </div>

      {/* Search & Topic Filters */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by title, author, keyword, or methodology..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-400"
          />
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
              selectedTopic === 'all'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            All Topics ({papers.length})
          </button>
          {allTopics.slice(0, 4).map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                selectedTopic === topic
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Document Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPapers.map((paper) => {
          const isInspected = inspectedPaper?.id === paper.id;
          return (
            <motion.div
              key={paper.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => {
                setInspectedPaper(paper);
                onSelectPaper(paper);
              }}
              className={`glass-panel rounded-2xl p-5 border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                isInspected
                  ? 'border-blue-400/80 shadow-xl shadow-blue-500/10 ring-1 ring-blue-400/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Paper Corner Holographic Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {paper.conferenceOrJournal}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {paper.year}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-100 line-clamp-2 mb-2 leading-snug">
                  {paper.title}
                </h3>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-2 font-mono">
                  <User className="w-3 h-3 text-cyan-400" />
                  <span className="truncate">{paper.authors.join(', ')}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {paper.abstract}
                </p>
              </div>

              {/* Topics & Metrics */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {paper.topics.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {paper.embeddingCount} Chunks
                  </span>
                  <span>{paper.pages} Pages • {paper.fileSize}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inspected Paper Deep Dive Modal / Drawer */}
      {inspectedPaper && (
        <div className="glass-panel-glow rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-slate-100">
                Paper Technical Dossier: {inspectedPaper.title}
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              QDRANT VECTORIZED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 font-mono text-xs uppercase">Core Methodology:</span>
                <p className="text-slate-200 mt-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {inspectedPaper.methodology || 'Deep neural architecture with dense semantic indexing.'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono text-xs uppercase">Key Empirical Findings:</span>
                <ul className="mt-1 space-y-1.5 text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {inspectedPaper.keyFindings?.map((kf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 font-mono text-xs uppercase">Dataset & Benchmarks:</span>
                <p className="text-slate-200 mt-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                  {inspectedPaper.datasetUsed || 'General scientific evaluation corpus'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono text-xs uppercase">Documented Limitations & Trade-offs:</span>
                <ul className="mt-1 space-y-1.5 text-amber-300/90 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {inspectedPaper.limitations?.map((lim, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
