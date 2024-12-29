import axios from "./axiosInstance";

const addOrUpdateUserDetails = async (dataToSubmit) => {
  try {
    console.log("userDetailsService.js - dataToSubmit", dataToSubmit);
    const token = localStorage.getItem("token");
    const { data } = await axios.post("/user/add-details", dataToSubmit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to add user details."
    );
  }
};

const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/user/get-details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to get user details."
    );
  }
};

const uploadUserImage = async (formData) => {
  try {
    console.log("triggered uploadUserImage from userDetailsService.js");

    const token = localStorage.getItem("token");

    const { data } = await axios.post("/user/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to upload image.");
  }
};

const deleteEntry = async (category, index) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(
      `/user/delete-entry?category=${category}&index=${index}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete entry.");
  }
};

export { addOrUpdateUserDetails, getUserDetails, uploadUserImage, deleteEntry };
