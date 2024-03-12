// const express = require("express");
const { Pool } = require("pg");

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

exports.login = async (req, res) => {
  console.log("BE E-P working fine");
  const client = await pool.connect();
  let result = "";

  try {
    result = await client.query(
      `SELECT name, password FROM users WHERE (name='${req.body.userName}')`
    );
    if (req.body.password == result.rows[0].password) {
      res.status(200).send({ message: "access granted" });
    } else {
      res.status(200).send({ message: "incorrect password or username" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
