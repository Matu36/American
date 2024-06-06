const { MercPago } = require("../db.js");
const mercadopago = require("mercadopago");
const MercadoPagoAccesToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;

mercadopago.configure({ access_token: MercadoPagoAccesToken });

const Payment = (req, res) => {
  const prod = req.body;
  let preference = {
    items: [
      {
        title: prod.title, //TENGO QUE CONFIGURAR TODO IGUAL QUE TENGO EL PRODUCTO
        currency_id: "ARS",
        description: JSON.stringify(prod.description),
        quantity: 1,
        unit_price: prod.price,
      },
    ],
    back_urls: {
      success: `https://venice-nine.vercel.app/`,
      failure: `https://venice-nine.vercel.app/`,
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
};

//ESTO VA A LA BASE DE DATOS LOCAL
const postVentaMercadoPago = async (req, res, next) => {
  const { Nombre, Useremail, Precio, FechaDeVenta } = req.body;

  try {
    const nuevaVenta = await MercPago.create({
      Nombre,
      Useremail,
      Precio,
      FechaDeVenta,
    });
    res
      .status(201)
      .json({ mensaje: "Venta creada exitosamente", data: nuevaVenta });
  } catch (error) {
    next(error);
  }
};

const getMercadoPago = async (req, res) => {
  try {
    let com = await MercPago.findAll();

    return !com
      ? res.status(404).send("No hay Ventas")
      : res.send(
          com.map(({ id, Nombre, Useremail, Precio, createdAt }) => ({
            id,
            Nombre,
            Useremail,
            Precio,
            createdAt,
          }))
        );
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error 404");
  }
};

module.exports = {
  Payment,
  postVentaMercadoPago,
  getMercadoPago,
};
