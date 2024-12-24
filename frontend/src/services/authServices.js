import axios from "./axiosInstance";

const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to check user.");
  }
};

const registerUser = async (email, password) => {
  try {
    const { data } = await axios.post("/user/register", { email, password });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to register.");
  }
};

export { loginUser, registerUser };
