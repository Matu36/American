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
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      anticipo: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      saldoAFinanciar: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      IVA: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      moneda: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interes: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },

      saldoConInteres: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      PrecioFinal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      cuotas: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cuotaValor: {
        type: DataTypes.DECIMAL,
        allowNull: true,
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
      nombreVendedor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      apellidoVendedor: {
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
      estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "HistorialCotizacion",
      timestamps: false,
    }
  );
};
