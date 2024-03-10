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
  // app.post("/addUser", async (req, res) => {
  console.log("req.body: ", req.body);

  // const client = await pool.connect();
  // try {
  //   client.query(
  //     `INSERT INTO users (name, password, email) VALUES ('MUNKHBAT', 'MKpassword', 'MKmail@gmail.com')`
  //   );
  // } catch (err) {
  //   console.log(err);
  // } finally {
  //   client.release();
  // }
  res.status(200).send("added user successfully");
});

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});

//
//
// HERE IS E-P TO ADD TABLE
// app.get("/addTable", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(
//       "CREATE TABLE category (id VARCHAR(100), name VARCHAR(100), description VARCHAR(300), createdAt TIMESTAMP(2), updatedAt TIMESTAMP(2), category_image VARCHAR(300))"
//     );
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }
//   res.status(200).send({ message: "add table working successfully" });
// });

// HERE IS E-P TO ADD COLUMN
// app.get("/addColumns", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     client.query(
//       "ALTER TABLE users ADD id VARCHAR(255), ADD password VARCHAR(255), ADD createdAT VARCHAR(255), ADD currency_type VARCHAR(255)"
//     );
//   } catch (err) {
//     console.log(err);
//   } finally {
//     client.release();
//   }
//   res.status(200).send({ message: "add col working successfully" });
// });
