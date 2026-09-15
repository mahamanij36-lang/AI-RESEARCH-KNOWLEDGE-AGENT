import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Printer, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Copy,
  BookOpen,
  Eye
} from 'lucide-react';
import { ResearchReport } from '../../types';

export const ReportStudioView: React.FC = () => {
  const [report, setReport] = useState<ResearchReport>({
    id: 'rep-rag-react-2026',
    title: 'Autonomous Multi-Agent Retrieval-Augmented Generation: Synergies of Parametric Conditioning & Action Loops',
    topic: 'Artificial Intelligence & Natural Language Processing',
    generatedDate: 'September 2026',
    author: 'AI Research & Knowledge Agent (Orchestrated Synthesis)',
    status: 'finalized',
    abstract: 'This research report investigates the architectural convergence of dense vector retrieval-augmented generation (RAG) and iterative multi-agent reasoning-action loops (ReAct). By synthesizing empirical findings from Lewis et al. (2020), Yao et al. (2023), and multimodal vision-language retrievers (ColPali), we formulate a formal taxonomy for mitigating hallucinations in knowledge-intensive domains. Natural language inference sentinels demonstrate a 64% reduction in fabricated propositions while maintaining sub-second query latency through hybrid dense-sparse vector indexing.',
    sections: [
      {
        title: '1. Introduction',
        content: 'Modern large language models exhibit vast parametric memory; however, static weights suffer from knowledge staleness and catastrophic hallucination when queried on nuanced scientific assertions. Retrieval-Augmented Generation (RAG) introduces dynamic non-parametric memory access, allowing generative models to ground token predictions in verifiable corpus documents without full retraining.'
      },
      {
        title: '2. Literature Review',
        content: 'Lewis et al. established RAG-Sequence and RAG-Token paradigms over Wikipedia embeddings, establishing state-of-the-art results on open-domain QA. Concurrently, Yao et al. demonstrated that pure chain-of-thought prompting remains susceptible to error cascading, which ReAct counters through interleaved thought-action-observation cycles that interface with live retrieval environments.'
      },
      {
        title: '3. Methodology & System Architecture',
        content: 'The evaluated system integrates: (i) an Orchestrator Agent routing queries; (ii) a Qdrant HNSW vector index of 1536-dimensional chunk embeddings; (iii) a Reciprocal Rank Fusion (RRF) module combining dense cosine similarity with BM25 lexical frequencies; and (iv) an NLI Verification Sentinel flagging unsupported propositions.'
      },
      {
        title: '4. Results & Empirical Analysis',
        content: 'Experimental evaluation over multi-hop scientific benchmarks demonstrates that hybrid retrieval achieves 94.2% recall@5, outperforming pure dense retrieval (86.1%) on exact technical jargon. Furthermore, deterministic citation mapping ensures that 98.7% of claims contain explicit document section coordinates.'
      },
      {
        title: '5. Discussion & Future Trajectories',
        content: 'While text chunking remains effective for linear prose, scientific documents containing complex tables, multi-column layouts, and diagrammatic architectures necessitate vision-language indexing approaches such as ColPali, bypassing brittle OCR steps through patch-level late interaction.'
      },
      {
        title: '6. Conclusion',
        content: 'Autonomous multi-agent orchestration paired with hybrid vector databases and verification sentinels marks a crucial step toward trustworthy, self-correcting scientific discovery assistants.'
      }
    ],
    references: [
      'Lewis, P., et al. (2020). Retrieval-augmented generation for knowledge-intensive nlp tasks. Advances in Neural Information Processing Systems (NeurIPS), 33, 9459-9474.',
      'Yao, S., et al. (2023). ReAct: Synergizing reasoning and acting in language models. International Conference on Learning Representations (ICLR).',
      'Vaswani, A., et al. (2017). Attention is all you need. Advances in Neural Information Processing Systems (NeurIPS), 30.',
      'Faysse, M., et al. (2024). ColPali: Efficient document retrieval with vision language models. arXiv preprint arXiv:2407.01449.'
    ]
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleExportPDF = () => {
    window.print();
  };

  const handleCopyBibtex = () => {
    const bibtex = `@techreport{ai_research_agent_2026,
  title={Autonomous Multi-Agent Retrieval-Augmented Generation},
  author={AI Research and Knowledge Agent},
  year={2026},
  institution={Laboratory of Distributed Autonomous Intelligence}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-2">
              <FileText className="w-3.5 h-3.5" />
              ENVIRONMENT 08: RESEARCH REPORT STUDIO & IMRAD SUITE
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Academic Report Synthesizer & Publication Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Compile comprehensive, structured scientific whitepapers with executive summaries, 
              IMRaD methodology sections, and verified BibTeX references ready for export.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono border flex items-center gap-1.5 transition-all ${
                isEditing
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Editing Mode' : 'Edit Sections'}</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Studio Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation / Sections Outline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-2xl p-4 border border-slate-800">
            <h3 className="text-xs font-mono text-indigo-300 uppercase tracking-wider mb-3">
              Document Architecture (IMRaD)
            </h3>

            <div className="space-y-1.5">
              <button
                onClick={() => setActiveSectionIndex(-1)}
                className={`w-full p-2.5 rounded-xl text-xs text-left transition-all font-medium flex items-center justify-between ${
                  activeSectionIndex === -1
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span>Abstract & Overview</span>
                <span className="font-mono text-[10px]">P. 1</span>
              </button>

              {report.sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`w-full p-2.5 rounded-xl text-xs text-left transition-all font-medium flex items-center justify-between ${
                    activeSectionIndex === idx
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <span className="font-mono text-[10px]">P. {idx + 1}</span>
                </button>
              ))}

              <button
                onClick={() => setActiveSectionIndex(99)}
                className={`w-full p-2.5 rounded-xl text-xs text-left transition-all font-medium flex items-center justify-between ${
                  activeSectionIndex === 99
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span>7. References & BibTeX</span>
                <span className="font-mono text-[10px]">4 Sources</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handleCopyBibtex}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedNotification ? 'Copied BibTeX!' : 'Copy BibTeX Citation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Paper Document Preview Canvas */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-950/80 shadow-2xl">
          {/* Academic Header */}
          <div className="border-b border-slate-800 pb-6 mb-6">
            <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-2">
              ACADEMIC RESEARCH WHITEPAPER • PEER-REVIEWED SPECIFICATION
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
              {report.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
              <span>{report.author}</span>
              <span>•</span>
              <span>{report.generatedDate}</span>
              <span>•</span>
              <span className="text-emerald-400">100% Citation Grounded</span>
            </div>
          </div>

          {/* Active Section Content */}
          <div className="space-y-6 text-sm text-slate-200 leading-relaxed font-serif sm:font-sans">
            {activeSectionIndex === -1 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold mb-2">
                  Abstract
                </h3>
                <p className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/20 text-slate-300 leading-relaxed italic text-xs sm:text-sm">
                  {report.abstract}
                </p>
              </div>
            )}

            {activeSectionIndex >= 0 && activeSectionIndex < report.sections.length && (
              <div>
                <h2 className="text-base font-bold text-slate-100 mb-3 font-sans">
                  {report.sections[activeSectionIndex].title}
                </h2>
                {isEditing ? (
                  <textarea
                    rows={8}
                    value={report.sections[activeSectionIndex].content}
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setReport(prev => {
                        const newSecs = [...prev.sections];
                        newSecs[activeSectionIndex].content = newContent;
                        return { ...prev, sections: newSecs };
                      });
                    }}
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-mono leading-relaxed outline-none focus:border-indigo-400"
                  />
                ) : (
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {report.sections[activeSectionIndex].content}
                  </p>
                )}
              </div>
            )}

            {activeSectionIndex === 99 && (
              <div>
                <h2 className="text-base font-bold text-slate-100 mb-3 font-sans">
                  7. References & Verified Provenance
                </h2>
                <div className="space-y-2 font-mono text-xs">
                  {report.references.map((ref, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                      <span className="text-indigo-400 font-bold mr-2">[{idx + 1}]</span>
                      {ref}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
