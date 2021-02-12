import express from 'express';
import * as path from 'path';
import logger from 'morgan';
import cors from 'cors';
import sequelize from '../sequelize';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('*', express.static(path.join(__dirname, '/public')));

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

connectToDb();

export default app;
