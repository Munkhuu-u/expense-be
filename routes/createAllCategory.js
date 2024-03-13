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

exports.createAllCategory = async (req, res) => {
  const client = await pool.connect();
  console.log();
  try {
    await client.query(
      `INSERT INTO category (id, name) VALUES ('${req.body.id}', '${req.body.name}')`
    );
    res.status(200).send({ message: "SUCCESS" });
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
};
