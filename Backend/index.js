const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 3000;

app.use(bodyparser.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
