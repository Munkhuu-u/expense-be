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
  console.log("userInfo: ", userInfo);
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
  const client = await pool.connect();
  const Query = `ALTER TABLE users ALTER COLUMN email TYPE unique (email)`;
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

module.exports = { changeColType };
