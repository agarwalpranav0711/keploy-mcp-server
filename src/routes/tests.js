const { Router } = require("express");
const { tests } = require("../data/tests");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    resourceType: "keploy.test.list",
    items: tests
  });
});

module.exports = router;
