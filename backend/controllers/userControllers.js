const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const { log } = require("console");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
    // console.log("triggered createUser controller", req.body);
    
  const userData = req.body;

  try {
    const result = await User.createUser(userData);
    log
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    if (err.message === "User with this email already exists") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};


const findUser = async (req, res) => {
  const userData = req.body;
  try {
    const result = await User.findUser(userData);
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const passwordMatch = await bcrypt.compare(
      userData.password,
      result.password
    );
    if (!passwordMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET);
    res.status(200).json({ token, userId: result.id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  findUser,
};
