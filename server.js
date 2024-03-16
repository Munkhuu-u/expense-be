const express = require("express");
const cors = require("cors");
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");
const bodyparser = require("body-parser");
require("dotenv").config();

const { registerRouter } = require("./routes/user.js");
const { dbRouter } = require("./routes/dbmanage.js");
const { categoryRouter } = require("./routes/category.js");
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use(registerRouter);
app.use(dbRouter);
app.use(categoryRouter);

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
