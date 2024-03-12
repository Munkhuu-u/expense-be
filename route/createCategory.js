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

exports.createCategory = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO category (id, name) VALUES ('${req.body.id}', '${req.body.name}')`
    );
    res.status(200).send({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
