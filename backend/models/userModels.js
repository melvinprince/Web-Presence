const db = require('./db');

class User {
    static async createUser(userData) {
        const {email, password} = userData;        
        try {
            const result = await db.one(
                `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [email, password]
            );
            return result;
        } catch (err) {
            console.log("Failed to Register", err);
            throw err;
        }
    }

    static async findUser(userData){
        const email = userData.email;
        try{
            const result = await db.one(
                `SELECT username FROM users WHERE username = $1`, [email]
            );
            return result;
        } catch(err) {
            console.log("Failed to find user", err);
            throw err;
        }
    }

    static async checkpass(userData){
        const {email, password} = userData;
        try{
            const result = await db.one(
                `SELECT * FROM users WHERE username = $1 AND password = $2`, [email, password]
            );
            return result;
        }catch(err){
            console.log("Failed to check password", err);
            throw err;
        }
    }
}

module.exports = User;

