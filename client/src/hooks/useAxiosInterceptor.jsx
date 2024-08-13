// hooks/useAxiosInterceptor.js
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Agregar interceptor para respuesta exitosa
    const interceptor = axios.interceptors.response.use(
      (response) => {
        console.log("Respuesta exitosa:", response); // Log de la respuesta exitosa
        return response;
      },
      (error) => {
        console.log("Error de respuesta:", error); // Log del error de respuesta

        if (error.response && error.response.status === 401) {
          console.log(
            "Token expirado o no autorizado. Redirigiendo al inicio."
          );
          localStorage.removeItem("token");
          navigate("/");
        }

        return Promise.reject(error);
      }
    );

    // Eliminar interceptor cuando el componente se desmonte
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
