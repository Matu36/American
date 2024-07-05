import { useState, useEffect, useRef } from "react";
import NavBar from "./components/Navbar";
import Card from "./components/Card";
import Filtros from "./components/Filtros";
import { Slide, toast } from "react-toastify";
import useAuth from "./hooks/useAuth";
import Layout from "./pages/Layout";
import { useProducto } from "./hooks/useProductos";

function App() {
  const [selectedMarca, setSelectedMarca] = useState();
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroFamilia, setFiltroFamilia] = useState("");
  const cardsContainerRef = useRef(null);
  const { auth, setAuth } = useAuth();

  const { data: productos, isLoading } = useProducto().productosQuery;

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const filtrarPorMaquinaYMarca = () => {
    let productosFiltrados = productos;

    if (filtroFamilia) {
      productosFiltrados = productosFiltrados.filter((maquina) => {
        const familiasDisponibles = maquina.familia
          .split(", ")
          .map((item) => item.split(":"))
          .map(([familia, cantidad]) => ({
            familia,
            cantidad: parseInt(cantidad),
          }));

        return familiasDisponibles.some(
          ({ familia }) => familia.trim() === filtroFamilia.trim()
        );
      });
    }

    if (filtroMarca) {
      productosFiltrados = productosFiltrados.filter(
        (maquina) => maquina.marca.trim() === filtroMarca.trim()
      );
    }

    return productosFiltrados;
  };

  const talle = filtrarPorMaquinaYMarca();
  const limpiarFiltros = () => {
    setFiltroMarca("");
    setFiltroFamilia("");
  };

  const filteredCamisas = productos?.filter((producto) => {
    if (selectedMarca === "Todas las marcas") {
      return true;
    }

    return producto.marca === selectedMarca;
  });

  const handleInicioClick = () => {
    setSelectedMarca(null);
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
      <div className="containerApp">
        <div className="eleganzaContainer">
          <div className="navBarDiv">
            {(!filteredCamisas?.length > 0 || !talle?.length > 0) && (
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
                  filtroFamilia={filtroFamilia}
                  setFiltroFamilia={setFiltroFamilia}
                  selectedMarca={selectedMarca}
                  setSelectedMarca={setSelectedMarca}
                />
              </div>

              <div>
                <h3>AMERICAN VIAL</h3>
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
              <Card id="cards" key={camisa.id} {...camisa} />
            ))}
          </div>
          {!filteredCamisas?.length > 0 && (
            <div className="cards-container" id="card">
              {talle?.map((camisa) => (
                <Card id="cards" key={camisa.id} {...camisa} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default App;
