const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");
const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyparser.json());

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
  // console.log(req.body)
  const client = await pool.connect();

  try {
    client.query(
      `INSERT INTO users (name, email, id, password) VALUES ('${req.body.name}','${req.body.mail}', '${req.body.id}','${req.body.password}')`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
    res.status(200).send({ message: "added user successfully" });
  }
});

app.post("/sign-in", async (req, res) => {
  const client = await pool.connect();
  let result = "";
  let loginConfirm = 0;
  console.log("req.body.userName: ", req.body.userName);
  try {
    result = await client.query(
      `SELECT name, password FROM users WHERE (name='${req.body.userName}')`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }

  if (req.body.password == result.rows[0].password) {
    res.status(200).send({ message: "access granted" });
  } else {
    res.status(200).send({ message: "incorrect password or username" });
  }
});

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
