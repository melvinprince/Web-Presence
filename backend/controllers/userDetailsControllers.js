const userDetails = require("../models/userDetailsModel");

// Create user details
const createUserDetails = async (req, res) => {
  console.log("triggered createUserDetails controller");
  console.log("req.body", req.body);
  console.log("req.userId", req.userId);

  const user_id = req.userId;
  const userData = req.body;

  try {
    const result = await userDetails.createUserDetails(user_id, userData);
    res.status(200).json({ message: "User details created successfully" });
  } catch (err) {
    console.error("Error creating user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  console.log("triggered updateUserDetails controller");
  console.log("req.body", req.body);
  console.log("req.userId", req.userId);

  const user_id = req.userId;
  const userData = req.body;

  try {
    const result = await userDetails.updateUserDetails(user_id, userData);
    console.log("table updated");
    res.status(200).json({ message: "User details updated successfully" });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch user details
const fetchUserDetails = async (req, res) => {
  console.log("triggered fetchUserDetails controller");
  const user_id = req.userId;
  console.log("user_id", user_id);

  try {
    const result = await userDetails.fetchUserDetails(user_id);
    if (!result) {
      res.status(404).json({ message: "User details not found" });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload user image
const uploadUserImage = async (req, res) => {
  console.log("triggered uploadUserImage controller");
  console.log("req.file", req.file);
  console.log("req.userId", req.userId);

  const user_id = req.userId;
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    const result = await userDetails.updateUserImage(user_id, imageUrl);
    console.log("Image URL updated in database");
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (err) {
    console.error("Error uploading user image:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUserDetails,
  updateUserDetails,
  fetchUserDetails,
  uploadUserImage,
};
