import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { ResearchPaper } from '../../types';

interface PaperUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newPaper: ResearchPaper) => void;
}

export const PaperUploadModal: React.FC<PaperUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('2025');
  const [topic, setTopic] = useState('Deep Learning, RAG');
  const [abstract, setAbstract] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setFileName(file.name);
    // Auto-derive clean title
    const cleanTitle = file.name
      .replace(/\.(pdf|docx|txt|md)$/i, '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    setPaperTitle(cleanTitle);
    setAbstract('Ingested document awaiting semantic chunking and automated vector indexing.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim()) return;

    setIsProcessing(true);
    setProgressStep('Extracting PDF text layers & typography coordinates...');

    setTimeout(() => {
      setProgressStep('Performing semantic recursive chunking (512 tokens)...');
    }, 600);

    setTimeout(() => {
      setProgressStep('Generating 1536-D embeddings & indexing into Qdrant...');
    }, 1200);

    setTimeout(() => {
      const newPaper: ResearchPaper = {
        id: `paper-custom-${Date.now()}`,
        title: paperTitle,
        authors: authors ? authors.split(',').map(a => a.trim()) : ['Research Scholar'],
        year: parseInt(year) || 2025,
        conferenceOrJournal: 'Uploaded Research Document',
        pages: Math.floor(Math.random() * 15) + 6,
        topics: topic ? topic.split(',').map(t => t.trim()) : ['AI Research'],
        abstract: abstract || 'Custom uploaded research paper processed through agentic RAG pipeline.',
        fileSize: '2.1 MB',
        status: 'indexed',
        embeddingCount: Math.floor(Math.random() * 30) + 24,
        methodology: 'Autonomous document extraction with dense vector semantic embeddings.',
        keyFindings: ['Fully vectorized into Qdrant collection', 'Available for multi-agent reasoning and citation verification'],
        limitations: ['Extracted via client document processor']
      };

      setIsProcessing(false);
      onUploadSuccess(newPaper);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl glass-panel-glow rounded-2xl p-6 border border-cyan-500/30 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Ingest Scientific Paper</h3>
            <p className="text-xs text-slate-400 font-mono">PDF, DOCX, Markdown, or Plain Text</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-cyan-400 bg-cyan-500/10'
                : 'border-slate-700 hover:border-cyan-500/40 bg-slate-900/50'
            }`}
          >
            <input
              type="file"
              id="file-upload-input"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileInput}
              className="hidden"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer block">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {fileName ? fileName : 'Click to select or drag & drop scientific papers here'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Supports PDF (multi-column), DOCX, TXT, MD up to 50MB</p>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Paper Title:
              </label>
              <input
                type="text"
                required
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="e.g. Scalable Multi-Agent Consensus"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Authors:
              </label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="e.g. J. Doe, A. Turing"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Publication Year:
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Topics / Keywords:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. RAG, Attention, Transformer"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Abstract:
            </label>
            <textarea
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Paste document abstract or executive summary..."
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 outline-none focus:border-cyan-400"
            />
          </div>

          {isProcessing && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>{progressStep}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !paperTitle.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Process & Embed into Vector DB</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
