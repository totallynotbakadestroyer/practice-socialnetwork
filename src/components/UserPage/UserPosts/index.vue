<template>
  <v-col md="6">
    <create-post @createPost="createPost" />
    <div class="user_wall">
      <single-post v-for="post in posts" :post="post.node" :key="post.id" />
    </div>
    <infinite-loading @infinite="getPosts">
      <div slot="spinner">
        <v-progress-circular :size="40" :width="4" color="success" indeterminate />
      </div>
      <div slot="no-more">No more posts</div>
      <div slot="no-results">No more posts</div>
      <div slot="error">
        Error when loading posts <a href="#" @click="getPosts">here</a> to retry
      </div>
    </infinite-loading>
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
      pageInfo: null,
    };
  },
  methods: {
    createPost(payload) {
      this.posts.unshift({ node: { ...payload } });
    },
    async getPosts($state) {
      let after;
      if (this.pageInfo) {
        after = this.pageInfo.endCursor;
        if (!this.pageInfo.hasNextPage) {
          $state.complete();
          return;
        }
      }
      const { id } = this.$router.currentRoute.params;
      const { edges, pageInfo } = await postService.getPosts(id, after);
      this.pageInfo = pageInfo;
      this.posts.push(...edges);
      $state.loaded();
    },
  },
};
</script>
