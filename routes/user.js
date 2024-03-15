const registerRouter = require("express").Router();
const { addUser, signinUser } = require("../service/user-service");

registerRouter.post("/addUser", async (req, res) => {
  const userInfo = req.body;
  const result = await addUser(userInfo);
  res.json(result);
});

registerRouter.post("/sign-in", async (req, res) => {
  const userInfo = req.body;
  console.log("userInfo: ", userInfo);
  const result = await signinUser(userInfo);
  res.json(result);
});

module.exports = { registerRouter };
