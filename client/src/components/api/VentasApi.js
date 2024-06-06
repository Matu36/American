import axios from "axios";

export const VentasAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}ventas`,
  // withCredentials: true,
  // mode: "cors",
  headers: {
    "Content-type": "application/json",
    // Authorization: localStorage.getItem("token"),
  },
});
