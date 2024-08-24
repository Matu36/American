import React from "react";
import error from "../assets/img/error404.png";

export default function ErroPage() {
  return (
    <div className="fullscreen-image">
      <img src={error} alt="Error Image" />
    </div>
  );
}
