const db = require("./db");

class UserDetails {
  static async createUserDetails(user_id, userData) {
    // console.log("triggered createUserDetails models");
    // console.log("user_id", user_id);
    // console.log("userData", userData);

    // Preprocess userData to set undefined or empty fields to null
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        userData[key] = null; // Replace undefined or empty strings with null
      }
    });

    try {
      const columns = Object.keys(userData)
        .map((key) => key)
        .join(", ");
      const values = Object.values(userData);
      const placeholders = values.map((_, index) => `$${index + 2}`).join(", ");

      const query = `
            INSERT INTO user_details (user_id, ${columns}) 
            VALUES ($1, ${placeholders}) 
            RETURNING id
        `;

      const result = await db.one(query, [user_id, ...values]);
      // console.log("user details models/createUserDetails result", result);
      return result;
    } catch (err) {
      console.log("user details models/createUserDetails err", err);
      throw err;
    }
  }

  static async updateUserDetails(user_id, userData) {
    // console.log("user details models/updateUserDetails", user_id, userData);

    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        userData[key] = null;
      }
    });

    try {
      const columns = Object.keys(userData);
      const values = Object.values(userData);
      const setClause = columns
        .map((column, index) => `${column} = $${index + 2}`)
        .join(", ");

      const query = `
        UPDATE user_details 
        SET ${setClause} 
        WHERE user_id = $1
        RETURNING id
      `;

      const existingUser = await this.fetchUserDetails(user_id);

      if (existingUser) {
        const result = await db.one(query, [user_id, ...values]);
        // console.log("user details models/updateUserDetails result", result);
        return result;
      }
    } catch (err) {
      console.log("user details models/updateUserDetails err", err);
      throw err;
    }
  }

  static async fetchUserDetails(user_id) {
    // console.log("user details models/fetchUserDetails", user_id);

    try {
      const result = await db.oneOrNone(
        `SELECT * FROM user_details WHERE user_id = $1`,
        [user_id]
      );
      // console.log("user details models/fetchUserDetails result", result);
      return result;
    } catch (err) {
      console.log("user details models/fetchUserDetails err", err);
      throw err;
    }
  }

}

module.exports = UserDetails;
