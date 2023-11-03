import { Sequelize } from 'sequelize';
import cities from './models/cities';

const sequelize = new Sequelize(
  'numeral-test',
  'postgres',
  'justinmoroz',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
);

cities(sequelize);
const citiesModel = sequelize.models.city;

export {
  sequelize as postgres,
  citiesModel,
};
