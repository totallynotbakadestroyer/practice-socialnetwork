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
    async createPost(payload) {
      const { id } = this.$router.currentRoute.params;
      const createdPost = await postService.createPost(id, payload);
      this.posts.unshift(createdPost.data);
    },
  },
  async mounted() {
    const { id } = this.$router.currentRoute.params;
    const posts = await postService.getPosts(id);
    this.posts = posts.data;
  },
};
</script>
