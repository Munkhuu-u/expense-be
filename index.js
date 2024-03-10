const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");

const app = express();
app.use(cors());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

app.post("/addUser", async (req, res) => {
  console.log("req.body: ", req.body);
  res.status(200).send({ message: "added user successfully" });
});

app.post("/sign-in", async (req, res) => {
  console.log("BE-ruu amjilltai holbogdloo");
  const body = req.body;
  console.log(body);
});

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
