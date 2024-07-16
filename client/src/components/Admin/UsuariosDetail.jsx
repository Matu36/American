import React from "react";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuarios";
import Spinner from "../../UI/Spinner";

export default function UsuariosDetail() {
  const { id } = useParams();

  const { data: usuariosDetail, isLoading } = useUsuario(id).UsuarioDetailQuery;

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { email, nombre, apellido, direccion, telefono, fechaDeRegistro } =
    usuariosDetail;

  return (
    <div className="form-container1">
      <h2>Detalle del Usuario</h2>
      <br />
      <div>
        <strong>Email:</strong> {email}
      </div>
      <br />
      <div>
        <strong>Nombre:</strong> {nombre}
      </div>
      <br />
      <div>
        <strong>Apellido:</strong> {apellido}
      </div>
      <br />
      <div>
        <strong>Dirección:</strong> {direccion}
      </div>
      <br />
      <div>
        <strong>Teléfono:</strong> {telefono}
      </div>
      <br />
      <div>
        <strong>Fecha de Registro:</strong>{" "}
        {new Date(fechaDeRegistro).toLocaleString()}
      </div>
    </div>
  );
}
