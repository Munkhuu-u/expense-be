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

async function changeColType(userInfo) {
  const client = await pool.connect();
  const Query = `ALTER TABLE users ALTER COLUMN email TYPE unique (email)`;
  console.log("Query: ", Query);
  let response;

  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function deleteTable(userInfo) {
  console.log("userInfo in deleteTable service: ", userInfo.tableName);
  const client = await pool.connect();
  const Query = `DROP TABLE ${userInfo.tableName}`;
  let response;

  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function createTable(userInfo) {
  const client = await pool.connect();
  const Query = `CREATE TABLE users (id VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL, password VARCHAR(50), createAt TIMESTAMP, updataAt TIMESTAMP, currency_type VARCHAR(255) DEFAULT 'MNT', PRIMARY KEY (id))`;

  try {
    await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }

  return { message: "SUCCESS" };
}

module.exports = { changeColType, deleteTable, createTable };
