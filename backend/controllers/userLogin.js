const Visitor = require("../models/visitor");
const bcrypt = require("bcrypt");
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await Visitor.findOne({ email });
    if (!existingUser) {
        return res.send({
        type: "warning",
        title: "Oops!",
        text: "User Not found with this Email, ",
        secondrytext: "Try creating a New One",
        });
    }
    const { firstName, lastName } = existingUser;
    const hashedPassword = existingUser.password;
    bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        if (result) {
        res.send({
            type: "success",
            title: "Welcome",
            text: "Logged in succesfully",
            secondrytext: "",
            firstName: firstName,
            lastName: lastName,
            LoggedIn: true,
        });
        } else {
        res.send({
            type: "error",
            title: "Oops!",
            text: "Credentials don't match, ",
            secondrytext: "Please Recheck your Credentials",
        });
        }
    });
}
module.exports = userLogin;