const express = require("express");
const app = express();
const dummyLog = require("./dummyLog.json");

// app.post("checkLogin", (request, response) => {
//   options = {};
//   response.send("Success");
// });
app.get("/test", (request, response) => {
  response.type("Content-type", "application/json");
  //   response.send("Success");
  response.send(dummyLog);
});

app.listen(3001, () => {
  console.log("Back End app listening at port 3001");
});
