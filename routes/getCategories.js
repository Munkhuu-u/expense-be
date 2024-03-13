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

exports.getCategories = async (req, res) => {
  console.log("get all categories End-Point working");
  const client = await pool.connect();
  try {
    console.log("get all categories End-Point working");
    const categoriesArr = await client.query(`SELECT name FROM category`);
    res.status(200).send({ categoriesArr });
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
