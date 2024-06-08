const { Router } = require("express");

const {
  login,
  registro,
  putUser,
  resetPassword,
  getAllUsers,
  getLastLoggedInUsers,
} = require("../controllers/Usuarios");

const {
  getProductos,
  getProductoById,
  putProductos,
  createProducto,
  deleteProducto,
} = require("../controllers/Productos");

const {
  createCotizacion,
  getCotizaciones,
  getCantidadCotizacionesPorUsuario,
  putCotizaciones,
} = require("../controllers/Cotizaciones");

const { createCliente, getClientes } = require("../controllers/Clientes");

const check = require("../middlewares/auth");

//VAMOS A USAR ESTO CUANDO NECESITEMOS TENER LOS DATOS DE DE SESION DEL USUARIO O CUANDO NECESITEMOS SEGURIDAD.

//PARA APLICAR EL MIDDLEWARE EN ALGUNA RUTA QUEDARIA ALGO ASI:

// router.get("/usuarios", check.auth, getUsers);
//En el postman se prueba poniendo dentro de la accion GET, en los headers, y en Authorization el TOKEN GENERADO

const router = Router();

router.post("/usuarios/login", login);
router.post("/usuarios/registro", registro);
router.put("/usuarios", check.auth, putUser);
router.get("/usuarios/lastFive", getLastLoggedInUsers);
router.get("/usuarios/all", check.auth, getAllUsers);
router.put("/usuarios/recoverpass", resetPassword);
router.get("/productos", getProductos);
router.get("/productos/:id", getProductoById);
router.post("/productos/create", createProducto);
router.put("/productos/edit", putProductos);
router.delete("/productos/delete", check.auth, deleteProducto);
router.post("/cotizaciones/create", createCotizacion);
router.get("/cotizaciones/get", getCotizaciones);
router.get("/countCotizaciones/get", getCantidadCotizacionesPorUsuario);
router.put("/cotizaciones/edit", putCotizaciones);
router.post("/cliente/create", createCliente);
router.get("/clientes/get", getClientes);

module.exports = router;
