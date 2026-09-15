# AI Research & Knowledge Agent — System Architecture & Specification

## Project Overview
**Title**: AI Research & Knowledge Agent  
**Subtitle**: Autonomous Multimodal Research Assistant using Agentic RAG, Multi-Agent AI, Vector Database and LLM Intelligence  
**Target**: Commercial-grade, cinematic 3D multimodal research platform.

---

## 1. High-Level Multi-Agent Architecture

```
                                  +-----------------------+
                                  |   User Input & Files  |
                                  +-----------+-----------+
                                              |
                                              v
                              +-------------------------------+
                              |   AI Agent Orchestrator       |
                              |   (Query Routing & Planning)  |
                              +---------------+---------------+
                                              |
      +-------------------+-------------------+-------------------+-------------------+
      |                   |                   |                   |                   |
      v                   v                   v                   v                   v
+------------+     +------------+      +-------------+     +------------+      +------------+
| Research   |     | Retrieval  |      | Web Research|     | Analysis   |      | Comparison |
| Agent      |     | Agent      |      | Agent       |     | Agent      |      | Agent      |
+-----+------+     +-----+------+      +------+------+     +-----+------+      +-----+------+
      |                  |                    |                  |                   |
      +------------------+--------------------+------------------+-------------------+
                                              |
                                              v
                              +-------------------------------+
                              |    Hybrid Search & Reranker   |
                              |   (Semantic Dense + BM25)     |
                              +---------------+---------------+
                                              |
                                              v
                              +-------------------------------+
                              |   Context Compression & LLM   |
                              |      Generation Engine        |
                              +---------------+---------------+
                                              |
                                              v
                              +-------------------------------+
                              |   Verification & Hallucination|
                              |        Detection Agent        |
                              +---------------+---------------+
                                              |
                                              v
                              +-------------------------------+
                              |   Citation & Report Agent     |
                              +---------------+---------------+
                                              |
                                              v
                              +-------------------------------+
                              | Final Verified Research Report|
                              |  & Interactive 3D Visualizer  |
                              +-------------------------------+
```

---

## 2. Agent System Specifications

1. **Orchestrator Agent**:
   - Analyzes intent, complexity, document requirements, and synthesis steps.
   - Dynamically activates sub-agents and constructs an execution DAG.
2. **Research Agent**:
   - Deconstructs research hypotheses into core literature queries and methodology benchmarks.
3. **Retrieval Agent**:
   - Executes dense semantic embeddings search and keyword lexical filtering over document collections.
4. **Web Research Agent**:
   - Queries academic databases, arXiv, CrossRef, and live research repositories.
5. **Analysis Agent**:
   - Extracts methodology, datasets, algorithms, quantitative results, and theoretical claims.
6. **Comparison Agent**:
   - Constructs comparative matrices (Paper A vs Paper B vs Paper C) across metrics, novelty, and trade-offs.
7. **Verification Agent**:
   - Maps each generated claim back to exact spans in source documents; flags unsupported or extrapolated claims.
8. **Citation Agent**:
   - Formats academic references (APA, IEEE, Harvard, BibTeX) with clickable locator anchors.
9. **Report Agent**:
   - Synthesizes IMRaD structured research whitepapers with executive summaries and downloadable exports.

---

## 3. Database Schema (PostgreSQL Relational Design)

### Entities:
- **`users`**: `id`, `email`, `name`, `password_hash`, `role`, `created_at`
- **`documents`**: `id`, `user_id`, `title`, `author`, `year`, `topics`, `file_path`, `file_type`, `file_size`, `num_pages`, `status`, `summary`, `created_at`
- **`document_chunks`**: `id`, `document_id`, `chunk_index`, `page_number`, `content`, `token_count`, `vector_id`, `metadata_json`, `created_at`
- **`conversations`**: `id`, `user_id`, `title`, `agent_mode`, `created_at`, `updated_at`
- **`messages`**: `id`, `conversation_id`, `role`, `content`, `agent_thought_trace`, `citations_json`, `created_at`
- **`research_sessions`**: `id`, `user_id`, `title`, `active_environment`, `selected_doc_ids`, `settings_json`, `created_at`
- **`citations`**: `id`, `message_id`, `document_id`, `chunk_id`, `source_text`, `claim_text`, `confidence_score`, `verified_status`
- **`reports`**: `id`, `user_id`, `title`, `abstract`, `sections_json`, `format`, `status`, `created_at`
- **`agent_tasks`**: `id`, `session_id`, `agent_name`, `status`, `input_payload`, `output_payload`, `latency_ms`, `timestamp`
- **`research_sources`**: `id`, `title`, `url`, `source_type`, `authors`, `abstract`, `doi`, `quality_score`

---

## 4. API Endpoints Architecture

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication & JWT issuance
- `POST /api/documents/upload` - Multipart PDF/DOCX/TXT ingest & chunk pipeline
- `GET /api/documents` - List user uploaded research papers
- `GET /api/documents/:id` - Detailed document metadata & chunks
- `DELETE /api/documents/:id` - Remove document & vector embeddings
- `POST /api/research/query` - Multi-agent research query processing
- `POST /api/chat` - Chat conversation turn with live agent streaming trace
- `POST /api/summarize` - Multi-tier paper summarization (Executive, Technical, Methodology)
- `POST /api/compare` - Multi-paper comparative analysis
- `POST /api/literature-review` - Comprehensive literature synthesis across uploaded papers
- `POST /api/reports/generate` - Academic research report generation
- `GET /api/reports` - Fetch saved research reports
- `POST /api/verify-claims` - Strict claim-to-evidence hallucination verification
- `GET /api/agents/status` - Live telemetry of all 8 specialized agents

---

## 5. 3D & Cinematic Design Strategy

### 8 Interactive Environments:
1. **University Research Room**: Warm academic ambient lighting, realistic student researcher workstation, holographic HUD.
2. **AI Command Center**: Central pulsating 3D AI brain, agent telemetry panels, floating live communication node graphs.
3. **Digital Research Library**: 3D galaxy of floating research documents with interactive search gravity.
4. **RAG / Vector Database Lab**: Glowing 3D vector storage cylinders, data particle streams from ingest to embeddings.
5. **Web Research Center**: Futuristic holographic terminal querying external academic indices.
6. **AI Analysis Laboratory**: Multi-document comparative holographic rings and structural matrix viewer.
7. **Verification Center**: Security-grade evidence inspection, claim radar, green/red confidence indicators.
8. **Research Report Studio**: Academic publication studio with live interactive IMRaD report preview and export.
