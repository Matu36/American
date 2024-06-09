const { Descuentos } = require("../db.js");

const createDescuento = async (req, res) => {
  try {
    const { nombreCompleto, email, telefonoCelular, direccion } = req.body;
    if (!nombreCompleto || !email || !telefonoCelular) {
      throw "Faltan parámetros obligatorios en el cuerpo de la solicitud";
    }

    const nuevoDescuento = await Descuentos.create({
      nombreCompleto,
      email,
      telefonoCelular,
      direccion,
      estado: "activo",
    });

    return res.status(201).json(nuevoDescuento);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const getDescuentos = async (req, res) => {
  try {
    const descuentos = await Descuentos.findAll();

    return res.status(200).json(descuentos);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createDescuento,
  getDescuentos,
};
