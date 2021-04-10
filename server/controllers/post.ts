import express from 'express';
import postService from '../services/postService';

const post = express.Router();

post.get('/posts', async (req, res) => {
  const { userId, after, limit } = req.query;
  if (!userId) {
    return res.status(400).end();
  }
  const posts = await postService.findUserPosts(userId as string, limit as string, after as string);
  res.json(posts);
});

post.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const singlePost = await postService.findSinglePost(id);
  if (!singlePost) {
    return res.status(404).end();
  }
  res.json(singlePost);
});

post.post('/posts', async (req, res) => {
  const { id: authorId } = req.user;
  const { post: newPost, to: destinationUserId } = req.body;
  if (!req.body || !destinationUserId) {
    return res.status(400).end();
  }
  newPost.authorId = authorId;
  newPost.destinationUserId = destinationUserId;
  const createdPost = await postService.createPost(newPost);
  res.json(createdPost);
});

post.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { post: updateFields } = req.body;
  const updatedPost = await postService.updatePost(String(userId), id, updateFields);
  res.json(updatedPost);
});

export default post;
