import axios from "./axiosInstance";

const addUserDetails = async (dataToSubmit) => {

    // const user_details = { name, email, title, education, projects, skills, languages, date_of_birth, nationality, current_country};
    console.log("initial user details from adduserdeatils servbcies", dataToSubmit);
    

    try {
        const token = localStorage.getItem("token"); // Get token from storage
        // console.log("add user details token: from userdetauils service.js front end", token);
        const { data } = await axios.post("/user/add-details", 
            dataToSubmit, 
            { headers: {
                Authorization: `Bearer ${token}`, // Attach token to request
            },
            });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to add user details.");
    }
}

const updateUserDetails = async (dataToSubmit) => {
    try {
        console.log("triggered update");
        
        const token = localStorage.getItem("token"); // Get token from storage
        const { data } = await axios.put("/user/update-details", 
            dataToSubmit, 
            { headers: {
                Authorization: `Bearer ${token}`, // Attach token to request
            },
            });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update user details.");
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
    console.log("getuserdetaios/service.js triggered");
    
    // const {data} = await axios.get("/user/get-details");
    console.log("get user details data:", data);
    
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to get user details."
    );
  }
};



export { addUserDetails, getUserDetails, updateUserDetails };