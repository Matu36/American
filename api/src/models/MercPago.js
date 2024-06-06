const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("MercPago", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },

    PrecioTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
