import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import socketMiddleware from './middleware/socketio';
import AuthController from './controllers/auth';
import UserController from './controllers/user';
import PostController from './controllers/post';
import ConversationController from './controllers/conversation';

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

app.use(socketMiddleware);

app.use(
  jwt({ algorithms: ['HS256'], secret: JWT_SECRET }).unless({
    path: ['/api/auth/login', '/api/auth/signup'],
  })
);

app.use('/api', AuthController);
app.use('/api', UserController);
app.use('/api', PostController);
app.use('/api', ConversationController);

export default app;
