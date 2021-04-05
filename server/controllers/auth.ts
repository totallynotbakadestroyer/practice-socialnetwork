import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserCredentials } from '../types';
import userService from '../services/userService';

const auth = express.Router();

let JWT_SECRET;

if (process.env.JWT_SECRET) {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  console.error('JWT_SECRET environmental variable is not set');
  process.exit(1);
}

interface NewUser extends UserCredentials {
  firstName: string;
  lastName: string;
  birthday: Date;
}

auth.post('/auth/login', async (req, res) => {
  const credentials: UserCredentials = req.body;
  if (!credentials.email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!credentials.password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  const user = await userService.findUser({ email: credentials.email });
  if (!user) {
    return res.status(400).json({ error: 'Email or password is wrong' });
  }
  const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
  if (!passwordsMatch) {
    return res.status(400).json({ error: 'Email or password is wrong' });
  }
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, (err, encoded) => {
    if (err) return err;
    delete user.password;
    res.header('Authorization', `Bearer ${encoded}`).json(user);
  });
});

auth.post('/auth/signup', async (req, res) => {
  const { email, password, ...userInfo }: NewUser = req.body;
  const user = await userService.createUser({ email, password }, userInfo);
  res.status(201).json(user);
});

export default auth;
