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
  obtenerDetalleUsuario,
  getUsuariosConRolFalse,
  getUsuariosChart,
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
  filtrarCotizacionesPorFecha,
  getCotizacionesPorModelo,
  getranking,
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
  getContactoById,
} = require("../controllers/Contacto");
const {
  createContactoProducto,
  getContactoProductoById,
  getContactoProducto,
} = require("../controllers/ContactoProducto");
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
  getMensajesByDestino,
  obtenerMensajePorId,
} = require("../controllers/Mensajes");

const {
  getAllSolicitantes,
  createSolicitante,
} = require("../controllers/Solicitaciones");

const {
  getHistorialDetallePorUsuario,
} = require("../controllers/HistorialCotizacion");

const check = require("../middlewares/auth");

//VAMOS A USAR ESTO CUANDO NECESITEMOS TENER LOS DATOS DE DE SESION DEL USUARIO O CUANDO NECESITEMOS SEGURIDAD.

//PARA APLICAR EL MIDDLEWARE EN ALGUNA RUTA QUEDARIA ALGO ASI:

// router.get("/usuarios", check.auth, getUsers);
//En el postman se prueba poniendo dentro de la accion GET, en los headers, y en Authorization el TOKEN GENERADO

const router = Router();

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.post("/usuarios/rol", check.auth, verificarRol);
router.put("/usuarios", check.auth, putUser);
router.get("/usuarios/lastFive", getLastLoggedInUsers);
router.get("/usuarios/chart", getUsuariosChart);
router.get("/usuarios/detail/:idUsuario", obtenerDetalleUsuario);
router.get("/usuarios/all", check.auth, getAllUsers);
router.get("/usuarios/vendedores", getUsuariosConRolFalse);
router.put("/usuarios/recoverpass", resetPassword);
router.get("/productos", getProductos);
router.get("/productos/getParaCotizar", getProductosParaCotizar);
router.get("/productos/:id", getProductoById);
router.get("/contactoProducto/detalle/:id", getContactoProductoById);
router.get("/contacto/detalle/:id", getContactoById);
router.post("/productos/create", check.auth, createProducto);
router.put("/productos/edit", check.auth, putProductos);
router.delete("/productos/delete", check.auth, deleteProducto);
router.post("/cotizaciones/create", check.auth, createCotizacion);
router.get("/cotizaciones/get/:idUsuario", getCotizaciones);
router.get("/cotizaciones/getCotizacionesSum/:idUsuario", getCotizacionesSum);
router.get("/cotizaciones/getDetalle/:idCotizacion", getCotizacionDetalle);
router.get("/cotizaciones/getVentas/:idUsuario", getCotizacionesEstadoDos);
router.get("/countCotizaciones/get", getCantidadCotizacionesPorUsuario);
router.get("/Cotizaciones/ranking", getranking);
router.put("/cotizaciones/edit", check.auth, putCotizaciones);
router.post("/clientes/create", check.auth, createCliente);
router.get("/clientes/get/:idUsuario", getClientesPorIdDeUsuario);
router.get("/clientes/getDetalle/:idCliente", getClientePorId);
router.get("/clientes/getParaCotizar/:idUsuario", getClientesParaCotizar);
router.put("/clientes/edit", check.auth, updateCliente);
router.get("/contacto/get", getContactos);
router.get("/contacto/getNoLeidosCount", countActiveContactos);
router.put("/contacto/put", updateContactoState);
router.post("/contacto/create", createContacto);
router.get("/contactoProducto/get", getContactoProducto);
router.post("/contactoProducto/create", createContactoProducto);
router.put("/cotizaciones/state", check.auth, updateCotizacionEstado);
router.get("/cotizaciones/suma", sumarPreciosFinales);
router.get("/cotizaciones/ultimas/:idUsuario", getUltimasCotizaciones);
router.get("/cotizaciones/sumaVentas", sumarPreciosFinalesPorMonedaYEstado);
router.get("/usuarios/mensajes", getAllUsersMensajes);
router.post("/mensajes/create", check.auth, createMessage);
router.put("/mensajes/put", check.auth, updateMessageState);
router.get("/mensajes/get", getMessagesByUserAndDestination);
router.get("/mensajes/count/:idUsuario", countMessagesByDestination);
router.get("/mensajes/enviados/:idUsuario", getMensajesByUsuario);
router.get("/mensajes/detail/:idMensaje", obtenerMensajePorId);
router.get("/mensajes/recibidos/:idUsuario", getMensajesByDestino);
router.get("/solicitaciones/get", getAllSolicitantes);
router.post("/solicitaciones/create", createSolicitante);
router.get("/garantias/garantiasById/:id", getGarantiaById);
router.get("/garantias/getAll", getAllGarantias);
router.post("/garantias/create", createGarantia);
router.put("/garantias/put", updateGarantiaState);
router.get("/garantias/getNoLeidosCount", countActiveGarantias);
router.get("/cotizaciones/getVentasById/:id", getVentaById);
router.post("/historial/vendedor/", getHistorialDetallePorUsuario);
router.post("/historial/modelo/", getCotizacionesPorModelo);
router.post("/cotizaciones/fecha/", filtrarCotizacionesPorFecha);
module.exports = router;
