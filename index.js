const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");

const app = express();
app.use(cors());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

console.log("PGHOST: ", PGHOST);
const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConfig);

app.get("/addUsersTable", async (req, res) => {
  const client = await pool.connect();
  console.log("client: ", client);
  try {
    client.query(
      "CREATE TABLE users (name VARCHAR(255), age INT, phone VARCHAR(255), email VARCHAR(255))"
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  res.status(200).send({ message: "add table working successfully" });
});

app.get("/addColumns", async (req, res) => {
  const client = await pool.connect();
  try {
    client.query(
      "ALTER TABLE users ADD id VARCHAR(255), ADD password VARCHAR(255), ADD createdAT VARCHAR(255), ADD currency_type VARCHAR(255)"
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

app.post("/addUser", async (req, res) => {
  const user = req.body;
  console.log("req.body in BE: ", req.body);
  // try {
  //   const client = await pool.connect();
  //   client.query(`INSERT INTO users (age, email, name, phone) VALUES(${},,,)`);
  // } catch (error) {
  //   console.log(error);
  // } finally {
  // }
  res.type("Content-type", "application/json");
  res.send(transaction);
});

app.get("/transaction", (req, res) => {
  res.type("Content-type", "application/json");
  res.send(transaction);
});

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
