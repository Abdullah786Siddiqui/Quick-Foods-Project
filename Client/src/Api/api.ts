// src/utils/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://quick-foods-project-dn7w.vercel.app/", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config => {
    const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("restaurant_token") ||
    localStorage.getItem("delivery_token") ||
    localStorage.getItem("user_token");
    
  if (token) {  
    config.headers.Authorization = `Bearer ${token}`;
  } 
  return config;
}))

export default api;
