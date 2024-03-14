const registerRouter = require("express").Router();
const { addUser } = require("../service/add-user");

registerRouter.post("/addUser", async (req, res) => {
  const userInfo = req.body;
  const result = await addUser(userInfo);
  res.json(result);
});

module.exports = registerRouter;
