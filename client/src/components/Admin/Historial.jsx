import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useHistory de react-router-dom
import { useUsuario } from "../../hooks/useUsuarios";

export default function Historial() {
  const { data, isLoading } = useUsuario().vendedoresQuery;
  const navigate = useNavigate(); // Obtiene la instancia de useHistory

  const handleRedirect = (idUsuario) => {
    navigate(`/admin/cotizaciones/historial/${idUsuario}`); // Redirige a la ruta específica del usuario
  };

  return (
    <div>
      <h2>Lista de Vendedores</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {data.map((usuario) => (
            <li key={usuario.id}>
              <button onClick={() => handleRedirect(usuario.id)}>
                {usuario.nombre} {usuario.apellido}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
