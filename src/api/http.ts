import axios from "axios";
import { APP_CONFIG } from "../config";

const http = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // гарантираме, че headers съществува
  if (!config.headers) {
    config.headers = {} as any;
  }

  // добавяме Authorization header
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

export default http;
