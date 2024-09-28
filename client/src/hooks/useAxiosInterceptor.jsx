// hooks/useAxiosInterceptor.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  // Interceptor para las solicitudes
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para las respuestas
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Token expirado
        localStorage.removeItem("token");
        navigate("/"); // Redirigir a la página de inicio
      }
      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptor;
