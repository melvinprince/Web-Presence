const db = require("./db");

class UserDetails {
  static async createOrUpdateUserDetails(user_id, userData) {
    console.log(
      "userDetailsModel.js - createOrUpdateUserDetails - user_id",
      user_id,
      "userData",
      userData
    );

    // Preprocess userData to set undefined or empty fields to null
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        userData[key] = null; // Replace undefined or empty strings with null
      }
    });

    try {
      // Check if user details already exist
      const existingUser = await this.fetchUserDetails(user_id);
      console.log(
        "userDetailsModel.js - createOrUpdateUserDetails - existingUser",
        existingUser
      );

      if (existingUser) {
        console.log("User details found, updating...");
        const columns = Object.keys(userData);
        const values = Object.values(userData);
        const setClause = columns
          .map((column, index) => `${column} = $${index + 2}`)
          .join(", ");

        const updateQuery = `
        UPDATE user_details 
        SET ${setClause} 
        WHERE user_id = $1
        RETURNING id
      `;
        const result = await db.one(updateQuery, [user_id, ...values]);
        console.log("User details updated:", result);
        return result;
      } else {
        console.log("User details not found, creating...");
        const columns = Object.keys(userData).join(", ");
        const values = Object.values(userData);
        const placeholders = values
          .map((_, index) => `$${index + 2}`)
          .join(", ");

        const insertQuery = `
        INSERT INTO user_details (user_id, ${columns}) 
        VALUES ($1, ${placeholders}) 
        RETURNING id
      `;
        const result = await db.one(insertQuery, [user_id, ...values]);
        console.log("User details created:", result);
        return result;
      }
    } catch (err) {
      console.error("Error in createOrUpdateUserDetails:", err);
      throw err;
    }
  }

  static async addOrUpdateEducation(user_id, educationData) {
    console.log("Received educationData:", educationData);

    //Use a set to efficiently track existing IDs
    const existingIds = new Set();
    const existingEducation = await db.any(
      `SELECT id FROM education WHERE user_id = $1`,
      [user_id]
    );
    console.log("Existing education:", existingEducation);
    
    existingEducation.forEach((item) => existingIds.add(item.id));

    for (const edu of educationData) {
      console.log("Processing education entry:", edu);

      if (edu.id && existingIds.has(edu.id)) {
        // Update existing entry (if ID is present and already exists)
        try {
          const updatedEducation = await db.one(
            `UPDATE education SET college_name = $/college_name/, graduation_year = $/graduation_year/, graduation_month = $/graduation_month/, degree = $/degree/, major = $/major/ WHERE id = $/id/ RETURNING *`,
            edu
          );
          console.log("Updated education:", updatedEducation);
        } catch (err) {
          console.error("Error updating education:", err);
          throw err;
        }
      } else {
        // Insert new entry (if ID is not present or does not exist)
        try {
          const newEducation = await db.one(
            `INSERT INTO education (user_id, college_name, graduation_year, graduation_month, degree, major) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
              user_id,
              edu.college_name,
              edu.graduation_year,
              edu.graduation_month,
              edu.degree,
              edu.major,
            ]
          );
          console.log("Inserted new education:", newEducation);
        } catch (err) {
          console.error("Error inserting education:", err);
          throw err;
        }
      }
    }
  }

  static async addOrUpdateProject(user_id, projectData) {
    console.log("Received projectData:", projectData);

    //Use a set to efficiently track existing IDs
    const existingIds = new Set();
    const existingProjects = await db.any(
      `SELECT id FROM projects WHERE user_id = $1`,
      [user_id]
    );
    existingProjects.forEach((item) => existingIds.add(item.id));

    for (const project of projectData) {
      console.log("Processing project entry:", project);
      if (project.id && existingIds.has(project.id)) {
        // Update existing entry (if ID is present and already exists)
        try {
          const updatedProject = await db.one(
            `UPDATE projects SET project_name = $/project_name/, project_outcome = $/project_outcome/, project_link = $/project_link/ WHERE id = $/id/ RETURNING *`,
            project
          );
          console.log("Updated project:", updatedProject);
        } catch (err) {
          console.error("Error updating project:", err);
          throw err;
        }
      } else {
        // Insert new entry (if ID is not present or does not exist)
        try {
          const newProject = await db.one(
            `INSERT INTO projects (user_id, project_name, project_outcome, project_link) VALUES ($1, $2, $3, $4) RETURNING *`,
            [
              user_id,
              project.project_name,
              project.project_outcome,
              project.project_link,
            ]
          );
          console.log("Inserted new project:", newProject);
        } catch (err) {
          console.error("Error inserting project:", err);
          throw err;
        }
      }
    }
  }

  static async addOrUpdateExperience(user_id, experienceData) {
    console.log("Received experienceData:", experienceData);

    //Use a set to efficiently track existing IDs
    const existingIds = new Set();
    const existingExperiences = await db.any(
      `SELECT id FROM experience WHERE user_id = $1`,
      [user_id]
    );
    console.log("Existing experiences:", existingExperiences);
    
    existingExperiences.forEach((item) => existingIds.add(item.id));

    for (const experience of experienceData) {
      console.log("Processing experience entry:", experience);
      if (experience.id && existingIds.has(experience.id)) {
        // Update existing entry (if ID is present and already exists)
        try {
          const updatedExperience = await db.one(
            `UPDATE experience SET company_name = $/company_name/, title = $/title/, start_date = $/start_date/, end_date = $/end_date/ WHERE id = $/id/ RETURNING *`,
            experience
          );
          console.log("Updated experience:", updatedExperience);
        } catch (err) {
          console.error("Error updating experience:", err);
          throw err;
        }
      } else {
        // Insert new entry (if ID is not present or does not exist)
        try {
          const newExperience = await db.one(
            `INSERT INTO experience (user_id, company_name, title, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [
              user_id,
              experience.company_name,
              experience.title,
              experience.start_date,
              experience.end_date,
            ]
          );
          console.log("Inserted new experience:", newExperience);
        } catch (err) {
          console.error("Error inserting experience:", err);
          throw err;
        }
      }
    }
  }

  // ... rest of your UserDetails class ...

  //   static async addOrUpdateEducation(user_id, educationData) {
  //     console.log("Received educationData:", educationData); // Log the input data
  //
  //     for (const edu of educationData) {
  //       console.log("Processing education entry:", edu); // Log each entry being processed
  //
  //       try {
  //         if (edu.id) {
  //           console.log("Updating education with ID:", edu.id); // Log the update operation
  //
  //           const updatedEducation = await db.one(
  //             `
  //           INSERT INTO education (id, user_id, college_name, graduation_year, graduation_month, degree, major)
  //           VALUES ($/id/, $/user_id/, $/college_name/, $/graduation_year/, $/graduation_month/, $/degree/, $/major/)
  //           ON CONFLICT (id)
  //           DO UPDATE SET
  //               college_name = EXCLUDED.college_name,
  //               graduation_year = EXCLUDED.graduation_year,
  //               graduation_month = EXCLUDED.graduation_month,
  //               degree = EXCLUDED.degree,
  //               major = EXCLUDED.major
  //           RETURNING id;
  //
  //           `,
  //             { ...edu, user_id }
  //           );
  //
  //           console.log("Updated education:", updatedEducation); // Confirm successful update
  //
  //           if (!updatedEducation) {
  //             throw new Error(`Education update failed for id ${edu.id}`);
  //           }
  //         } else {
  //           console.log("Inserting new education entry:", edu); // Log the insert operation
  //
  //           await db.none(
  //             `
  //           INSERT INTO education (user_id, college_name, graduation_year, graduation_month, degree, major)
  //           VALUES ($/user_id/, $/college_name/, $/graduation_year/, $/graduation_month/, $/degree/, $/major/)
  //           `,
  //             { ...edu, user_id }
  //           );
  //         }
  //       } catch (err) {
  //         console.error("Error in addOrUpdateEducation:", err); // Log any errors
  //         throw err;
  //       }
  //     }
  //   }

  //   static async addOrUpdateProject(user_id, projectData) {
  //     console.log("Received projectData:", projectData); // Log the input data
  //
  //     for (const project of projectData) {
  //       console.log("Processing project entry:", project); // Log each entry being processed
  //
  //       try {
  //         if (project.id) {
  //           console.log("Updating project with ID:", project.id); // Log the update operation
  //
  //           const updatedProject = await db.one(
  //             `
  //           INSERT INTO projects (id, user_id, project_name, project_outcome, project_link)
  //           VALUES ($/id/, $/user_id/, $/project_name/, $/project_outcome/, $/project_link/)
  //           ON CONFLICT (id)
  //           DO UPDATE SET
  //           project_name = EXCLUDED.project_name,
  //           project_link = EXCLUDED.project_link,
  //           project_outcome = EXCLUDED.project_outcome
  //           RETURNING id;
  //           `,
  //             { ...project, user_id }
  //           );
  //
  //           console.log("Updated project:", updatedProject); // Confirm successful update
  //
  //           if (!updatedProject) {
  //             throw new Error(`Project update failed for id ${project.id}`);
  //           }
  //         } else {
  //           console.log("Inserting new project entry:", project); // Log the insert operation
  //
  //           await db.none(
  //             `
  //           INSERT INTO projects (user_id, project_name, project_outcome, project_link)
  //           VALUES ($/user_id/, $/project_name/, $/project_outcome/, $/project_link/)
  //           `,
  //             { ...project, user_id }
  //           );
  //         }
  //       } catch (err) {
  //         console.error("Error in addOrUpdateProject:", err); // Log any errors
  //         throw err;
  //       }
  //     }
  //   }
  //
  //   static async addOrUpdateExperience(user_id, experienceData) {
  //     console.log("Received experienceData:", experienceData); // Log the input data
  //
  //     for (const experience of experienceData) {
  //       console.log("Processing experience entry:", experience); // Log each entry being processed
  //
  //       try {
  //         if (experience.id) {
  //           console.log("Updating experience with ID:", experience.id); // Log the update operation
  //
  //           const updatedExperience = await db.one(
  //             `
  //           INSERT INTO experience (id, user_id, company_name, title, start_date, end_date)
  //           VALUES ($/id/, $/user_id/, $/company_name/, $/title/, $/start_date/, $/end_date/)
  //           ON CONFLICT (id)
  //           DO UPDATE SET
  //               company_name = EXCLUDED.company_name,
  //               title = EXCLUDED.title,
  //               start_date = EXCLUDED.start_date,
  //               end_date = EXCLUDED.end_date
  //           RETURNING id;
  //
  //           `,
  //             { ...experience, user_id }
  //           );
  //
  //           console.log("Updated experience:", updatedExperience); // Confirm successful update
  //
  //           if (!updatedExperience) {
  //             throw new Error(`Experience update failed for id ${experience.id}`);
  //           }
  //         } else {
  //           console.log("Inserting new experience entry:", experience); // Log the insert operation
  //
  //           await db.none(
  //             `
  //           INSERT INTO experience (user_id, company_name, title, start_date, end_date)
  //           VALUES ($/user_id/, $/company_name/, $/title/, $/start_date/, $/end_date/)
  //           `,
  //             { ...experience, user_id }
  //           );
  //         }
  //       } catch (err) {
  //         console.error("Error in addOrUpdateExperience:", err); // Log any errors
  //         throw err;
  //       }
  //     }
  //   }

  static async addOrUpdateSocialLinks(user_id, socialLinks) {
    console.log(
      "userDetailsModel.js - addOrUpdateSocialLinks - user_id",
      user_id,
      "socialLinks",
      socialLinks
    );
    const existingLinks = await db.oneOrNone(
      `SELECT id FROM social_links WHERE user_id = $1`,
      [user_id]
    );
    console.log("Existing social links:", existingLinks);

    if (existingLinks) {
      console.log("Social links found, updating...");

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
      // If no existing links, insert new ones
      console.log("Social links not found, inserting...");

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

  static async fetchUserDetails(user_id) {
    console.log("userDetailsModel.js - fetchUserDetails - user_id", user_id);
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

  static async fetchEducation(user_id) {
    console.log("userDetailsModel.js - fetchEducation - user_id", user_id);
    const query = `SELECT * FROM education WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchEducation:", err);
      throw err;
    }
  }

  static async fetchProjects(user_id) {
    console.log("userDetailsModel.js - fetchProjects - user_id", user_id);
    const query = `SELECT * FROM projects WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchProjects:", err);
      throw err;
    }
  }

  static async fetchExperience(user_id) {
    console.log("userDetailsModel.js - fetchExperience - user_id", user_id);
    const query = `SELECT * FROM experience WHERE user_id = $1`;

    try {
      const result = await db.any(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error in fetchExperience:", err);
      throw err;
    }
  }

  static async fetchSocialLinks(user_id) {
    console.log("userDetailsModel.js - fetchSocialLinks - user_id", user_id);
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
