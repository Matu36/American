import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function Spinner({ loading }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "70%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <PacmanLoader
        color="#ffc107"
        cssOverride={{
          position: "relative",
          display: "block",
          margin: "0 auto",
          borderColor: "red",
          zIndex: 9999,
        }}
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <span
        style={{
          display: "block",
          fontSize: "20px",
          textAlign: "center",
          marginTop: "10px",
          marginLeft: "5rem",
        }}
      >
        Cargando...
      </span>
    </div>
  );
}

export default Spinner;
