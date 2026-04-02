import axios from "axios";

const API = axios.create({
  baseURL: "https://akshaya-backend.vercel.app/api",
});

export default API;