const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const port = 5000;
const cors = require("cors");
app.use(cors());
const data = require("./demoData")
const { userLogin, userRegister } = require('./controllers');

router.get("/login", userLogin);

app.get("/view/:visitorType", (req, res) => {
    console.log(req.params)
    const filteredData = data.filter(item => item.visitorType === req.params.visitorType || req.params.visitorType==="*");
    console.log(filteredData)
    res.json(filteredData);
});
app.listen(port, () => {
  console.log("app is listning on post 5000");
});
