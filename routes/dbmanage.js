const dbRouter = require("express").Router();
const {
  changeColType,
  deleteTable,
  createTable,
} = require("../service/dbmanage-service");

dbRouter.post("/change-row-type", async (req, res) => {
  const userInfo = req.body;
  const result = await changeColType(userInfo);
  res.json(result);
});

dbRouter.post("/delete-table", async (req, res) => {
  const result = await deleteTable(req.body);
  res.json(result);
});

dbRouter.post("/create-table", async (req, res) => {
  const result = await createTable(req.body);
  res.json(result);
});

module.exports = { dbRouter };
