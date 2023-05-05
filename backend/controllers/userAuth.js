const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authUser = (req, res,next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).send("Invalid Token");
    } else {
      token = token.split(" ")[1];
      console.log(token)
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.visitorID = user;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
module.exports = authUser;
