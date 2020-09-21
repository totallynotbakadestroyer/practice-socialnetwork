<template>
  <v-card class="post pa-4">
    <div class="post_user">
      <v-avatar
        size="64">
        <img
          :src="post.author.avatar"
          alt="">
      </v-avatar>
      <div class="post_name ml-4">
        <router-link :to="{name: 'UserPage', params: {id: post.author.id}}">
          {{ post.author.firstName }} {{ post.author.lastName }}
        </router-link>
        <p>{{ post.date | formatDate}}</p>
      </div>
    </div>
    <div class="post_content">
      <div class="post_text mt-4">
        <p>
          {{ post.postText }}
        </p>
      </div>
      <div class="post_image">
        <img src="https://sun9-65.userapi.com/M3RTb3IE8AcfRqWKTOUt7v9079KRE8MEY050yw/FrNd1WqVRmA.jpg" alt="">
      </div>
      <div class="post_additions mb-3">
      </div>
    </div>
    <v-divider/>
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
    <v-divider/>
  </v-card>
</template>

<style lang="scss">

.post_user {
  display: inline-flex;
  align-items: center;
  justify-content: start;
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
  props: ['post'],
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y h:m a');
    },
  },
};
</script>
