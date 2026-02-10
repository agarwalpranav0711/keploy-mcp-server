# Keploy MCP Context Server (Node.js Prototype)

A Node.js–based **Model Context Protocol (MCP) context server** prototype for Keploy that exposes structured, read-only project context (starting with test metadata) for AI tools, IDEs, and developer agents.

This project is being developed as a potential **Google Summer of Code (GSoC)** contribution to Keploy.

---

## 📌 Why this project exists

Keploy already has ongoing work around a **Go-based MCP CLI**, primarily focused on:
- CLI workflows
- Mock recording and execution
- Developer-facing automation

However, modern AI-assisted tools (IDEs, copilots, agents) require **structured, queryable project context**, not just CLI interactions.

This project explores a **complementary Node.js / TypeScript MCP context server** that:
- Focuses on **AI-first context access**
- Exposes **read-only, schema-driven metadata**
- Is designed for **IDE and agent integration**
- Does **not** duplicate or replace the Go MCP CLI

---

## 🎯 Project Goal

Build a minimal MCP-compatible context server that allows AI tools to understand Keploy-managed projects by exposing:
- Test cases
- API endpoints associated with tests
- Test execution status
- Related metadata

The initial focus is intentionally narrow to ensure correctness and clarity.

---

## 🚫 Scope (What this project does NOT do)

This prototype **does not**:
- Execute tests
- Record traffic
- Modify Keploy data
- Replace the Keploy CLI
- Implement the full MCP transport yet

These are intentional design decisions to keep the scope focused and safe.

---

## 📦 Current Capabilities

### Available Endpoint

**GET /context/tests**

Returns structured test metadata in a predictable, AI-readable format.

### Example Response
```json
{
  "resourceType": "keploy.test.list",
  "items": [
    {
      "id": "test-001",
      "type": "keploy.test",
      "endpoint": {
        "method": "GET",
        "path": "/users"
      },
      "status": "passed"
    },
    {
      "id": "test-002",
      "type": "keploy.test",
      "endpoint": {
        "method": "POST",
        "path": "/login"
      },
      "status": "failed"
    }
  ]
}
```

---

## 🧠 Why Node.js?

- Many AI tools, IDE plugins, and agents are built around JavaScript/TypeScript ecosystems
- Node.js enables rapid prototyping and iteration
- The project is designed to start in JavaScript and migrate to TypeScript once the architecture stabilizes

---

## 🏗 Project Structure
```
src/
├─ index.js          # Server entry point
├─ routes/
│  └─ tests.js       # Test context routes
└─ data/
   └─ tests.js       # Mock test data
```

---

## ▶️ Running the Prototype
```bash
npm install
npm run dev
```

Then open: [http://localhost:3000/context/tests](http://localhost:3000/context/tests)

---

## 🛣 Roadmap (High Level)

1. Align schemas more closely with the MCP specification
2. Add additional context types (mocks, APIs)
3. Introduce MCP-compatible transport (e.g. JSON-RPC over stdio)
4. Migrate implementation to TypeScript

---

## 🤝 GSoC Context

This repository represents an early-stage prototype and design exploration for the proposed "MCP Server for Keploy" GSoC project.

Feedback, suggestions, and alignment discussions with Keploy mentors are highly welcome.

---

## 📄 License

ISC