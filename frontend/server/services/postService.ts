import sequelize from '../../sequelize';

const postModel = sequelize.models.post;

const findUserPosts = async (userId: string, limit: string | number, offset: string | number) => {
  limit = limit === undefined ? 10 : Number(limit);
  offset = offset === undefined ? 0 : Number(offset);
  console.log(offset, limit, userId);
  return postModel.findAll({ offset, limit, where: { destinationUserId: userId } });
};

const findSinglePost = async (postId: string) => {
  const post = await postModel.findOne({ where: { id: postId } });
  if (!post) {
    return null;
  }
  return post.toJSON();
};

export default {
  findUserPosts,
  findSinglePost,
};
