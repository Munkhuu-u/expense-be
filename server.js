const express = require("express");
const cors = require("cors");
const dummyLog = require("./dummyLog.json");
const transaction = require("./transaction.json");
const bodyparser = require("body-parser");
const { addUser } = require("./routes/add-user");
const { login } = require("./routes/register");
const { updateCurrency } = require("./routes/updateCurrency");
const { createAllCategory } = require("./routes/createAllCategory");
const { deleteRow } = require("./routes/deleteTable");
const { getCategories } = require("./routes/getCategories");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(router);

app.post("/addUser", addUser);
app.post("/sign-in", login);
app.post("/updateCurrency", updateCurrency);
app.post("/add-all-category", createAllCategory);
app.post("/delete-row", deleteRow);
app.get("/getCategories", getCategories);

app.listen(3001, () => {
  console.log("Back End app is listening at port 3001");
});
