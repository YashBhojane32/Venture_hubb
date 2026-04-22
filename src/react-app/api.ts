import axios from "axios";

const API = axios.create({
  baseURL: "https://venture-hubb.onrender.com", // ✅ include /api
});

// ✅ ADD THIS (VERY IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;