import express from 'express';
import userInfoService from '../services/userInfoService';

const user = express.Router();

user.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userInfoService.findUserInfo(id);
  if (!result) {
    return res.status(404).end();
  }
  res.json(result);
});

user.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (String(req.user.id) !== String(id)) {
    return res.status(403).end();
  }
  const result = await userInfoService.updateUserInfo(id, req.body);
  if (!result) {
    return res.status(404).end();
  }
  res.json(result);
});

export default user;
