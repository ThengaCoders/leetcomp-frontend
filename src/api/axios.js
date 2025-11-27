import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  // no withCredentials for bearer header flow
});

export default api;