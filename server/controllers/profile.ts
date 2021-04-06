import express from 'express';
import userService from '../services/userService';
import { uploadAvatar } from '../helpers';

const profile = express.Router();

profile.get('/profile', async (req, res) => {
  const { id } = req.user;
  const user = await userService.findUser({ id });
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

profile.put('/profile', async (req, res) => {
  const { id } = req.user;
  let updateFields = req.body;
  if (req.files) {
    updateFields = await uploadAvatar(req.files.avatar);
  }
  const user = await userService.updateUser(id, updateFields.user);
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

profile.delete('/profile', async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);
  res.status(204);
});

export default profile;
