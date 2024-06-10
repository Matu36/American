const { Garantia } = require("../db.js");

// FUNCION PARA CREAR LA GARANCIA

const createGarantia = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      empresa,
      email,
      telefono,
      tipoDeMaquina,
      marca,
      modelo,
      numeroDeChasis,
      fechaEntregaDelEquipo,
      ubicacion,
      cantidadHorasHorometro,
      falla,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !empresa ||
      !email ||
      !telefono ||
      !tipoDeMaquina ||
      !marca ||
      !modelo ||
      !numeroDeChasis ||
      !fechaEntregaDelEquipo ||
      !ubicacion ||
      !cantidadHorasHorometro ||
      !falla
    ) {
      throw "Todos los campos son requeridos";
    }

    const nuevaGarantia = await Garantia.create({
      nombre,
      apellido,
      empresa,
      email,
      telefono,
      tipoDeMaquina,
      marca,
      modelo,
      numeroDeChasis,
      fechaEntregaDelEquipo,
      ubicacion,
      cantidadHorasHorometro,
      falla,
    });

    return res.status(201).json(nuevaGarantia);
  } catch (error) {
    console.error("Error al crear la garantía:", error);
    return res.status(400).json({ error: "No se pudo crear la garantía" });
  }
};

const getAllGarantias = async (req, res) => {
  try {
    const garantias = await Garantia.findAll({
      attributes: ["empresa", "email", "modelo", "falla", "fechaCrea"],
    });

    return res.status(200).json(garantias);
  } catch (error) {
    console.error("Error al obtener las garantías:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ESTA FUNCION ES PARA EL DETALLE DE LA GARANTIA

const getGarantiaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw "Se requiere el ID de la garantía";
    }

    const garantia = await Garantia.findByPk(id);

    if (!garantia) {
      return res.status(404).json({ error: "Garantía no encontrada" });
    }

    return res.status(200).json(garantia);
  } catch (error) {
    console.error("Error al obtener la garantía por ID:", error);
    return res
      .status(400)
      .json({ error: "Error al obtener la garantía por ID" });
  }
};

module.exports = {
  createGarantia,
  getAllGarantias,
  getGarantiaById,
};
