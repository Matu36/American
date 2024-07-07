import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/img/LOGOAMERICANPRINCIPAL.png";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Login from "./usuario/Login";
import EditarUsuario from "./usuario/EditarUsuario";
import { useNavigate } from "react-router-dom";
import { useProducto } from "../hooks/useProductos";
import { useUsuario } from "../hooks/useUsuarios";

export default function NavBarAlternativo({ onSearchByMarca }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { auth, setAuth } = useAuth();
  const [edit, setEdit] = useState(false);
  const [login, setLogin] = useState(false);

  const idUsuario = auth?.id;

  const { mutate: checkRol, data: rolData } = useUsuario().CheckRolMutation;

  const handleCheckRol = () => {
    checkRol({ idUsuario });
  };

  useEffect(() => {
    if (idUsuario) {
      handleCheckRol();
    }
  }, [idUsuario]);

  const role = rolData?.data.rol;

  const { data: categorias } = useProducto().productosCategoriasQuery;

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const handleMostrarModalLogin = () => {
    setLogin(true);
  };

  const handleCerrarModalLogin = () => {
    setLogin(false);
  };

  const handleMostrarModalEdit = () => {
    setEdit(true);
  };

  const handleCerrarModalEdit = () => {
    setEdit(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      const filteredSuggestions = getSuggestions(value);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearchByMarca(suggestion);
    setSuggestions([]);
  };
  const getSuggestions = (value) => {
    if (!value || !categorias) {
      return [];
    }

    const categoriasArray = categorias
      .split(",")
      .map((categoria) => categoria.trim());

    return categoriasArray.filter((categoria) =>
      categoria.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearch = () => {
    onSearchByMarca(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleUserButtonClick = () => {
    if (Object.keys(auth).length === 0) {
      handleMostrarModalLogin();
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  window.addEventListener("scroll", function () {
    var blackBar = document.querySelector(".black-bar");
    var whiteBar = document.querySelector(".white-bar");
    var brownBar = document.querySelector(".brown-bar");

    if (window.pageYOffset > 0) {
      whiteBar.classList.add("fixed");
      blackBar.style.visibility = "hidden";
      brownBar.style.visibility = "hidden";
    } else {
      whiteBar.classList.remove("fixed");
      blackBar.style.visibility = "visible";
      brownBar.style.visibility = "visible";
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    setAuth({});
    navigate("/");
  };

  return (
    <div>
      {login && (
        <div>
          <Login
            handleMostrarModalLogin={handleMostrarModalLogin}
            handleCerrarModalLogin={handleCerrarModalLogin}
          />
        </div>
      )}
      {edit && (
        <div>
          <EditarUsuario
            handleMostrarModalEdit={handleMostrarModalEdit}
            handleCerrarModalEdit={handleCerrarModalEdit}
          />
        </div>
      )}
      <div className="navbar-container">
        <div className="white-bar">
          <img src={logo} alt="" />
          <div className="search-bar">
            <button className="search-button" onClick={handleSearch}>
              <FiSearch style={{ color: "grey" }} />
            </button>
            <input
              className="inputnav"
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "sticky",
                  top: "calc(100% + 2px)",
                  left: 0,
                  backgroundColor: "black",

                  borderRadius: "4px",
                  padding: "5px",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      color: "gray",
                      cursor: "pointer",
                      marginBottom: "5px",
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {Object.keys(auth).length > 0 ? (
              <div className="user-menu-container">
                <span className="user-info">
                  {role === "vendedor" || role === "administrador" ? (
                    <Link to="/admin">
                      <button style={{ color: "gray" }}>Admin</button>{" "}
                    </Link>
                  ) : null}
                  <button
                    onClick={handleMostrarModalEdit}
                    style={{ color: "gray", marginRight: "5px" }}
                  >
                    {auth ? auth.nombre : auth.email}
                  </button>
                  <button style={{ color: "gray" }} onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </span>
              </div>
            ) : (
              <div className="fauser">
                <button
                  className="shoppingButton"
                  onClick={handleUserButtonClick}
                >
                  <FaUser />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
