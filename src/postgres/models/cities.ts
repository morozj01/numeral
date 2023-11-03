import { DataTypes, Sequelize } from 'sequelize';

const citiesModel = (sequelize:Sequelize) => {
  sequelize.define(
    'city',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      currentWeather: {
        type: DataTypes.FLOAT, // Current weather in Farenheit
        allowNull: false,
        validate: {
          min: -150,
          max: 150,
        },
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lon: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
  );
};

export default citiesModel;
