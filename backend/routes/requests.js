const express = require("express");
const {
  createRequest,
  acceptRequest,
  viewRequest,
  rejectRequest,
  adminRequest,
} = require("../controllers/requests");
const authUser = require("../controllers/userAuth");

const router = express.Router();

//Create Request
router.post("/", authUser, createRequest);

// Accept Request
router.put("/accept/:visitorID", authUser, acceptRequest);

// Reject Request
router.put("/reject/:visitorID", authUser, rejectRequest);

// View requests
router.get("/", authUser, viewRequest);

// Admin requests
router.get("/admin", authUser, adminRequest);

module.exports = router;
