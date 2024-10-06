const jwt = require("jwt-simple");
const moment = require("moment");
const { JWTSECRET } = process.env;

//clave secreta//

const secret = JWTSECRET;

const createToken = (user) => {
  const payload = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    password: user.password,
    telefono: user.telefono,
    direccion: user.direccion,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(1, "minutes").unix(),
  };

  return jwt.encode(payload, secret);
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token, secret);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

module.exports = {
  secret,
  createToken,
  decodeToken,
};
