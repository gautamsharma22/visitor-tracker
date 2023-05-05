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
    return res.send({
      type: "info",
      title: "Oops!",
      text: "Email Already Exists, ",
      secondrytext: "Redirecting You to Login",
    });
  }

  try {
    const result = await visitor.save();
    res.send({
      type: "success",
      title: "Welcome",
      text: "Registered Succesfully",
      secondrytext: "Redirecting You to Login",
    });
  } catch (error) {
    console.error("Error saving visitor:", error);
    res.send({
      type: "error",
      title: "Error Occured",
      text: "Something Went Wrong :(",
      secondrytext: "",
    });
  }
};
module.exports = userRegister;
