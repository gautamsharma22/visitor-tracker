const express = require("express");
const {
  createRequest,
  viewRequest,
  adminRequest,
} = require("../controllers/requests");
const authUser = require("../controllers/userAuth");

const router = express.Router();

// Disabling Auth User please add it back

//Create Request
// router.post("/", authUser, createRequest);
router.post("/", createRequest);

// View requests
router.get("/", authUser, viewRequest);

// Admin requests
// router.get("/admin", authUser, adminRequest);
router.get("/admin", adminRequest);

module.exports = router;
