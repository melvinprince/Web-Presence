const db = require('./db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class User {
    static async createUser(userData) {
        const email = userData.email;       
        const unhashedPassword = userData.password;
        const password = await bcrypt.hash(unhashedPassword, saltRounds);
        try {
            const result = await db.one(
                `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [email, password]
            );
            return result;
        } catch (err) {
             if (err.code === "23505") {
               throw new Error("User with this email already exists");
             }
            throw err;
        }
    }

    static async findUser(userData){
        const email = userData.email;
        try{
            const result = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1`, [email]
            );
            return result;
        } catch(err) {
            throw err;
        }
    }

    static async findUserById(userId) {  // Add this method
        try {
            const result = await db.oneOrNone(
                `SELECT * FROM users WHERE id = $1`, [userId]
            );
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;

