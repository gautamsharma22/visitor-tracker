const express = require("express");
const {
  createRequest,
  updateRequest,
  viewRequest,
  deleteRequest,
} = require("../controllers/requests");
const authUser = require("../controllers/userAuth");

const router = express.Router();

//Create new Data
router.post("/", authUser, createRequest);

// Update Data
router.put("/", authUser, updateRequest);

//View requests
router.get("/", authUser, viewRequest);

//Delete requests
router.delete("/", authUser, deleteRequest);

module.exports = router;
