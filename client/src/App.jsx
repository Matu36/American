import { useState, useEffect, useRef } from "react";
import NavBar from "./components/Navbar";
import Card from "./components/Card";
import useAuth from "./hooks/useAuth";
import Layout from "./pages/Layout";
import { useProducto } from "./hooks/useProductos";
import CarouselPrincipal from "./components/CarouselPrincipal";
import CarouselMarcas from "./components/CarouselMarcas";
import { FaWhatsapp } from "react-icons/fa";
import HeaderNavBar from "./components/HeaderNavBar";

function App() {
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const cardsContainerRef = useRef(null);
  const { auth, setAuth } = useAuth();

  const { data: productos, isLoading } = useProducto().productosQuery;

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  const handleFamiliaClick = (familia) => {
    setSelectedFamilia(familia);
    scrollToFirstCard();
  };

  const handleSearchByMarca = (marca) => {
    setSelectedFamilia(marca);
    scrollToFirstCard();
  };

  const scrollToFirstCard = () => {
    setTimeout(() => {
      const firstCard = cardsContainerRef.current.querySelector(".card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const productosFiltrados = selectedFamilia
    ? productos.filter((producto) => producto.familia === selectedFamilia)
    : [];

  return (
    <Layout onSearchByMarca={handleSearchByMarca}>
      <div className="containerApp">
        <CarouselPrincipal />

        <div className="eleganzaContainer">
          <div className="navBarDiv">
            <NavBar onSelectFamilia={handleFamiliaClick} />
          </div>
        </div>
        <div ref={cardsContainerRef} className="cards-container" id="card">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <Card key={producto.id} {...producto} />
            ))
          ) : (
            <p></p>
          )}
        </div>
        <CarouselMarcas />
      </div>
      <div className="whatsapp">
        <a
          href="https://wa.me/1159249700"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={60} />
        </a>
      </div>
    </Layout>
  );
}

export default App;
