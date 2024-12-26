// const { log } = require("console");
const jwt = require("jsonwebtoken");

const autheticatedToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
//   console.log(authHeader);
  
  
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
//   console.log(token);
  
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token missing from authorization header" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    // console.log("Authenticated User:", user); // Log the decoded user for debugging
    req.userId = user.userId;
    // console.log("User ID:", req.userId);
    next();
  });
};

module.exports = autheticatedToken;
