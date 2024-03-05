const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
// const { dotenv } = require("dotenv");
require("dotenv").config();
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");

const app = express();
app.use(cors());
// dotenv.config();
// console.log("process.env :", process.env.PGDATABASE);

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
// PGHOST="ep-flat-darkness-a5pb60l0.us-east-2.aws.neon.tech"
// PGDATABASE="expenseDB"
// PGUSER="munkhbat.nagdal"
// PGPASSWORD="oW7LPJufatg2"
// PGPORT=3001
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

app.get("/add-user", async (req, res) => {
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

app.get("/test", (request, response) => {
  response.type("Content-type", "application/json");
  response.send(dummyLog);
});

app.get("/transaction", (req, res) => {
  res.type("Content-type", "application/json");
  res.send(transaction);
});

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
