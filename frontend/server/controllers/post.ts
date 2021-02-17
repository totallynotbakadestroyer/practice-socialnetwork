import express from 'express';
import postService from '../services/postService';

const post = express.Router();

post.get('/posts', async (req, res) => {
  const { userId, offset, limit } = req.query;
  if (!userId) {
    return res.status(400).end();
  }
  const posts = await postService.findUserPosts(
    userId as string,
    limit as string,
    offset as string
  );
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

export default post;
