import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border spinner-border-lg text-primary"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};

export default Spinner;
