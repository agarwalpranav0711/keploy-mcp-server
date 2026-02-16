# Keploy MCP Context Server (Node.js Prototype)

A Node.js–based Model Context Protocol (MCP) context server prototype for Keploy that exposes structured, read-only project context (starting with test metadata) for AI tools, IDEs, and developer agents.

This project explores a complementary context layer alongside Keploy’s Go-based MCP CLI.

---

## 📌 Why this project exists

Keploy already has ongoing work around a **Go-based MCP CLI**, primarily focused on:

- CLI workflows  
- Mock recording and execution  
- Developer-facing automation  

However, modern AI-assisted tools (IDEs, copilots, agents) require **structured, queryable project context**, not just CLI interactions.

This project introduces a **read-only, AI-first context layer** that:

- Parses Keploy-style test artifacts  
- Transforms them into structured schema  
- Exposes metadata via simple HTTP endpoints  
- Is transport-agnostic (MCP transport planned)

---

## 🎯 Project Goal

Build a minimal MCP-compatible context server that allows AI tools to understand Keploy-managed projects by exposing:

- Test cases  
- Associated API endpoints  
- Test execution status  
- Related metadata (mocks, last run time)

The scope is intentionally narrow to validate architecture before expanding.

---

## 🧩 Architecture Overview

```text
Keploy (Go CLI)
        │
        │ Generates test artifacts
        ▼
MCP Context Server (Node.js)
        │
        │ Parses & transforms artifacts
        ▼
AI Tools / IDEs / Copilots
```

The context server acts purely as a reasoning layer.  
It does not execute tests or modify Keploy data.

---

## 🧠 Design Principles

- Read-only by design  
- File-based artifact parsing  
- Schema-driven structured responses  
- AI-friendly output format  
- No duplication of Go MCP CLI responsibilities  
- Transport-agnostic (HTTP now, MCP later)

---

## 🚫 Non-Goals

This prototype does **not**:

- Execute tests  
- Record traffic  
- Modify Keploy data  
- Replace the Keploy CLI  
- Implement full MCP transport yet  

---

## 📦 Current Capabilities

### ✅ Artifact-Based Parsing

The server reads test artifacts from a local `artifacts/` directory and transforms them into MCP-style structured metadata.

---

### Available Endpoints

#### 1️⃣ List Tests

```
GET /context/tests
```

Returns all parsed test metadata.

---

#### 2️⃣ Filter by Status

```
GET /context/tests?status=failed
GET /context/tests?status=passed
```

Returns filtered test list.

---

#### 3️⃣ Get Single Test

```
GET /context/tests/:id
```

Example:

```
GET /context/tests/test-001
```

---

### Example Response (List)

```json
{
  "resourceType": "keploy.test.list",
  "items": [
    {
      "id": "test-001",
      "type": "keploy.test",
      "endpoint": {
        "method": "POST",
        "path": "/login"
      },
      "status": "failed",
      "mocksUsed": ["user-service", "redis"],
      "lastRun": "2026-02-01"
    }
  ]
}
```

---

## 🏗 Project Structure

```
keploy-mcp-server/
├─ artifacts/        # Sample Keploy-style test artifacts
├─ src/
│  ├─ routes/
│  │   └─ tests.js   # Artifact parser + routes
│  └─ index.js       # Server entry
├─ package.json
└─ README.md
```

---

## ▶️ Running the Prototype

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000/context/tests
```

---

## 🔌 Integration Plan with Keploy

**Phase 1:** File-based artifact parsing (current)  
**Phase 2:** Align schema with actual Keploy test artifact structure  
**Phase 3:** Add additional context types (mocks, APIs)  
**Phase 4:** Introduce MCP-compatible transport (JSON-RPC over stdio)  
**Phase 5:** Migrate implementation to TypeScript  

---

## 🛣 Roadmap

- Improve schema alignment with MCP specification  
- Add coverage reasoning endpoints  
- Add summary endpoints (e.g., failed test count)  
- Add MCP transport layer  
- TypeScript migration  

---

## 🤝 GSoC Context

This repository represents an evolving design prototype for the proposed **“MCP Context Server for Keploy”** GSoC project.

The goal is to validate architecture and structured context exposure before deeper integration with Keploy’s core tooling.

Feedback and architectural discussion are highly welcome.

---

## 📄 License

ISC
