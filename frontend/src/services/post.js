import axios from '@/services/axiosInstance';

const getPosts = async (userId, offset, limit) =>
  axios({ requiresAuth: true }).get('/posts', {
    params: { userId, offset, limit },
  });

const createPost = async (to, payload) =>
  axios({ requiresAuth: true }).post('/posts', { to, post: payload });

const updatePost = async (payload) =>
  axios({ requiresAuth: true }).put('/posts', { post: payload });

export default { getPosts, createPost, updatePost };
