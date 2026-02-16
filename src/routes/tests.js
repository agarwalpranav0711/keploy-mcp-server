const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();

const ARTIFACTS_DIR = path.join(__dirname, "../../artifacts");

/**
 * Load and transform test artifacts into MCP schema format
 */
function loadTestsFromArtifacts() {
  const files = fs.readdirSync(ARTIFACTS_DIR);

  return files
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const filePath = path.join(ARTIFACTS_DIR, file);
      const rawData = fs.readFileSync(filePath);
      const parsed = JSON.parse(rawData);

      return {
        id: parsed.id,
        type: "keploy.test",
        endpoint: {
          method: parsed.request.method,
          path: parsed.request.url
        },
        status: parsed.status,
        mocksUsed: parsed.mocks || [],
        lastRun: parsed.lastRun || null
      };
    });
}

/**
 * GET /context/tests
 * Optional query:
 *   ?status=failed
 */
router.get("/", (req, res) => {
  let tests = loadTestsFromArtifacts();

  // Apply status filtering if provided
  if (req.query.status) {
    tests = tests.filter(
      t => t.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }

  res.json({
    resourceType: "keploy.test.list",
    items: tests
  });
});

/**
 * GET /context/tests/:id
 */
router.get("/:id", (req, res) => {
  const tests = loadTestsFromArtifacts();
  const test = tests.find(t => t.id === req.params.id);

  if (!test) {
    return res.status(404).json({
      error: "Test not found"
    });
  }

  res.json(test);
});

module.exports = router;
