import React from "react";
import NavBarAlternativo from "../components/NavBarAlternativo";
import FooterAlternativo from "./FooterAlternativo";

const Layout = ({ children, onSearchByMarca }) => {
  return (
    <div>
      <NavBarAlternativo onSearchByMarca={onSearchByMarca} />
      {children}
      <FooterAlternativo />
    </div>
  );
};

export default Layout;
