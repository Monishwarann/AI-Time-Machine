# AI TIME MACHINE ⏳

> **“Reconstruct the Past. Explore the Evolution. Understand the Future.”**

AI Time Machine is an AI-powered digital archaeology and historical reconstruction platform where users can upload an old software project, website, document, codebase, dataset, report, or design. The system analyzes file metadata, syntax ASTs, dependencies, schemas, and structural signals to reconstruct a probable timeline of how the artifact evolved.

---

## 🌟 Key Features

* **Digital Archaeology Engine**: Analyzes ZIP archives, Git repositories, code folders, CSV/SQL datasets, Markdown docs, and PDFs with real processing stages.
* **Strict Evidence & Confidence Classification**: Clearly labels facts vs. AI inference (`VERIFIED`, `STRONGLY SUPPORTED`, `PLAUSIBLE`, `SPECULATIVE`, `UNKNOWN`).
* **Interactive Timeline & Version Slider**: Scrub through reconstructed historical states (2019–2025) with live updates to architecture, files, and dependencies.
* **Version Comparison & Diff Engine**: Side-by-side file diffs, dependency version tracking, and architectural shift analysis ("Monolith -> Services").
* **Interactive Evidence Graph**: Visual node-link network connecting Timeline Events ↔ Files ↔ Dependencies ↔ Docs ↔ Schemas.
* **"What-If?" Alternative Timelines**: Branch off historical points to generate hypothetical scenarios clearly watermarked `HYPOTHETICAL — NOT HISTORICAL FACT`.
* **Digital Fossils & Lost Feature Detector**: Discover deprecated APIs, dead features, orphan configs, and legacy dependencies.
* **Missing History Detector & Evidence Heatmaps**: Highlights temporal gaps and recommends complementary artifacts to reduce uncertainty.
* **AI Historical Assistant (RAG)**: Ask evidence-grounded questions with cited source lines and multi-hypothesis explanations.
* **Audit Trail & Multi-Format Exporters**: Generate PDF, Markdown, JSON, and CSV research reports with SHA-256 artifact hashes.

---

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`.

---

## 🛠️ Monorepo Architecture

```text
ai-time-machine/
├── frontend/
│   ├── src/
│   │   ├── components/       # UI Components (Timeline, Graph, Diffs, What-If)
│   │   ├── engine/           # Analysis, Parsers, Confidence & RAG Engine
│   │   ├── store/            # State management
│   │   └── types/            # Data types & interfaces
│   └── public/
├── backend/                  # REST & Async WebSocket Processing Pipeline
├── database/                 # PostgreSQL + pgvector schemas
└── docs/                     # Architecture & Audit specs
```

---

## 📜 License

MIT License. Designed with precision for Digital Archaeology and Software Evolution Research.
