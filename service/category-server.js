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

async function createTable(userInfo) {
  const client = await pool.connect();
  const Query = `CREATE TABLE category (id VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(255), createAt TIMESTAMP, updataAt TIMESTAMP, category_image VARCHAR(1000), PRIMARY KEY (id))`;
  console.log("Query: ", Query);

  try {
    await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function createRow(userInfo) {
  console.log("userInfo: ", userInfo);
  const client = await pool.connect();
  const val = {
    id: userInfo.id,
    nam: userInfo.name,
    des: userInfo.description,
    cre: userInfo.createAt,
    upt: userInfo.updataAt,
    img: userInfo.category_image,
  };
  // const Query = `INSERT INTO category (id, name, description, createAt, updataAt, category_image) VALUES (${val.id},${val.nam},${val.des},${val.cre},${val.upt},${val.img})`;
  const Query = `INSERT INTO category (id, name) VALUES ('${val.id}','${val.nam}')`;
  console.log("Query: ", Query);

  try {
    await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function getCategory(userInfo) {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      `SELECT name FROM category WHERE id LIKE 'DEFAULT_%' OR id = '${userInfo.id}'`
    );
  } catch (err) {
    return { message: err.message };
  } finally {
    client.release();
  }
  // response = response.rows;
  return { response };
}

async function addCol() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      `ALTER TABLE category ADD user_id VARCHAR(255)`
    );
  } catch (err) {
    return { message: err.message };
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

async function updateCategoryUseridCol() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      `UPDATE category SET user_id = 'FOR_ALL' WHERE id LIKE 'DEFAULT_%'`
    );
  } catch (err) {
    return { message: err.message };
  } finally {
    client.release();
  }
  return { message: "SUCCESS" };
}

module.exports = {
  createTable,
  getCategory,
  createRow,
  addCol,
  updateCategoryUseridCol,
};
