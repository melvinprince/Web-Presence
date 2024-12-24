import axios from "./axiosInstance";

const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post("/user/checkpass", { email, password });
        return data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to log in.");
    }
};

const checkUser = async (email) => {
    try {
        const { data } = await axios.post("/user/checkuser", { email });
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

export { loginUser, checkUser, registerUser }; // Export both functions
