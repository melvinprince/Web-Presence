// const db = require("./db");
// 
// class UserDetails {
//   static async createUserDetails(user_id, userData) {
//     // console.log("triggered createUserDetails models");
//     // console.log("user_id", user_id);
//     // console.log("userData", userData);
// 
//     // Preprocess userData to set undefined or empty fields to null
//     Object.keys(userData).forEach((key) => {
//       if (!userData[key]) {
//         userData[key] = null; // Replace undefined or empty strings with null
//       }
//     });
// 
//     try {
//       const columns = Object.keys(userData)
//         .map((key) => key)
//         .join(", ");
//       const values = Object.values(userData);
//       const placeholders = values.map((_, index) => `$${index + 2}`).join(", ");
// 
//       const query = `
//             INSERT INTO user_details (user_id, ${columns}) 
//             VALUES ($1, ${placeholders}) 
//             RETURNING id
//         `;
// 
//       const result = await db.one(query, [user_id, ...values]);
//       // console.log("user details models/createUserDetails result", result);
//       return result;
//     } catch (err) {
//       console.log("user details models/createUserDetails err", err);
//       throw err;
//     }
//   }
// 
//   static async updateUserDetails(user_id, userData) {
//     // console.log("user details models/updateUserDetails", user_id, userData);
// 
//     Object.keys(userData).forEach((key) => {
//       if (!userData[key]) {
//         userData[key] = null;
//       }
//     });
// 
//     try {
//       const columns = Object.keys(userData);
//       const values = Object.values(userData);
//       const setClause = columns
//         .map((column, index) => `${column} = $${index + 2}`)
//         .join(", ");
// 
//       const query = `
//         UPDATE user_details 
//         SET ${setClause} 
//         WHERE user_id = $1
//         RETURNING id
//       `;
// 
//       const existingUser = await this.fetchUserDetails(user_id);
// 
//       if (existingUser) {
//         const result = await db.one(query, [user_id, ...values]);
//         // console.log("user details models/updateUserDetails result", result);
//         return result;
//       }
//     } catch (err) {
//       console.log("user details models/updateUserDetails err", err);
//       throw err;
//     }
//   }
// 
//   static async fetchUserDetails(user_id) {
//     // console.log("user details models/fetchUserDetails", user_id);
// 
//     try {
//       const result = await db.oneOrNone(
//         `SELECT * FROM user_details WHERE user_id = $1`,
//         [user_id]
//       );
//       // console.log("user details models/fetchUserDetails result", result);
//       return result;
//     } catch (err) {
//       console.log("user details models/fetchUserDetails err", err);
//       throw err;
//     }
//   }
// 
// }
// 
// module.exports = UserDetails;


const db = require("./db");

