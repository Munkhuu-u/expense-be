const express = require("express");
const cors = require("cors");
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");
const bodyparser = require("body-parser");
const { addUser } = require("./route/add-user");
const { login } = require("./route/login-user");
const { updateCurrency } = require("./route/updateCurrency");
const { createCategory } = require("./route/createCategory");
const { deleteRow } = require("./route/deleteTable");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(router);

app.post("/addUser", addUser);
app.post("/sign-in", login);
app.post("/updateCurrency", updateCurrency);
app.post("/add-category", createCategory);
app.post("/delete-row", deleteRow);

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
