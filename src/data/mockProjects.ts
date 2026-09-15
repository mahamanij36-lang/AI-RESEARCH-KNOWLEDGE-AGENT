import { ResearchProject, UserAccount } from '../types';

export const MOCK_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-rag-2026',
    name: 'Autonomous Multi-Agent RAG Benchmark',
    code: 'PROJ-RAG-2026',
    description: 'Evaluating dense-sparse hybrid retrieval and reciprocal rank fusion across multi-hop scientific literature datasets.',
    discipline: 'Computer Science & Artificial Intelligence',
    vectorCollection: 'qdrant_rag_neurips_1536',
    qdrantClusterEndpoint: 'https://qdrant.cluster.research.internal:6333',
    primaryModel: 'Claude 3.7 Sonnet & Gemini 2.5 Pro',
    indexedPapersCount: 4,
    totalChunksCount: 242,
    collaboratorsCount: 5,
    syncStatus: 'connected',
    lastSyncTime: 'Just now',
    tags: ['Agentic RAG', 'Qdrant HNSW', 'Dense Retrieval', 'ReAct'],
    leadInvestigator: 'Dr. Elena Rostova',
    securityLevel: 'Confidential Laboratory',
    pingLatencyMs: 18
  },
  {
    id: 'proj-colpali-vision',
    name: 'Multimodal ColPali & Document Vision',
    code: 'PROJ-COLPALI-VISION',
    description: 'Late-interaction MaxSim patch embeddings over multi-column PDFs, chemical structures, and patent diagrams without OCR.',
    discipline: 'Multimodal Intelligence & Vision-Language',
    vectorCollection: 'qdrant_colpali_late_interaction',
    qdrantClusterEndpoint: 'https://qdrant-vision.cluster.internal:6333',
    primaryModel: 'Gemini 2.5 Flash Multimodal',
    indexedPapersCount: 12,
    totalChunksCount: 680,
    collaboratorsCount: 4,
    syncStatus: 'offline',
    lastSyncTime: '2 hours ago',
    tags: ['ColPali', 'Vision Language', 'Late Interaction', 'PDF Ingest'],
    leadInvestigator: 'Marcus Vance',
    securityLevel: 'Confidential Laboratory',
    pingLatencyMs: 32
  },
  {
    id: 'proj-nli-sentinel',
    name: 'Zero-Tolerance NLI Hallucination Sentinel',
    code: 'PROJ-NLI-SENTINEL',
    description: 'Deconstructs LLM outputs into atomic propositions and verifies against exact token coordinates in peer-reviewed literature.',
    discipline: 'AI Safety & Formal Fact-Checking',
    vectorCollection: 'qdrant_sentinel_factcheck_768',
    qdrantClusterEndpoint: 'https://qdrant-safety.cluster.internal:6333',
    primaryModel: 'Claude 3.5 Sonnet',
    indexedPapersCount: 8,
    totalChunksCount: 490,
    collaboratorsCount: 3,
    syncStatus: 'offline',
    lastSyncTime: '1 day ago',
    tags: ['Hallucination Radar', 'NLI', 'Fact Verification', 'Atomic Claims'],
    leadInvestigator: 'Dr. Alan Chen',
    securityLevel: 'Restricted Enterprise',
    pingLatencyMs: 24
  },
  {
    id: 'proj-qnlp-2026',
    name: 'Quantum NLP & DisCoCat Categorical Semantics',
    code: 'PROJ-QNLP-2026',
    description: 'Mapping pregroup grammar syntax trees to parameterized quantum circuits on NISQ hardware for semantic compositional parsing.',
    discipline: 'Quantum Information Science & NLP',
    vectorCollection: 'qdrant_qnlp_hamiltonian_1024',
    qdrantClusterEndpoint: 'https://qdrant-qnlp.cluster.internal:6333',
    primaryModel: 'Gemini 2.5 Pro & Qiskit',
    indexedPapersCount: 6,
    totalChunksCount: 310,
    collaboratorsCount: 6,
    syncStatus: 'offline',
    lastSyncTime: '3 days ago',
    tags: ['DisCoCat', 'Quantum Circuits', 'Hamiltonian Embeddings'],
    leadInvestigator: 'Prof. Julian Thorne',
    securityLevel: 'Public Academic',
    pingLatencyMs: 45
  }
];

export const MOCK_USERS: UserAccount[] = [
  {
    id: 'user-elena',
    name: 'Dr. Elena Rostova',
    email: 'e.rostova@csail.mit.edu',
    institution: 'MIT CSAIL & Institute for Artificial Intelligence',
    role: 'Principal Investigator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    orcidId: '0000-0002-8419-7721',
    connectedProjectId: 'proj-rag-2026',
    apiKeyConfigured: true,
    researchInterests: ['Agentic RAG', 'Multi-Agent Consensus', 'Neural-Symbolic Verification']
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    email: 'm.vance@stanford.edu',
    institution: 'Stanford AI Lab (SAIL)',
    role: 'RAG Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    orcidId: '0000-0001-9042-3319',
    connectedProjectId: 'proj-colpali-vision',
    apiKeyConfigured: true,
    researchInterests: ['Vector Search', 'Qdrant HNSW', 'Multimodal Retrieval']
  },
  {
    id: 'user-alan',
    name: 'Dr. Alan Chen',
    email: 'alan.chen@berkeley.edu',
    institution: 'Berkeley Artificial Intelligence Research (BAIR)',
    role: 'NLP Alignment Scientist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    orcidId: '0000-0003-1288-4902',
    connectedProjectId: 'proj-nli-sentinel',
    apiKeyConfigured: true,
    researchInterests: ['Hallucination Mitigation', 'NLI', 'Chain-of-Verification']
  }
];
