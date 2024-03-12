// const express = require("express");
const { Pool } = require("pg");

// const cors = require("cors");
// require("dotenv").config();
// const dummyLog = require("../dummyLog.json");
// const transaction = require("../transaction.json");
// const bodyparser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyparser.json());

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

exports.addUser = async (req, res) => {
  const client = await pool.connect();
  console.log("addUser e-p working fine");
  console.log("req.body: ", req.body);
  console.log("working after route");

  try {
    await client.query(
      `INSERT INTO users (name, email, id, password) VALUES ('${req.body.name}','${req.body.mail}', '${req.body.id}','${req.body.password}')`
    );
    res.status(200).send({ message: "added user successfully" });
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
