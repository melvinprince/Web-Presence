const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
    // console.log("triggered createUser controller", req.body);
    const userData = req.body;

    try {
      const result = await User.createUser(userData);

      const token = jwt.sign(
        { userId: result.id }, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d",}
      );
      const refreshToken = jwt.sign(
        { userId: result.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
          message: "User created successfully",
          token,
          userId: result.id,
        });

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

    const token = jwt.sign(
      { userId: result.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d"}
    );
    const refreshToken = jwt.sign(
      { userId: result.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    // console.log("refreshToken", refreshToken);
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ 
      token, 
      userId: result.id 
    });
    
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
    const refreshTokenFromCookie = req.cookies.refreshToken;

    if (!refreshTokenFromCookie) {
        return res.status(401).json({ message: "Refresh token missing from cookie" });
    }

    try {
        const decoded = jwt.verify(refreshTokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const userId = decoded.userId;
        const user = await User.findUserById(userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ accessToken }); // Send only the new access token

    } catch (error) {
        console.error("Refresh token error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token expired' }); // Handle expired refresh token specifically
        }
        return res.status(500).json({ message: "Server error" });
    }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { 
  createUser, 
  findUser, 
  refreshToken, 
  logout 
};



