import axios from "../services/axiosInstance"; // Import custom axios instance

// Action Types
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE";

// Action Creators

// Set user details in Redux store
export const setUserDetails = (details) => ({
  type: SET_USER_DETAILS,
  payload: details,
});

// Update user image in Redux store
export const updateUserImage = (imageUrl) => ({
  type: UPDATE_USER_IMAGE,
  payload: imageUrl,
});

// Thunk Actions

// Fetch user details from the backend
export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get("/user/get-details");
    const userDetails = response.data;
    dispatch(setUserDetails(userDetails));
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

// Update user details in the backend and Redux store
export const saveUserDetails = (details) => async (dispatch) => {
  try {
    const response = details.user_id
      ? await axios.put("/user/update-details", details)
      : await axios.post("/user/add-details", details);

    const updatedDetails = response.data;
    dispatch(setUserDetails(updatedDetails));
  } catch (error) {
    console.error("Error saving user details:", error);
  }
};

