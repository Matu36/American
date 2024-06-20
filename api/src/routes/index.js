const { Router } = require("express");

const {
  login,
  registro,
  putUser,
  resetPassword,
  getAllUsers,
  getLastLoggedInUsers,
  verificarRol,
  getAllUsersMensajes,
} = require("../controllers/Usuarios");

const {
  getProductos,
  getProductoById,
  putProductos,
  createProducto,
  deleteProducto,
  getProductosParaCotizar,
} = require("../controllers/Productos");

const {
  createCotizacion,
  getCotizaciones,
  getCantidadCotizacionesPorUsuario,
  putCotizaciones,
  updateCotizacionEstado,
  sumarPreciosFinales,
  sumarPreciosFinalesPorMonedaYEstado,
  getCotizacionesEstadoDos,
  getVentaById,
  getCotizacionDetalle,
  getUltimasCotizaciones,
  getCotizacionesSum,
} = require("../controllers/Cotizaciones");

const {
  createCliente,
  getClientesPorIdDeUsuario,
  updateCliente,
  getClientePorId,
  getClientesParaCotizar,
} = require("../controllers/Clientes");

const {
  getContactos,
  createContacto,
  countActiveContactos,
  updateContactoState,
} = require("../controllers/Contacto");
const {
  getDescuentos,
  createDescuento,
  updateDescuentoState,
  countActiveDiscounts,
} = require("../controllers/Descuentos");
const {
  getAllGarantias,
  getGarantiaById,
  createGarantia,
  updateGarantiaState,
  countActiveGarantias,
} = require("../controllers/Garantia");

const {
  createMessage,
  updateMessageState,
  getMessagesByUserAndDestination,
  countMessagesByDestination,
  getMensajesByUsuario,
} = require("../controllers/Mensajes");

const {
  getAllSolicitantes,
  createSolicitante,
} = require("../controllers/Solicitaciones");

const check = require("../middlewares/auth");

//VAMOS A USAR ESTO CUANDO NECESITEMOS TENER LOS DATOS DE DE SESION DEL USUARIO O CUANDO NECESITEMOS SEGURIDAD.

//PARA APLICAR EL MIDDLEWARE EN ALGUNA RUTA QUEDARIA ALGO ASI:

// router.get("/usuarios", check.auth, getUsers);
//En el postman se prueba poniendo dentro de la accion GET, en los headers, y en Authorization el TOKEN GENERADO

const router = Router();

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.post("/usuarios/rol", verificarRol);
router.put("/usuarios", check.auth, putUser);
router.get("/usuarios/lastFive", getLastLoggedInUsers);
router.get("/usuarios/all", check.auth, getAllUsers);
router.put("/usuarios/recoverpass", resetPassword);
router.get("/productos", getProductos);
router.get("/productos/getParaCotizar", getProductosParaCotizar);
router.get("/productos/:id", getProductoById);
router.post("/productos/create", createProducto);
router.put("/productos/edit", putProductos);
router.delete("/productos/delete", check.auth, deleteProducto);
router.post("/cotizaciones/create", createCotizacion);
router.get("/cotizaciones/get/:idUsuario", getCotizaciones);
router.get("/cotizaciones/getCotizacionesSum/:idUsuario", getCotizacionesSum);
router.get("/cotizaciones/getDetalle/:idCotizacion", getCotizacionDetalle);
router.get("/cotizaciones/getVentas/:idUsuario", getCotizacionesEstadoDos);
router.get("/countCotizaciones/get", getCantidadCotizacionesPorUsuario);
router.put("/cotizaciones/edit", putCotizaciones);
router.post("/clientes/create", createCliente);
router.get("/clientes/get/:idUsuario", getClientesPorIdDeUsuario);
router.get("/clientes/getDetalle/:idCliente", getClientePorId);
router.get("/clientes/getParaCotizar", getClientesParaCotizar);
router.put("/clientes/edit", updateCliente);
router.get("/contacto/get", getContactos);
router.get("/contacto/getNoLeidosCount", countActiveContactos);
router.put("/contacto/put", updateContactoState);
router.post("/contacto/create", createContacto);
router.get("/descuento/get", getDescuentos);
router.get("/descuento/getActivosCount", countActiveDiscounts);
router.post("/descuento/create", createDescuento);
router.put("/descuento/put", updateDescuentoState);
router.put("/cotizaciones/state", updateCotizacionEstado);
router.get("/cotizaciones/suma", sumarPreciosFinales);
router.get("/cotizaciones/ultimas/:idUsuario", getUltimasCotizaciones);
router.get("/cotizaciones/sumaVentas", sumarPreciosFinalesPorMonedaYEstado);
router.get("/usuarios/mensajes", getAllUsersMensajes);
router.post("/mensajes/create", createMessage);
router.put("/mensajes/put", updateMessageState);
router.get("/mensajes/get", getMessagesByUserAndDestination);
router.get("/mensajes/count/:idUsuario", countMessagesByDestination);
router.get("/mensajes/enviados/:idUsuario", getMensajesByUsuario);
router.get("/solicitaciones/get", getAllSolicitantes);
router.post("/solicitaciones/create", createSolicitante);
router.get("/garantias/garantiasById/:id", getGarantiaById);
router.get("/garantias/getAll", getAllGarantias);
router.post("/garantias/create", createGarantia);
router.put("/garantias/put", updateGarantiaState);
router.get("/garantias/getNoLeidosCount", countActiveGarantias);
router.get("/cotizaciones/getVentasById/:id", getVentaById);
module.exports = router;
