import axios from "axios";

export const DescuentoAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}descuento`,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
