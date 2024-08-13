// hooks/useAxiosInterceptor.js
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/"); // Redirigir al home si la sesión expiró
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
