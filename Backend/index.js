const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(3000);
