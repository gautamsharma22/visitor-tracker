const express = require("express");
const mongoose = require("mongoose");
const registerUser = require("./routes/user");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const connectionURI =
  "mongodb+srv://root:root@cluster0.s1a1yrw.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/users", registerUser);
app.listen(5000, () => console.log("Server listening on port 5000"));
