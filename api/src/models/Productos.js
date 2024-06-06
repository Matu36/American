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
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagen1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagen2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagen3: {
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
      talle: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
