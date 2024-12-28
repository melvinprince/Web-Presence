import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Ensure this points to your backend API base URL
});

// Request interceptor (already present, good)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (add this)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      try {
        const response = await axios.post("/refresh-token"); // Request new token
        const newAccessToken = response.data.accessToken;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        localStorage.setItem("token", newAccessToken); // Update local storage
        return instance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle refresh token failure (log out user, redirect, etc.)
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userDetails"); // Remove other user-related data
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
