import express from 'express';
import friendshipService from '../services/friendshipService';

const friendship = express.Router();

friendship.get('/friends/:id', async (req, res) => {
  const friends = await friendshipService.getUserFriends(req.params.id);
  res.json(friends);
});

friendship.get('/friends', async (req, res) => {
  const { section } = req.query;
  let result;
  switch (section) {
    case 'requests':
      result = await friendshipService.getFriendRequestsSent(req.user.id);
      break;
    case 'out_requests':
      result = await friendshipService.getFriendRequestsPending(req.user.id);
      break;
    default:
      result = await friendshipService.getUserFriends(req.user.id);
      break;
  }
  res.json(result);
});

friendship.post('/friends/:id/add-friend', async (req, res) => {
  const { id: currentId } = req.user;
  const { id: userId } = req.params;
  await friendshipService.sendFriendRequest(currentId, userId);
  res.status(200).end();
});

friendship.delete('/friends/:id/cancel-friend-request', async (req, res) => {
  const { id: currentId } = req.user;
  const { id: userId } = req.params;
  await friendshipService.deleteFriendRequest(currentId, userId);
  res.status(200).end();
});

friendship.post('/friends/:id/accept-friend-request', async (req, res) => {
  const { id: currentId } = req.user;
  const { id: userId } = req.params;
  await friendshipService.acceptFriendRequest(currentId, userId);
  res.status(200).end();
});

friendship.delete('/friends/:id/delete-friend', async (req, res) => {
  const { id: currentId } = req.user;
  const { id: userId } = req.params;
  await friendshipService.deleteFriend(currentId, userId);
  res.status(200).end();
});

friendship.delete('/friends/:id/reject-friend-request', async (req, res) => {
  const { id: currentId } = req.user;
  const { id: userId } = req.params;
  await friendshipService.rejectFriendRequest(currentId, userId);
  res.status(200).end();
});

export default friendship;
