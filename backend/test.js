const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const port = 5000;
const cors = require("cors");
app.use(cors());
const data = require("./demoData")

app.get("/view/:visitorType", (req, res) => {
    console.log(req.params)
    // res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
    const filteredData = data.filter(item => item.visitorType === req.params.visitorType);
    console.log(filteredData)
    res.json(filteredData);
});
app.listen(port, () => {
  console.log("app is listning on post 5000");
});
