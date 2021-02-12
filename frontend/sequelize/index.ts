import { Sequelize } from 'sequelize';

let postgresUri;

if (process.env.POSTGRES_URI) {
  postgresUri = process.env.POSTGRES_URI;
} else {
  console.error('POSTGRES_URI environmental variable is not set');
  process.exit(1);
}

const sequelize = new Sequelize(postgresUri, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
