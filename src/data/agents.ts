import { AgentInfo } from '../types';

export const AGENTS: AgentInfo[] = [
  {
    id: 'agent-orchestrator',
    name: 'Orchestrator Agent',
    role: 'Central Workflow & Routing Engine',
    avatar: '🤖',
    status: 'idle',
    description: 'Deconstructs user queries, determines reasoning paths, spawns child agents, and coordinates the verification lifecycle.',
    model: 'Gemini 2.5 Pro / Claude 3.5 Sonnet',
    metrics: {
      tasksCompleted: 1420,
      avgLatency: '320ms',
      accuracyRate: '99.4%'
    }
  },
  {
    id: 'agent-research',
    name: 'Research Agent',
    role: 'Literature Problem Formulation',
    avatar: '🔬',
    status: 'idle',
    description: 'Formulates targeted academic hypotheses, identifies core methodologies, and maps domain taxonomies.',
    model: 'Gemini 2.5 Flash',
    metrics: {
      tasksCompleted: 980,
      avgLatency: '410ms',
      accuracyRate: '98.7%'
    }
  },
  {
    id: 'agent-retrieval',
    name: 'Retrieval Agent',
    role: 'Dense & Hybrid Vector Search',
    avatar: '⚡',
    status: 'idle',
    description: 'Executes hybrid search (Qdrant Cosine Similarity + BM25 Lexical) across indexed PDF chunks and tables.',
    model: 'Text-Embedding-004 + Qdrant',
    metrics: {
      tasksCompleted: 3410,
      avgLatency: '180ms',
      accuracyRate: '99.1%'
    }
  },
  {
    id: 'agent-web',
    name: 'Web Research Agent',
    role: 'External Academic Indexing',
    avatar: '🌐',
    status: 'idle',
    description: 'Queries arXiv, CrossRef, Semantic Scholar, and live academic web sources for missing literature.',
    model: 'Gemini Search Grounding Engine',
    metrics: {
      tasksCompleted: 640,
      avgLatency: '780ms',
      accuracyRate: '97.8%'
    }
  },
  {
    id: 'agent-analysis',
    name: 'Analysis Agent',
    role: 'Deep Semantic & Methodology Extraction',
    avatar: '🧠',
    status: 'idle',
    description: 'Dissects empirical results, algorithmic frameworks, computational complexity, and data benchmarks.',
    model: 'Claude 3.5 Sonnet',
    metrics: {
      tasksCompleted: 1150,
      avgLatency: '590ms',
      accuracyRate: '98.9%'
    }
  },
  {
    id: 'agent-comparison',
    name: 'Comparison Agent',
    role: 'Multi-Paper Cross-Evaluation',
    avatar: '⚖️',
    status: 'idle',
    description: 'Generates comparative matrices across methodologies, benchmark datasets, trade-offs, and research gaps.',
    model: 'Gemini 2.5 Pro',
    metrics: {
      tasksCompleted: 420,
      avgLatency: '620ms',
      accuracyRate: '98.5%'
    }
  },
  {
    id: 'agent-verification',
    name: 'Verification Agent',
    role: 'Hallucination & Claim Sentinel',
    avatar: '🛡️',
    status: 'idle',
    description: 'Scrutinizes every proposed statement against exact document text chunks; detects unsupported claims.',
    model: 'NLI Fact-Checking Sentinel',
    metrics: {
      tasksCompleted: 2190,
      avgLatency: '240ms',
      accuracyRate: '99.8%'
    }
  },
  {
    id: 'agent-citation',
    name: 'Citation Agent',
    role: 'Provenance & BibTeX Formatter',
    avatar: '📑',
    status: 'idle',
    description: 'Attaches precise page numbers, section headers, DOIs, and formatted academic citations (IEEE, APA, BibTeX).',
    model: 'BibTeX Citation Engine',
    metrics: {
      tasksCompleted: 1840,
      avgLatency: '150ms',
      accuracyRate: '99.9%'
    }
  },
  {
    id: 'agent-report',
    name: 'Report Agent',
    role: 'IMRaD Whitepaper Synthesizer',
    avatar: '📊',
    status: 'idle',
    description: 'Drafts comprehensive research whitepapers with executive summaries, literature reviews, and exportable PDF format.',
    model: 'Document Synthesis Engine',
    metrics: {
      tasksCompleted: 510,
      avgLatency: '850ms',
      accuracyRate: '98.2%'
    }
  }
];
