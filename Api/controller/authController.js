const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  try {
    const { name, dob, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = new User({
      name: name,
      dob: dob,
      email: email,
      password: password,
    });

    await newUser.save();

    res.status(201).json({ message: "Successfully registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: "Login Successful", user: user });
      } else {
        res.status(401).json({ message: "Password didn't match" });
      }
    } else {
      res.status(404).json({ message: "User not registered" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