class UserDetails {
  /**
   * Create user details for a specific user.
   * @param {number} user_id - The ID of the user.
   * @param {object} userData - An object containing user details.
   * @returns {Promise<object>} - The ID of the newly inserted user details.
   */
  static async createUserDetails(user_id, userData) {
    // Preprocess userData to set undefined or empty fields to null
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        userData[key] = null; // Replace undefined or empty strings with null
      }
    });

    // Ensure skills and languages are stored as arrays if provided
    if (userData.skills && !Array.isArray(userData.skills)) {
      userData.skills = userData.skills.split(",").map((item) => item.trim());
    }
    if (userData.languages && !Array.isArray(userData.languages)) {
      userData.languages = userData.languages
        .split(",")
        .map((item) => item.trim());
    }

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
      return result;
    } catch (err) {
      console.error("Error in createUserDetails:", err);
      throw err;
    }
  }

  /**
   * Update user details for a specific user.
   * @param {number} user_id - The ID of the user.
   * @param {object} userData - An object containing updated user details.
   * @returns {Promise<object>} - The ID of the updated user details.
   */
  static async updateUserDetails(user_id, userData) {
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        userData[key] = null;
      }
    });

    // Ensure skills and languages are stored as arrays if provided
    if (userData.skills && !Array.isArray(userData.skills)) {
      userData.skills = userData.skills.split(",").map((item) => item.trim());
    }
    if (userData.languages && !Array.isArray(userData.languages)) {
      userData.languages = userData.languages
        .split(",")
        .map((item) => item.trim());
    }

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
        return result;
      }
    } catch (err) {
      console.error("Error in updateUserDetails:", err);
      throw err;
    }
  }

  /**
   * Fetch user details for a specific user.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<object>} - The user details.
   */
  static async fetchUserDetails(user_id) {
    try {
      const result = await db.oneOrNone(
        `SELECT * FROM user_details WHERE user_id = $1`,
        [user_id]
      );
      return result;
    } catch (err) {
      console.error("Error in fetchUserDetails:", err);
      throw err;
    }
  }

    static async addEducation(user_id, educationData) {
    const query = `
      INSERT INTO education (user_id, college_name, graduation_year, graduation_month, degree, major)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [
      user_id,
      educationData.college_name,
      educationData.graduation_year,
      educationData.graduation_month,
      educationData.degree,
      educationData.major,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in addEducation:", err);
      throw err;
    }
  }

  static async fetchEducation(user_id) {
    const query = `SELECT * FROM education WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchEducation:", err);
      throw err;
    }
  }

  static async updateEducation(id, educationData) {
    const query = `
      UPDATE education
      SET college_name = $1, graduation_year = $2, graduation_month = $3, degree = $4, major = $5
      WHERE id = $6
      RETURNING id
    `;
    const values = [
      educationData.college_name,
      educationData.graduation_year,
      educationData.graduation_month,
      educationData.degree,
      educationData.major,
      id,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in updateEducation:", err);
      throw err;
    }
  }

  /**
   * Projects Methods
   */
  static async addProject(user_id, projectData) {
    const query = `
      INSERT INTO projects (user_id, project_name, project_outcome, project_link)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [
      user_id,
      projectData.project_name,
      projectData.project_outcome,
      projectData.project_link,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in addProject:", err);
      throw err;
    }
  }

  static async fetchProjects(user_id) {
    const query = `SELECT * FROM projects WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchProjects:", err);
      throw err;
    }
  }

  static async updateProject(id, projectData) {
    const query = `
      UPDATE projects
      SET project_name = $1, project_outcome = $2, project_link = $3
      WHERE id = $4
      RETURNING id
    `;
    const values = [
      projectData.project_name,
      projectData.project_outcome,
      projectData.project_link,
      id,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in updateProject:", err);
      throw err;
    }
  }

  /**
   * Experience Methods
   */
  static async addExperience(user_id, experienceData) {
    const query = `
      INSERT INTO experience (user_id, company_name, title, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      user_id,
      experienceData.company_name,
      experienceData.title,
      experienceData.start_date,
      experienceData.end_date,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in addExperience:", err);
      throw err;
    }
  }

  static async fetchExperience(user_id) {
    const query = `SELECT * FROM experience WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchExperience:", err);
      throw err;
    }
  }

  static async updateExperience(id, experienceData) {
    const query = `
      UPDATE experience
      SET company_name = $1, title = $2, start_date = $3, end_date = $4
      WHERE id = $5
      RETURNING id
    `;
    const values = [
      experienceData.company_name,
      experienceData.title,
      experienceData.start_date,
      experienceData.end_date,
      id,
    ];

    try {
      const result = await db.one(query, values);
      return result;
    } catch (err) {
      console.error("Error in updateExperience:", err);
      throw err;
    }
  }

  /**
   * Social Links Methods
   */
  static async addOrUpdateSocialLinks(user_id, socialLinks) {
    const existingLinks = await db.oneOrNone(
      `SELECT id FROM social_links WHERE user_id = $1`,
      [user_id]
    );

    if (existingLinks) {
      const query = `
        UPDATE social_links
        SET linkedin = $1, github = $2, website = $3
        WHERE user_id = $4
        RETURNING id
      `;
      const values = [
        socialLinks.linkedin,
        socialLinks.github,
        socialLinks.website,
        user_id,
      ];

      try {
        const result = await db.one(query, values);
        return result;
      } catch (err) {
        console.error("Error in addOrUpdateSocialLinks (update):", err);
        throw err;
      }
    } else {
      const query = `
        INSERT INTO social_links (user_id, linkedin, github, website)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const values = [
        user_id,
        socialLinks.linkedin,
        socialLinks.github,
        socialLinks.website,
      ];

      try {
        const result = await db.one(query, values);
        return result;
      } catch (err) {
        console.error("Error in addOrUpdateSocialLinks (insert):", err);
        throw err;
      }
    }
  }

  static async fetchSocialLinks(user_id) {
    const query = `SELECT * FROM social_links WHERE user_id = $1`;

    try {
      const result = await db.oneOrNone(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchSocialLinks:", err);
      throw err;
    }
  }
}

module.exports = UserDetails;
