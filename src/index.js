const express = require("express");
const testsRoute = require("./routes/tests");

const app = express();
app.use(express.json());

app.use("/context/tests", testsRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Keploy MCP Context Server running on port ${PORT}`);
});
