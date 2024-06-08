const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Productos",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      familia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen6: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cantidadTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      potencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacidadDeCarga: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacidadDeBalde: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detalles: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
