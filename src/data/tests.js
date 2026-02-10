const tests = [
  {
    id: "test-001",
    type: "keploy.test",
    endpoint: {
      method: "POST",
      path: "/login"
    },
    status: "failed",
    mocksUsed: ["user-service", "redis"],
    lastRun: "2026-02-01"
  }
];

module.exports = { tests };
