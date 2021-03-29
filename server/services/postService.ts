import sequelize from '../../sequelize';
import { PostModel } from '../types';

const postModel = sequelize.models.post;
const userInfoModel = sequelize.models.userInfo;

const findUserPosts = async (userId: string, limit: string | number, offset: string | number) => {
  limit = limit === undefined ? 10 : Number(limit);
  offset = offset === undefined ? 0 : Number(offset);
  return postModel.findAll({
    offset,
    limit,
    where: { destinationUserId: userId },
    include: [{ model: userInfoModel, as: 'author' }],
  });
};

const findSinglePost = async (postId: string) => {
  const post = await postModel.findOne({ where: { id: postId } });
  if (!post) {
    return null;
  }
  return post.toJSON();
};

const createPost = async (post) => {
  const newPost: any = await postModel.build(post);
  newPost.setDataValue('author', await newPost.getAuthor());
  await newPost.save();
  return newPost.toJSON();
};

const updatePost = async (userId: string, postId, updateFields) => {
  const postToUpdate: PostModel | null = await postModel.findOne({
    where: { id: postId },
    include: [{ model: userInfoModel, as: 'author' }],
  });
  if (!postToUpdate) {
    return null;
  }
  if (String(postToUpdate.authorId) !== userId) {
    throw Error;
  }
  await postToUpdate.update(updateFields);
  return postToUpdate.toJSON();
};

export default {
  findUserPosts,
  findSinglePost,
  createPost,
  updatePost,
};
