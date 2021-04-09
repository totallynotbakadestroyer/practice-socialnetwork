<template>
  <v-col md="6">
    <create-post @createPost="createPost" />
    <div class="user_wall">
      <single-post v-for="post in posts" :post="post" :key="post.id" />
    </div>
  </v-col>
</template>

<script>
import CreatePost from '@/components/UserPage/UserPosts/CreatePost.vue';
import postService from '@/services/post';
import SinglePost from './SinglePost.vue';

export default {
  components: { CreatePost, SinglePost },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    createPost(payload) {
      console.log(payload);
      this.posts.unshift(payload);
    },
  },
  async beforeMount() {
    const { id } = this.$router.currentRoute.params;
    const posts = await postService.getPosts(id);
    console.log(posts);
    this.posts = posts;
  },
};
</script>
