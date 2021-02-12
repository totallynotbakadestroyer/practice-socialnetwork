import express from 'express';
import * as path from 'path';
import logger from 'morgan';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('*', express.static(path.join(__dirname, '/public')));

export default app;
