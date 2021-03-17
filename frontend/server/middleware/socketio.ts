import { NextFunction, Request, Response } from 'express';
import socketApi from '../socket';

const socket = (req: Request, res: Response, next: NextFunction): void => {
  req.io = socketApi.io;
  next();
};

export default socket;
