const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const registerUser = require("./routes/user");
const manageRequest = require("./routes/requests");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "set-cookie");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});
const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s1a1yrw.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected! You're Good to go.");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
app.use("/", (req, res) => {
  console.log("app rendered");
});
app.use("/users", registerUser);
app.use("/request", manageRequest);
app.listen(process.env.LISTEN_PORT, () =>
  console.log(`Server listening on port ${process.env.LISTEN_PORT}`)
);
