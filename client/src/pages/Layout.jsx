import React from "react";
import NavBarAlternativo from "../components/NavBarAlternativo";
import FooterAlternativo from "./FooterAlternativo";
import HeaderNavBar from "../components/HeaderNavBar";

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
