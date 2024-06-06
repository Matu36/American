const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta//

const secret = "CLAVE_SECRETA_VENICE";

const createToken = (user) => {
  const payload = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    direccion: user.direccion,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken,
};
