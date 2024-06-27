const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "HistorialCotizacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroCotizacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      anticipo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      saldoAFinanciar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      IVA: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      moneda: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interes: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      saldoConInteres: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      PrecioFinal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fechaDeCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaModi: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nombreCliente: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apellidoCliente: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mailCliente: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      familia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "HistorialCotizacion",
      timestamps: false,
    }
  );
};
