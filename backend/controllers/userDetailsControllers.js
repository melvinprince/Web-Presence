const userDetails = require("../models/userDetailsModel");

// Create user details
const createUserDetails = async (req, res) => {
  const user_id = req.userId;
  const userData = req.body;

  try {
    await userDetails.createUserDetails(user_id, userData);
    res.status(200).json({ message: "User details created successfully" });
  } catch (err) {
    console.error("Error creating user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  const user_id = req.userId;
  const userData = req.body;

  try {
    await userDetails.updateUserDetails(user_id, userData);
    res.status(200).json({ message: "User details updated successfully" });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch user details
const fetchUserDetails = async (req, res) => {
  const user_id = req.userId;

  try {
    const user = await userDetails.fetchUserDetails(user_id);
    if (!user) {
      return res.status(404).json({ message: "User details not found" });
    }

    const education = await userDetails.fetchEducation(user_id);
    const projects = await userDetails.fetchProjects(user_id);
    const experience = await userDetails.fetchExperience(user_id);
    const socialLinks = await userDetails.fetchSocialLinks(user_id);

    // Format the response data
    const formattedResponse = {
      userData: {
        name: user.name || "",
        email: user.email || "",
        title: user.title || "",
        date_of_birth: user.date_of_birth || "",
        nationality: user.nationality || "",
        current_country: user.current_country || "",
        image_url: user.image_url || "",
        skills: user.skills || "",
        languages: user.languages || ""
      },
      profileLinks: {
        linkedin: socialLinks?.linkedin || "", // Use optional chaining
        github: socialLinks?.github || "",
        website: socialLinks?.website || "",
        // ... other social links
      },
      education: education || [],
      projects: projects || [],
      experience: experience || [],

    };

    res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add education
const addEducation = async (req, res) => {
  const user_id = req.userId;
  const educationData = req.body;

  try {
    const result = await userDetails.addEducation(user_id, educationData);
    res
      .status(200)
      .json({ message: "Education added successfully", id: result.id });
  } catch (err) {
    console.error("Error adding education:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update education
const updateEducation = async (req, res) => {
  const { id } = req.params;
  const educationData = req.body;

  try {
    const result = await userDetails.updateEducation(id, educationData);
    res
      .status(200)
      .json({ message: "Education updated successfully", id: result.id });
  } catch (err) {
    console.error("Error updating education:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add project
const addProject = async (req, res) => {
  const user_id = req.userId;
  const projectData = req.body;

  try {
    const result = await userDetails.addProject(user_id, projectData);
    res
      .status(200)
      .json({ message: "Project added successfully", id: result.id });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;

  try {
    const result = await userDetails.updateProject(id, projectData);
    res
      .status(200)
      .json({ message: "Project updated successfully", id: result.id });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add experience
const addExperience = async (req, res) => {
  const user_id = req.userId;
  const experienceData = req.body;

  try {
    const result = await userDetails.addExperience(user_id, experienceData);
    res
      .status(200)
      .json({ message: "Experience added successfully", id: result.id });
  } catch (err) {
    console.error("Error adding experience:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update experience
const updateExperience = async (req, res) => {
  const { id } = req.params;
  const experienceData = req.body;

  try {
    const result = await userDetails.updateExperience(id, experienceData);
    res
      .status(200)
      .json({ message: "Experience updated successfully", id: result.id });
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or update social links
const addOrUpdateSocialLinks = async (req, res) => {
  const user_id = req.userId;
  const socialLinks = req.body;

  try {
    const result = await userDetails.addOrUpdateSocialLinks(
      user_id,
      socialLinks
    );
    res
      .status(200)
      .json({ message: "Social links updated successfully", id: result.id });
  } catch (err) {
    console.error("Error updating social links:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload user image
const uploadUserImage = async (req, res) => {
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
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
  addEducation,
  updateEducation,
  addProject,
  updateProject,
  addExperience,
  updateExperience,
  addOrUpdateSocialLinks,
  uploadUserImage,
};
