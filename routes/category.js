const categoryRouter = require("express").Router();
const {
  getCategory,
  createTable,
  createRow,
  addCol,
  updateCategoryUseridCol,
} = require("../service/category-server");

categoryRouter.post("/get-category", async (req, res) => {
  const result = await getCategory(req.body);
  // console.log("result in route: ", result.response.rows);
  res.json(result);
});

categoryRouter.post("/create-category-table", async (req, res) => {
  const result = await createTable(req.body);
  res.json(result);
});

categoryRouter.post("/create-category-row", async (req, res) => {
  const result = await createRow(req.body);
  res.json(result);
});

categoryRouter.post("/add-category-col", async (req, res) => {
  const result = await addCol(req.body);
  res.json(result);
});

categoryRouter.post("/update-category-userid-col", async (req, res) => {
  const result = await updateCategoryUseridCol();
  res.json(result);
});

module.exports = { categoryRouter };
