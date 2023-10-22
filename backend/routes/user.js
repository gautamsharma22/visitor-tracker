const express = require("express");
const router = express.Router();
const userLogin = require("../controllers/userLogin");
const userRegister = require("../controllers/userRegister");
const userView = require("../controllers/userView");
const UserDelete=require("../controllers/userDelete")
const authUser = require("../controllers/userAuth");

router.post("/login", userLogin);

router.post("/register", authUser, userRegister);

router.post("/view", authUser, userView);

router.post("/remove", authUser, UserDelete);

module.exports = router;
