import axios from "./axiosInstance";

const addUserDetails = async (dataToSubmit) => {
  try {
    const token = localStorage.getItem("token"); // Get token from storage
    const { data } = await axios.post("/user/add-details", dataToSubmit, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to request
      },
    });
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to add user details."
    );
  }
};

const updateUserDetails = async (dataToSubmit) => {
  try {
    const token = localStorage.getItem("token"); // Get token from storage
    const { data } = await axios.put("/user/update-details", dataToSubmit, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to request
      },
    });
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to update user details."
    );
  }
};

const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
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

// New function to handle image upload
const uploadUserImage = async (formData) => {
  try {
    console.log("triggered");
    

    const imageUrl = `${formData.protocol}://${formData.get("host")}/uploads/${
    formData.file.filename}`;
    console.log("imageUrl", imageUrl);
    

    const token = localStorage.getItem("token"); // Get token from storage
    console.log("formdata from service", formData.protocol);
    
    const { data } = await axios.post("/user/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the content type is multipart/form-data for file uploads
        Authorization: `Bearer ${token}`, // Attach token to request
      },
    });
    return data; // Assuming the response contains the image URL or relevant data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to upload image.");
  }
};

export { addUserDetails, getUserDetails, updateUserDetails, uploadUserImage };
