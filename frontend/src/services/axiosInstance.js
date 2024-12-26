import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

// Add a request interceptor to attach the token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or however you store the token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
