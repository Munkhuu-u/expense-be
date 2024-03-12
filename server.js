const express = require("express");
const cors = require("cors");
// const { Pool } = require("pg");
require("dotenv").config();
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");
const bodyparser = require("body-parser");
const router = express.Router();
const { addUser } = require("./route/add-user");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(router);

app.post("/addUser", addUser);

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: PGPORT,
//   ssl: {
//     require: true,
//   },
// });

// app.post("/addUser", async (req, res) => {
//   const client = await pool.connect();
//   console.log("addUser e-p working fine");
//   console.log("req.body: ", req.body);

//   try {
//     client.query(
//       `INSERT INTO users (name, email, id, password) VALUES ('${req.body.name}','${req.body.mail}', '${req.body.id}','${req.body.password}')`
//     );
//   } catch (err) {
//     console.log(err);
//   } finally {
//     client.release();
//     res.status(200).send({ message: "added user successfully" });
//   }
// });

app.post("/sign-in", async (req, res) => {
  const client = await pool.connect();
  let result = "";
  let loginConfirm = 0;

  console.log("req.body.userName: ", req.body.userName);
  console.log("req.body.password: ", req.body.password);
  console.log("result.rows[0].password: ", result.rows[0].password);

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
