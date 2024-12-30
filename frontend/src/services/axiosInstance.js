import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", 
});

// Request interceptor
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

// Response interceptor 
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
        localStorage.setItem("token", newAccessToken); 
        return instance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userDetails"); 
        window.location.href = "/login"; 
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
