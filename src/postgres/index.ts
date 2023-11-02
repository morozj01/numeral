import { Sequelize } from 'sequelize';
import test from './models/test';

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

test(sequelize);

const testModel = sequelize.models.test;

/*
sequelize.models.test.hasMany(sequelize.models.__);
sequelize.models.__.belongsTo(sequelize.models.test, { foreignKey: '' });
*/

// https://github.com/vercel/next.js/discussions/15341
// if (process.env.NEXT_PHASE !== 'phase-production-build') sequelize.sync();

export {
  sequelize as postgres,
  testModel,
};
