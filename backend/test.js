const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const data = require("./demoData");

app.post("/login", (req, res) => {
  res.sendStatus(200);
  // console.log(req.body);
  const { email, password } = req.body;
  co = console.log(email, password);
});

app.post("/register", (req, res) => {
  res.sendStatus(200);
  // console.log(req.body);
  const { firstName, lastName, email, reason, password, visitortype } = req.body;
  console.log(firstName, lastName, email, reason, password, visitortype);
});

app.get("/view/:visitorType", (req, res) => {
  console.log(req.params);
  const filteredData = data.filter(
    (item) =>
      item.visitorType === req.params.visitorType ||
      req.params.visitorType === "*"
  );
  console.log(filteredData);
  res.json(filteredData);
});

app.listen(port, () => {
  console.log("app is listning on post 5000");
});
