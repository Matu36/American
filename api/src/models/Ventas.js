const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ventas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      marca: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      codigo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      costo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuota1: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cuota2: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      saldo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comprador: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vendedor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
