const { log } = require('console');
const User = require('../models/userModels');

const createUser = async (req, res) => {
    const userData = req.body;    
    try {
        const result = await User.createUser(userData);
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const findUser = async (req, res) => {
    const userData = req.body;
    try {
        const result = await User.findUser(userData);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const checkPass = async (req, res) => {
    const userData = req.body;
    try {
        const result = await User.checkpass(userData);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    createUser,
    findUser,
    checkPass
};