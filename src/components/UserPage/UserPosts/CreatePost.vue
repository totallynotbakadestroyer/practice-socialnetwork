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
        <v-icon @click="$emit('createPost', post)" v-show="post.text"> mdi-send </v-icon>
      </v-fab-transition>
    </template>
  </v-textarea>
</template>

<script>
export default {
  name: 'CreatePost',
  data() {
    return {
      post: { text: '' },
    };
  },
};
</script>

<style scoped></style>
