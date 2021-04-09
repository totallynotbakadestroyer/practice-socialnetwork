import axios from '@/services/axiosInstance';

const getPosts = async (userId, offset, limit) => {
  const { data } = await axios().get('/posts', {
    params: { userId, offset, limit },
  });
  return data;
};

const createPost = async (to, payload) => {
  const { data } = await axios().post('/posts', { to, post: payload });
  return data;
};

const updatePost = async (payload) => {
  const { data } = await axios().put('/posts', { post: payload });
  return data;
};

export default { getPosts, createPost, updatePost };
