const dbRouter = require("express").Router();
const { changeColType, deleteTable } = require("../service/dbmanage-service");

dbRouter.post("/change-row-type", async (req, res) => {
  const userInfo = req.body;
  const result = await changeColType(userInfo);
  res.json(result);
});
dbRouter.post("/delete-table", async (req, res) => {
  const userInfo = req.body;
  const result = await deleteTable(userInfo);
  res.json(result);
});

module.exports = dbRouter;
