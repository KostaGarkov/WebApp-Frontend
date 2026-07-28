import axios from "axios";
import { APP_CONFIG } from "../config";

const axiosInstance = axios.create({
    baseURL: APP_CONFIG.apiBaseUrl,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.set
            ? config.headers.set("Authorization", `Bearer ${token}`)
            : (config.headers["Authorization"] = `Bearer ${token}`);
    }

    return config;
});

export default axiosInstance;
