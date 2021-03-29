<template>
  <v-card class="post pa-4 mb-4">
    <div class="post_user">
      <v-avatar size="64">
        <img :src="post.author.avatar" alt="" />
      </v-avatar>
      <div class="post_name ml-4">
        <router-link :to="{ name: 'UserPage', params: { id: post.author.id } }">
          {{ post.author.firstName }} {{ post.author.lastName }}
        </router-link>
        <p>{{ post.createdAt | formatDate }}</p>
      </div>
    </div>
    <div class="post_content">
      <div class="post_text mt-4">
        <p>
          {{ post.text }}
        </p>
      </div>
    </div>
    <v-divider />
    <div class="post_info mt-3 mb-3">
      <div class="info_likes d-inline-flex align-center">
        <v-icon dense>mdi-heart-outline</v-icon>
        <p class="likes_count ma-0 ml-1">42</p>
      </div>
      <div class="info_likes d-inline-flex align-center ml-4">
        <v-icon dense>mdi-message-outline</v-icon>
        <p class="likes_count ma-0 ml-1">42</p>
      </div>
    </div>
    <v-divider />
  </v-card>
</template>

<style lang="scss">
.post_user {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}

.post_image {
  display: flex;

  img {
    max-width: 100%;
  }
}

.post_name {
  p {
    margin: 0;
  }
}

.user_name_wrapper {
  display: flex;
  position: absolute;
  top: 50%;
}
</style>

<script>
import moment from 'moment';

export default {
  name: 'SinglePost',
  props: ['post'],
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y h:m a');
    },
  },
};
</script>
