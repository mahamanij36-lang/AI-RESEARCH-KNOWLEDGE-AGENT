// Types for AI Research & Knowledge Agent

export type EnvironmentType = 
  | 'login'
  | 'university_room'
  | 'command_center'
  | 'digital_library'
  | 'rag_lab'
  | 'web_research'
  | 'ai_analysis'
  | 'verification_center'
  | 'report_studio';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: string;
  avatar: string;
  orcidId?: string;
  connectedProjectId: string;
  apiKeyConfigured: boolean;
  researchInterests: string[];
}

export interface ResearchProject {
  id: string;
  name: string;
  code: string;
  description: string;
  discipline: string;
  vectorCollection: string;
  qdrantClusterEndpoint: string;
  primaryModel: string;
  indexedPapersCount: number;
  totalChunksCount: number;
  collaboratorsCount: number;
  syncStatus: 'connected' | 'syncing' | 'offline';
  lastSyncTime: string;
  tags: string[];
  leadInvestigator: string;
  securityLevel: 'Public Academic' | 'Confidential Laboratory' | 'Restricted Enterprise';
  pingLatencyMs?: number;
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'analyzing' | 'searching' | 'verifying' | 'generating' | 'completed';
  description: string;
  model: string;
  metrics: {
    tasksCompleted: number;
    avgLatency: string;
    accuracyRate: string;
  };
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  conferenceOrJournal: string;
  pages: number;
  topics: string[];
  abstract: string;
  fileSize: string;
  status: 'indexed' | 'processing' | 'ready';
  embeddingCount: number;
  methodology?: string;
  keyFindings?: string[];
  limitations?: string[];
  datasetUsed?: string;
  downloadUrl?: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  chunkIndex: number;
  content: string;
  score?: number;
  vectorSimilarity?: number;
  keywordScore?: number;
}

export interface AgentActivityTrace {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  timestamp: string;
  details?: string;
  status: 'active' | 'success' | 'warning' | 'error';
}

export interface CitationItem {
  id: string;
  documentTitle: string;
  authors: string;
  year: number;
  page: number;
  section: string;
  exactQuote: string;
  claimSupported: string;
  confidenceScore: number;
  verificationStatus: 'verified' | 'unsupported' | 'extrapolated';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agentActivities?: AgentActivityTrace[];
  citations?: CitationItem[];
  verificationSummary?: {
    totalClaims: number;
    verifiedClaims: number;
    unsupportedClaims: number;
    overallConfidence: number;
  };
  comparativeMatrix?: {
    attributes: string[];
    papers: {
      paperTitle: string;
      values: Record<string, string>;
    }[];
  };
  reportDraft?: ResearchReport;
}

export interface ResearchReport {
  id: string;
  title: string;
  topic: string;
  generatedDate: string;
  abstract: string;
  sections: {
    title: string;
    content: string;
    citations?: string[];
  }[];
  references: string[];
  author: string;
  status: 'draft' | 'finalized';
}

export interface WebSearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
  relevanceScore: number;
}
