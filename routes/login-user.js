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
  const client = await pool.connect();
  let result = "";

  try {
    result = await client.query(
      `SELECT name, password FROM users WHERE (name='${req.body.userName}')`
    );
    console.log("result.rows: ", result.rows);
    if (req.body.password == result.rows[0]?.password) {
      // res.status(200).send({ message: "access granted" });
      // return { message: "access granted" };
    } else {
      // res.status(200).send({ message: "incorrect password or username" });
      // return { message: "incorrect password or username" };
    }
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
};
