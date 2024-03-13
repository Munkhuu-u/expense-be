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

exports.updateCurrency = async (req, res) => {
  console.log(req.body);
  const client = await pool.connect();
  let data = "";
  try {
    await client.query(
      `UPDATE users SET currency_type = '${req.body.currency}' WHERE id='${req.body.id}'`
    );
    res.status(200).send({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
