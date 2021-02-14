import express from 'express';
import * as path from 'path';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import AuthController from './controllers/auth';

let JWT_SECRET;

if (process.env.JWT_SECRET) {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  console.error('JWT_SECRET environmental variable is not set');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use(jwt({ algorithms: ['RS256'], secret: JWT_SECRET }).unless({ path: ['/api/auth/login'] }));

app.use('/api', AuthController);

app.use(express.static(path.join(__dirname, '/public')));
app.use('*', express.static(path.join(__dirname, '/public')));

export default app;
