const db = require('./db'); 

class UserDetails {
    static async createUserDetails(user_id, userData){
        console.log("user details models/createUserDetails 1", user_id);
        console.log("user details models/createUserDetails 2", userData);
        
        try {
            const{ name, email, title, education, projects, experience, skills, languages, date_of_birth, nationality, current_country } = userData.name;
            const result = await db.one(
                `INSERT INTO user_details (user_id, name, email, title, education, projects, experience, skills, languages, date_of_birth, nationality, current_country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`, [user_id, name, email, title, education, projects, experience, skills, languages, date_of_birth, nationality, current_country]
            );
            console.log("user details models/createUserDetails result", result);
            return result;
        } catch(err) {
            console.log("user details models/createUserDetails err", err);
            
            
            throw err;
        }
    }

    static async fetchUserDetails(user_id){
        console.log("user details models/fetchUserDetails", user_id);
        
        try {
            const result = await db.oneOrNone(
                `SELECT * FROM user_details WHERE user_id = $1`, [user_id]
            );
            console.log("user details models/fetchUserDetails result", result);
            
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = UserDetails;