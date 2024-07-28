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
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: false,
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
      fichaPDF: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cantidadTotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      costo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: true,
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
      timestamps: true,
    }
  );
};
