import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

export default function CarritoModal({
  handleCerrarModalCarrito,
  actualizarContadorCarrito,
}) {
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [precioTotal, setPrecioTotal] = useState(0);

  const removeFromCart = (productId) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const indexToRemove = carrito.findIndex(
      (producto) => producto.id === productId
    );

    if (indexToRemove !== -1) {
      carrito.splice(indexToRemove, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
  };

  const removeAllItemsFromCart = () => {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
  };

  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")) || []);
  }, []);

  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")) || []);

    // Calcular el precio total al actualizar el carrito
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    setPrecioTotal(total);
  }, [carrito]);

  const phoneNumber = "2215991213";

  const generateWhatsAppMessage = () => {
    const message = carrito.reduce((acc, item) => {
      return (
        acc +
        `✅ ${item.marca} - Código: ${item.codigo} - Talle: ${item.talle} - Precio: $${item.precio}\n`
      );
    }, "👋 ¡Hola! ¿Cómo estás?\n\nQuiero encargar:");

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const handleComprar = () => {
    const message = generateWhatsAppMessage();
    window.location.href = `whatsapp://send?text=${message}`;
  };

  return (
    <div className="carrito">
      <button className="button-cerrar" onClick={handleCerrarModalCarrito}>
        <GrClose />
      </button>
      {carrito.length === 0 ? (
        <p style={{ fontWeight: "bold", color: "white" }}>
          El carrito esta vacío
        </p>
      ) : (
        carrito.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item-image">
              <img src={item.imagen} alt={`imagen-${item.id}`} />
            </div>
            <div className="cart-item-details">
              <h3>{item.nombre ? item.nombre : item.marca}</h3>

              <p>Talle: {item.talle}</p>
              <p>Precio: ${item.precio}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
      {carrito.length > 0 ? (
        <>
          <p style={{ fontWeight: "bold", color: "white" }}>
            Precio Total: $ {precioTotal}
          </p>
          <div className="cart-item-actions">
            <button onClick={handleComprar}>Encargar</button>
            <button onClick={removeAllItemsFromCart}>Vaciar Carrito</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
