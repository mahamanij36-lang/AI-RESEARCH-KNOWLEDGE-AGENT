import { ResearchPaper, DocumentChunk } from '../types';

export const INITIAL_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-rag-01',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    authors: ['Patrick Lewis', 'Ethan Perez', 'Aleksandra Piktus', 'Fabio Petroni', 'Vladimir Karpukhin'],
    year: 2020,
    conferenceOrJournal: 'NeurIPS 2020',
    pages: 12,
    topics: ['RAG', 'Dense Retrieval', 'Parametric Memory', 'Non-Parametric Memory', 'DPR'],
    abstract: 'Large pre-trained language models have been shown to store factual knowledge in their parameters. However, their ability to precisely access and manipulate knowledge is limited. We explore general-purpose fine-tuning recipes for retrieval-augmented generation (RAG) — models which combine pre-trained parametric and non-parametric memory for language generation.',
    fileSize: '1.4 MB',
    status: 'indexed',
    embeddingCount: 48,
    methodology: 'Couples a pre-trained sequence-to-sequence model (BART) with a dense vector index of Wikipedia (DPR) accessed via MIPS.',
    keyFindings: [
      'RAG models set state-of-the-art results on open-domain QA tasks (Natural Questions, WebQuestions, CuratedTREC).',
      'Non-parametric memory can be updated without retraining the entire language generator.',
      'Significantly reduces hallucinations compared to purely parametric models.'
    ],
    limitations: ['Fixed retrieval granularity (100-token passages)', 'Latency overhead during top-k nearest neighbor lookup'],
    datasetUsed: 'Natural Questions, TriviaQA, MS-MARCO, Wikipedia Dump (21M passages)',
    downloadUrl: '#'
  },
  {
    id: 'paper-react-02',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    authors: ['Shunyu Yao', 'Jeffrey Zhao', 'Dian Yu', 'Nan Du', 'Izhak Shafran', 'Karthik Narasimhan', 'Yuan Cao'],
    year: 2023,
    conferenceOrJournal: 'ICLR 2023',
    pages: 18,
    topics: ['Multi-Agent', 'Agent Orchestration', 'Reasoning & Action', 'Tool Use', 'Chain of Thought'],
    abstract: 'While language models can produce reasoning traces or take environment actions separately, ReAct prompts LLMs to generate both reasoning traces and task-specific actions in an interleaved manner. Reasoning traces help the model induce, track, and update action plans, while actions allow it to interface with external knowledge bases.',
    fileSize: '2.1 MB',
    status: 'indexed',
    embeddingCount: 64,
    methodology: 'Interleaved Thought-Action-Observation loops applied to QA (HotpotQA) and interactive decision-making (ALFWorld, WebShop).',
    keyFindings: [
      'Overcomes issues of hallucination and error propagation ubiquitous in chain-of-thought prompting.',
      'Produces human-interpretable task-solving trajectories with higher groundedness.',
      'Achieves 94% success rate improvement in multi-hop question answering.'
    ],
    limitations: ['Dependent on external environment feedback latency', 'Context window consumption scales with step count'],
    datasetUsed: 'HotpotQA, Fever, ALFWorld, WebShop',
    downloadUrl: '#'
  },
  {
    id: 'paper-attention-03',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Lukasz Kaiser', 'Illia Polosukhin'],
    year: 2017,
    conferenceOrJournal: 'NeurIPS 2017',
    pages: 15,
    topics: ['Transformer Architecture', 'Self-Attention', 'Sequence Modeling', 'Parallelization'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    fileSize: '2.6 MB',
    status: 'indexed',
    embeddingCount: 52,
    methodology: 'Multi-Head Scaled Dot-Product Attention mechanism combined with Positional Encoding and feed-forward networks.',
    keyFindings: [
      'Allows significantly more parallelization during training than RNNs/LSTMs.',
      'Established 28.4 BLEU score on WMT 2014 English-to-German translation.',
      'Drastically reduced training time from weeks to 3.5 days on 8 P100 GPUs.'
    ],
    limitations: ['Quadratic computational complexity O(n^2) with respect to sequence length', 'Lack of inductive bias for local temporal hierarchy'],
    datasetUsed: 'WMT 2014 English-to-German, WMT 2014 English-to-French',
    downloadUrl: '#'
  },
  {
    id: 'paper-multimodal-04',
    title: 'ColPali: Efficient Document Retrieval with Vision Language Models',
    authors: ['Manuel Faysse', 'Hugues Sibille', 'Tony Wu', 'Bilel Omrani', 'Celine Hudelot', 'Pierre Colombo'],
    year: 2024,
    conferenceOrJournal: 'arXiv Pre-print / ACL 2024',
    pages: 22,
    topics: ['Multimodal RAG', 'Document Retrieval', 'Vision Language Models', 'Late Interaction'],
    abstract: 'Document retrieval historically relies on complex OCR engines and PDF parsers that discard visual layouts, tables, and charts. We introduce ColPali, leveraging Vision Language Models (PaliGemma) with ColBERT-style late interaction to directly index and retrieve full document image pages end-to-end.',
    fileSize: '3.4 MB',
    status: 'indexed',
    embeddingCount: 78,
    methodology: 'Vision encoder generates patch-level multi-vector representations of PDF page images, scored via Late Interaction MaxSim operator.',
    keyFindings: [
      'Eliminates brittle OCR parsing cascades while outperforming text-only RAG pipelines by +24% on table & chart queries.',
      'Preserves diagrammatic semantics, typography layout, and spatial visual context seamlessly.',
      'Fast query latency under 30ms utilizing optimized multi-vector indexes.'
    ],
    limitations: ['Higher vector storage requirement per page due to patch-level embeddings', 'Requires visual GPU acceleration for page encoding'],
    datasetUsed: 'ViDoRe (Visual Document Retrieval Benchmark)',
    downloadUrl: '#'
  }
];

