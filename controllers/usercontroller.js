
const User = require("../models/userSchema.js");

// Login Api

exports.userlogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "password incorrect" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};

//Register Api

exports.register = (req, res) => {
  const { username, name, email, password } = req.body;
  User.findOne(
    {
      email: email,
    },
    (err, user) => {
      if (user) {
        res.send({ message: "User already exist" });
      } else {
        const user = new User({
          username,
          name,
          email,
          password,
        });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Registered ,Now you can Login" });
          }
        });
      }
    }
  );
};
