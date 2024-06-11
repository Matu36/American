import { useState, useEffect, useRef } from "react";
import NavBar from "./components/Navbar";
import Card from "./components/Card";
import Filtros from "./components/Filtros";
import { Slide, toast } from "react-toastify";
import useAuth from "./hooks/useAuth";
import Layout from "./pages/Layout";
import { useProducto } from "./hooks/useProductos";

// const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}productos`, {
//   method: "GET",
//   body: JSON.stringify(),
//   headers: {
//     "Content-type": "application/json",
//   },
// });

// const data = await request.json();

function App() {
  const [selectedMarca, setSelectedMarca] = useState();
  const [filtroPrecio, setFiltroPrecio] = useState();
  const [filtroPrecioTodos, setFiltroPrecioTodos] = useState("");
  const [filtroTalle, setFiltroTalle] = useState("");
  const [carritoC, setCarritoC] = useState(0);
  const cardsContainerRef = useRef(null);
  const { auth, setAuth } = useAuth();

  const { data, isLoading } = useProducto().productosQuery;

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  useEffect(() => {
    toast.info("Prendas 100% ORIGINALES", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
      draggable: true,
      transition: Slide,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      closeButton: false,
      icon: false,
      theme: "dark",
    });
  }, []);

  const filtrarPorTalleYPrecio = () => {
    let camisasFiltradas = data;

    if (filtroTalle) {
      camisasFiltradas = camisasFiltradas.filter((camisa) => {
        const tallesDisponibles = camisa.talle
          .split(", ")
          .map((item) => item.split(":"))
          .map(([talle, cantidad]) => ({
            talle,
            cantidad: parseInt(cantidad),
          }));

        return tallesDisponibles.some(
          ({ talle, cantidad }) =>
            talle.trim() === filtroTalle.trim() && cantidad > 0
        );
      });
    }

    // Aplicar filtro por precio si está definido
    if (filtroPrecioTodos) {
      camisasFiltradas = camisasFiltradas.filter((camisa) => {
        if (filtroPrecioTodos === "menorPrecio" && camisa.precio >= 0) {
          return true;
        } else if (filtroPrecioTodos === "mayorPrecio" && camisa.precio > 0) {
          return true;
        }
        return false;
      });
    }

    // Ordenar todas las camisas filtradas por precio
    camisasFiltradas?.sort((a, b) => {
      if (filtroPrecioTodos === "menorPrecio") {
        return a.precio - b.precio;
      } else if (filtroPrecioTodos === "mayorPrecio") {
        return b.precio - a.precio;
      } else {
        return 0;
      }
    });

    return filtroTalle || filtroPrecioTodos ? camisasFiltradas : [];
  };

  const talle = filtrarPorTalleYPrecio();
  const limpiarFiltros = () => {
    setFiltroTalle("");
    setFiltroPrecioTodos("");
  };

  const filteredCamisas = data?.filter((camisa) => {
    if (selectedMarca === "Todas las marcas") {
      return true;
    }

    return camisa.marca === selectedMarca;
  });

  if (filtroPrecio === "menorPrecio") {
    filteredCamisas.sort((a, b) => a.precio - b.precio);
  }

  if (filtroPrecio === "mayorPrecio") {
    filteredCamisas.sort((a, b) => b.precio - a.precio);
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCount = carrito.length;

  const actualizarContadorCarrito = () => {
    const carritoActualizado =
      JSON.parse(localStorage.getItem("carrito")) || [];
    const count = carritoActualizado.length;
    setCarritoC(count);
  };

  const handleInicioClick = () => {
    setSelectedMarca(null);
  };

  const [showLoading, setShowLoading] = useState(true);

  const closeLoading = () => {
    setShowLoading(false);
  };

  const handleSearchByMarca = (marca) => {
    const marcaNormalized =
      marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();
    setSelectedMarca(marcaNormalized);

    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <Layout onSearchByMarca={handleSearchByMarca}>
      <div className="container">
        {/* {!filteredCamisas?.length > 0 && (
          <div className="filtrosTodos">
            <h4>Filtrá por talle o precio</h4>
            <select
              value={filtroTalle}
              onChange={(e) => setFiltroTalle(e.target.value)}
            >
              <option value="">Por Talle</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <select
              value={filtroPrecioTodos}
              onChange={(e) => setFiltroPrecioTodos(e.target.value)}
            >
              <option value="">Por Precio</option>
              <option value="menorPrecio">Menor Precio</option>
              <option value="mayorPrecio">Mayor Precio</option>
            </select>
            <button value="limpiarTodo" onClick={() => limpiarFiltros()}>
              Omitir Filtros
            </button>
          </div>
        )} */}
        <div className="eleganzaContainer">
          <div className="navBarDiv">
            {/* {!filteredCamisas?.length > 0 && !talle?.length > 0 && (
              <h3 style={{ color: "black" }}>
                <span>Seleccioná alguna de nuestras Marcas</span>
              </h3>
            )} */}
            {!filteredCamisas?.length > 0 && !talle?.length > 0 && (
              <NavBar
                onSelectMarca={setSelectedMarca}
                onInicio={handleInicioClick}
              />
            )}
          </div>
        </div>

        <div>
          {filteredCamisas?.length > 0 && (
            <div className="top-bar">
              <div>
                <Filtros
                  filtroPrecio={filtroPrecio}
                  setFiltroPrecio={setFiltroPrecio}
                  selectedMarca={selectedMarca}
                  setSelectedMarca={setSelectedMarca}
                />
              </div>

              <div>
                <h3>VENICE INDUMENTARIA</h3>
              </div>
              <div>
                <button className="buttonclose" onClick={handleInicioClick}>
                  X
                </button>
              </div>
            </div>
          )}

          <div ref={cardsContainerRef} className="cards-container" id="card">
            {filteredCamisas?.map((camisa) => (
              <Card
                id="cards"
                key={camisa.id}
                {...camisa}
                actualizarContadorCarrito={actualizarContadorCarrito}
              />
            ))}
          </div>
          {!filteredCamisas?.length > 0 && (
            <div className="cards-container" id="card">
              {talle.map((camisa) => (
                <Card
                  id="cards"
                  key={camisa.id}
                  {...camisa}
                  actualizarContadorCarrito={actualizarContadorCarrito}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default App;
