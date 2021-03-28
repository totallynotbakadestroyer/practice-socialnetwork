import axios from '@/services/axiosInstance';

const getPosts = async (userId, offset, limit) =>
  axios().get('/posts', {
    params: { userId, offset, limit },
  });

const createPost = async (to, payload) => axios().post('/posts', { to, post: payload });

const updatePost = async (payload) => axios().put('/posts', { post: payload });

export default { getPosts, createPost, updatePost };
