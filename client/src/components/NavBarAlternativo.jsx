import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/img/AMERICAN.jpg";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import CarritoModal from "./CarritoModal";
import Login from "./usuario/Login";
import EditarUsuario from "./usuario/EditarUsuario";
import { useNavigate } from "react-router-dom";

export default function NavBarAlternativo({ onSearchByMarca }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [modalCarrito, setModalCarrito] = useState(false);
  const [carritoC, setCarritoC] = useState(0);
  const { auth, setAuth } = useAuth();
  const [edit, setEdit] = useState(false);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const actualizarContadorCarrito = () => {
    const count = carrito.length;
    setCarritoC(count);
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, [modalCarrito, carritoC]);

  const handleMostrarModalCarrito = () => {
    setModalCarrito(true);
    actualizarContadorCarrito();
  };

  const handleCerrarModalCarrito = () => {
    setModalCarrito(false);
    actualizarContadorCarrito();
  };

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
    // Filtrar las sugerencias basadas en el valor actual del input
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
    // Si el valor es vacío, no mostrar sugerencias
    if (!value) {
      return [];
    }
    // Lista completa de marcas
    const allBrands = [
      "calvin",
      "columbia",
      "nike",
      "hollister",
      "jordan",
      "levis",
      "puma",
      "reebok",
      "timberland",
      "tommy",
      "variadas",
      "adidas",
      "asics",
    ];
    // Filtrar las sugerencias basadas en el valor actual del input
    return allBrands.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
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

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
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
      {modalCarrito && (
        <div>
          <CarritoModal
            handleCerrarModalCarrito={handleCerrarModalCarrito}
            actualizarContadorCarrito={actualizarContadorCarrito}
          />
        </div>
      )}

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
              <FiSearch style={{ color: "black" }} />
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
                  backgroundColor: "#fff",

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
                  {auth.rol !== null ? (
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
            ) : null}
            <div className="fauser">
              <button
                className="shoppingButton"
                onClick={handleUserButtonClick}
              >
                <FaUser />
              </button>

              <button
                className="shoppingButton"
                onClick={handleMostrarModalCarrito}
              >
                <FiShoppingCart />
                {carritoC > 0 && <span className="badge">{carritoC}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
