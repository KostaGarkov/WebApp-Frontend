import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5016/api",
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
