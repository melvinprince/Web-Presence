import axios from "./axiosInstance";

const addUserDetails = async (name, email, title, education, projects, skills, languages, date_of_birth, nationality, current_country) => {
    try {
        const { data } = await axios.post("/user/add-details", { name, email, title, education, projects, skills, languages, date_of_birth, nationality, current_country });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to add user details.");
    }
}

const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token"); 
    console.log("get user details token:", token);
    // Get token from storage
    const { data } = await axios.get("/user/get-details", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to request
      },
    });
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to get user details."
    );
  }
};


export { addUserDetails, getUserDetails };