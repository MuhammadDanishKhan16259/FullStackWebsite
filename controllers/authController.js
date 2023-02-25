const User = require("../models/user");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const login = (req, res) => {
  User.find({ email: req.body.email }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs.length > 0) {
        if (docs[0].password == req.body.password) {
          res.status(200).json({ status: "success" });
        } else {
          res.send("Invalid Credentials!");
        }
      } else {
        res.send("Invalids Credentials!");
      }
    }
  });
};

const register = async (req, res) => {
  try {
    const encryptedPassword = pass(req.body.password, 5);
    console.log(password);
    const user = await new User({
      email: req.body.email,
      // password: req.body.password,
      password: encryptedPassword,
      username: req.body.username,
      creation_date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    await user.save();
    res.status(200).json({ message: "added!" });
  } catch (err) {
    console.log(err);
    if (err.code == "11000") {
      res.send("User Already Exists!");
    } else {
      res.send({ status: "err", message: err });
    }
  }
};

// const password = 'pass123';
// var hashedPassword;
// const password = "mypassword";
// const saltRounds = 10;
const pass = (password, saltRounds) => {
  debugger;
  return bcrypt.hashSync(password, saltRounds);
};
module.exports = {
  login,
  register,
};

// const bcrypt = require("bcryptjs");
// // const password = 'pass123';
// // var hashedPassword;
// const password = "mypassword";
// const saltRounds = 10;
// bcrypt.hash(password, saltRounds, function (err, hash) {
//   if (err) {
//     // Handle error
//   } else {
//     // Store the hashed password in your database
//     console.log(hash);
//   }
// });
