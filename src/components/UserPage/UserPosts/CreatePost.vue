<template>
  <v-textarea
    auto-grow
    filled
    color="deep-purple"
    label="Is there anything you want to say?"
    rows="1"
    v-model="post.text"
  >
    <template slot="append">
      <v-fab-transition>
        <v-icon @click="createPost" v-show="post.text"> mdi-send </v-icon>
      </v-fab-transition>
    </template>
  </v-textarea>
</template>

<script>
import postService from '@/services/post';

export default {
  name: 'CreatePost',
  data() {
    return {
      post: { text: '' },
    };
  },
  methods: {
    async createPost() {
      const { id } = this.$router.currentRoute.params;
      const createdPost = await postService.createPost(id, this.post);
      this.post.text = '';
      this.$emit('createPost', createdPost);
    },
  },
};
</script>

<style scoped></style>
