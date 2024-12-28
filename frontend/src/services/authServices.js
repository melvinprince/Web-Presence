import axiosInstance from "./axiosInstance";

const loginUser = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/user/login", { email, password });
    localStorage.setItem("token", data.accessToken);
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem("tokenExpiration", expirationTime);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

const registerUser = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/user/register", { email, password });
    localStorage.setItem("token", data.accessToken);
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem("tokenExpiration", expirationTime);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed.");
  }
};

const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userDetails");
    await axiosInstance.post("/user/logout"); 
  } catch (error) {
    console.error("Logout failed:", error);

  }
};

export { loginUser, registerUser, logoutUser };
