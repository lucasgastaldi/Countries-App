const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    name: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    difficulty: {
      type: DataTypes.ENUM(["1","2","3","4","5"]),
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    season: {
      type: DataTypes.STRING
    }
  });
};
