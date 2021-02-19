<template>
  <div class="container--fluid">
    <div>
      <div class="overlay">
        <div class="header d-flex flex-column"></div>
        <div class="banner">
          <div class="user_name_wrapper">
            <v-avatar class="avatar" size="200">
              <img :src="user.avatar" alt="" />
            </v-avatar>
            <h1 class="user_name">{{ user.firstName }} {{ user.lastName }}</h1>
          </div>
        </div>
      </div>
      <div class="user_stats_block grey darken-4">
        <div class="user_stats">
          <div class="stats_info d-flex flex-column">
            <strong>322</strong>
            <span class="caption grey--text">posts</span>
          </div>
          <v-divider vertical inset />
          <div class="stats_info d-flex flex-column">
            <strong>3232</strong>
            <span class="caption grey--text">friends</span>
          </div>
          <v-divider vertical inset />
          <div class="stats_info d-flex flex-column">
            <strong>232</strong>
            <span class="caption grey--text">followers</span>
          </div>
          <v-divider vertical />
          <div class="stats_info d-flex flex-column">
            <strong>64643</strong>
            <span class="caption grey--text">photos</span>
          </div>
          <v-divider vertical inset />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHeader',
  props: ['user'],
};
</script>

<style scoped>
.container--fluid {
  margin-bottom: 1rem;
}
</style>
