<template>
  <div>
    <div class="overlay">
      <div class="header d-flex flex-column">
      </div>
      <div class="banner">
        <div class="user_name_wrapper">
          <v-avatar
            class="avatar"
            size="200">
            <img
              :src="user.avatar"
              alt="">
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
        <v-divider vertical inset/>
        <div class="stats_info d-flex flex-column">
          <strong>3232</strong>
          <span class="caption grey--text">friends</span>
        </div>
        <v-divider vertical inset/>
        <div class="stats_info d-flex flex-column">
          <strong>232</strong>
          <span class="caption grey--text">followers</span>
        </div>
        <v-divider vertical/>
        <div class="stats_info d-flex flex-column">
          <strong>64643</strong>
          <span class="caption grey--text">photos</span>
        </div>
        <v-divider vertical inset/>
      </div>
    </div>

    <v-container fluid>
      <v-row>
        <v-col
          md="3"
        >
          <user-about
            :userInfo="user.userInfo"
            :user="user"/>
        </v-col>

        <v-col md="6">
          <v-textarea
            auto-grow
            filled
            color="deep-purple"
            label="Is there anything you want to say?"
            rows="1"
            v-model="postText">
            <template slot="append">
              <v-fab-transition>
                <v-icon @click="sendPost" v-show="postText">
                  mdi-send
                </v-icon>
              </v-fab-transition>
            </template>
          </v-textarea>
          <div class="user_wall">
            <user-post v-for="post in posts"
                       :post="post"
                       :key="post.id"/>
          </div>
        </v-col>

        <v-col md="3">
          <user-photos/>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserPhotos from '@/components/UserPhotos.vue';
import UserAbout from '@/components/UserAbout.vue';
import UserPost from '@/components/UserPost.vue';
import axios from 'axios';

export default {
  name: 'UserPage',
  components: { UserPhotos, UserAbout, UserPost },
  data() {
    return {
      postText: '',
      user: '',
      posts: [],
    };
  },
  created() {
    axios({
      method: 'get',
      url: `/api/users/${this.$route.params.id}`,
    }).then((response) => {
      this.user = response.data;
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    axios({
      method: 'get',
      url: '/api/posts/',
      params: {
        page: 0,
        id: this.$route.params.id,
      },
    }).then((response) => {
      console.log(response.data.content);
      this.posts.unshift(...response.data.content);
    });
  },
  methods: {
    sendPost() {
      axios({
        method: 'post',
        url: '/api/posts',
        params: {
          destId: this.$route.params.id,
        },
        data: {
          postText: this.postText,
        },
      }).then((response) => {
        this.postText = '';
        this.posts.unshift(response.data);
      }, (error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="scss">

.banner {
  background: url("https://sun9-65.userapi.com/M3RTb3IE8AcfRqWKTOUt7v9079KRE8MEY050yw/FrNd1WqVRmA.jpg");
  background-size: cover;
  width: 100%;
  height: 250px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 1);
    opacity: .6;
  }
}

.user_name_wrapper {
  margin-left: 2%;
  z-index: 1;
}

.user_stats_block {
  height: 80px;
  padding-left: 250px;
  justify-items: center;
  width: 100%;
}

.user_stats {
  display: flex;
  align-items: center;
  align-self: center;
  height: 100%;
}

.info_number {
  font-weight: bold;
  text-align: center;
}

.stats_info {
  text-align: center;
  width: 12%;
  z-index: 1;
}

.user_name {
  justify-self: center;
  align-self: center;
  margin-left: 20px;
  font-weight: bold;
}

</style>