export const INITIAL_CHUNKS: DocumentChunk[] = [
  {
    id: 'chunk-rag-01',
    documentId: 'paper-rag-01',
    documentTitle: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    pageNumber: 3,
    chunkIndex: 1,
    content: 'We combine parametric memory (a pre-trained seq2seq transformer) and non-parametric memory (a dense vector index of Wikipedia) accessed with a pre-trained neural retriever. For an input query x, the retriever p_eta(z|x) returns top-K passages z. The generator p_theta(y|x, z) conditions on both the input and retrieved passages to produce target tokens y.'
  },
  {
    id: 'chunk-rag-02',
    documentId: 'paper-rag-01',
    documentTitle: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    pageNumber: 7,
    chunkIndex: 2,
    content: 'RAG-Sequence vs RAG-Token: RAG-Sequence uses the same retrieved document to predict all target tokens in a generation step, whereas RAG-Token can marginalize over different retrieved documents for each target token, allowing multi-document synthesis across distinct knowledge domains.'
  },
  {
    id: 'chunk-react-01',
    documentId: 'paper-react-02',
    documentTitle: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    pageNumber: 4,
    chunkIndex: 1,
    content: 'ReAct tightly integrates reasoning and acting. A formal execution trace consists of alternating Thought_t -> Action_t -> Observation_t steps. The internal Thought step plans queries, synthesizes recent observations, and determines whether an external retrieval or calculator call is required.'
  },
  {
    id: 'chunk-react-02',
    documentId: 'paper-react-02',
    documentTitle: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    pageNumber: 8,
    chunkIndex: 2,
    content: 'Compared to pure Chain-of-Thought (CoT), ReAct reduces factual errors by grounding thought steps in external verified observations. On HotpotQA, ReAct reduced false positive hallucinations by 64% by refusing to fabricate unverified claims when document context was absent.'
  },
  {
    id: 'chunk-att-01',
    documentId: 'paper-attention-03',
    documentTitle: 'Attention Is All You Need',
    pageNumber: 4,
    chunkIndex: 1,
    content: 'An attention function can be described as mapping a query and a set of key-value pairs to an output. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V.'
  },
  {
    id: 'chunk-colpali-01',
    documentId: 'paper-multimodal-04',
    documentTitle: 'ColPali: Efficient Document Retrieval with Vision Language Models',
    pageNumber: 5,
    chunkIndex: 1,
    content: 'Traditional text extraction pipelines fail catastrophically on financial balance sheets, multi-column scientific layouts, and graphical architecture diagrams. ColPali processes document screenshots directly with a 3B vision backbone, preserving coordinate geography and rendering glyphs accurately.'
  }
];
