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

async function addUser(userInfo) {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      `INSERT INTO users (name, email, id, password) VALUES ('${userInfo.name}','${userInfo.mail}', '${userInfo.id}','${userInfo.password}')`
    );
  } catch (error) {
    return { message: error.message };
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function signinUser(userInfo) {
  const client = await pool.connect();
  const query = `SELECT password, id FROM users WHERE email='${userInfo.userName}'`;
  let response;
  try {
    response = await client.query(query);
  } catch (error) {
    return { message: error.message };
  } finally {
    client.release();
  }

  if (userInfo.password == response.rows[0].password) {
    return { message: "SUCCESS", id: response.rows[0].id };
  } else {
    return { message: "WRONG PASSWORD" };
  }
}

module.exports = { addUser, signinUser };
