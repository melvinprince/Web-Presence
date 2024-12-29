const { log } = require("console");
const userDetails = require("../models/userDetailsModel");

// Create user details
const createOrUpdateUserDetails = async (req, res) => {
  const user_id = req.userId;
  const dataToSubmit = req.body;
  console.log("createUserDetails triggered from userDetailsController.js", dataToSubmit, user_id);
  

  try {
    await userDetails.createOrUpdateUserDetails(user_id, dataToSubmit.userData);
    await userDetails.addOrUpdateSocialLinks(user_id, dataToSubmit.profileLinks);
    await userDetails.addOrUpdateEducation(user_id, dataToSubmit.education);
    await userDetails.addOrUpdateProject(user_id, dataToSubmit.projects);
    await userDetails.addOrUpdateExperience(user_id, dataToSubmit.experience );
    console.log("finished entering data");
    
    res.status(200).json({ message: "User details created successfully" });
  } catch (err) {
    console.error("Error creating user details:", err);
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
        about: user.about || "",
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
  createOrUpdateUserDetails,
  fetchUserDetails,
  uploadUserImage,
};
