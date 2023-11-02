import { DataTypes, Sequelize } from 'sequelize';

const testModel = (sequelize:Sequelize) => {
  sequelize.define(
    'test',
    {
      testField: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['testField'],
        },
      ],
    },
  );
};

export default testModel;
