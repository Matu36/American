import axios from "axios";

export const ProductosAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}productos`,
  // withCredentials: true,
  // mode: "cors",
  // headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'allow_methods': ["GET", "POST"],
  //     "Access-Control-Allow-Credentials": true
});
