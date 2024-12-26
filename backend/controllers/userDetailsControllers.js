const userDetails = require('../models/userDetailsModel');


const createUserDetails = async (req, res) => {
    console.log("triggered createUserDetails controller");
    console.log("req.body", req.body);
    console.log("req.userId", req.userId);
    
    const user_id = req.userId;
    const userData = req.body;

    console.log("userData nnnnnnnnn", userData.name);
    

    try {
        const result = await userDetails.createUserDetails(user_id, userData);
        res.status(200).json({ message: "User details created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

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
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createUserDetails,
    fetchUserDetails
}
