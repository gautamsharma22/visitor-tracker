const Visitor = require("../models/visitor");
const userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  const visitor = new Visitor({
    firstName,
    lastName,
    email,
    password,
  });

  const existingUser = await Visitor.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      message: "User Already Exists, ",
    });
  }
  const name = firstName +" "+ lastName;
  try {
    const result = await visitor.save();
    res.status(201).send({
      message: "Registered Succesfully",
    });
  } catch (error) {
    console.error("Error saving visitor:", error);
    res.status(500).json({
      message: "Something Went Wrong :(",
    });
  }
};
module.exports = userRegister;
