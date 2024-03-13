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

exports.deleteRow = async (req, res) => {
  console.log(req.body);
  const { table, row } = req.body;

  const client = await pool.connect();
  const Query = `DELETE FROM ${table} WHERE name='${row}'`;
  console.log("QueryText: ", Query);

  try {
    await client.query(`${Query}`);
    res.status(200).send({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
