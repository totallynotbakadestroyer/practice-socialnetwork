<template v-if="userInfo">
  <div>
    <user-header :user="userInfo" />
    <v-container fluid>
      <v-row>
        <v-col md="3">
          <user-about :user="userInfo" />
        </v-col>

        <user-posts />

        <v-col md="3">
          <user-photos />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserPhotos from '@/components/UserPage/UserPhotos.vue';
import UserAbout from '@/components/UserPage/UserAbout.vue';
import UserPosts from '@/components/UserPage/UserPosts';
import userService from '@/services/user';
import UserHeader from '@/components/UserPage/UserHeader.vue';

export default {
  name: 'UserPage',
  components: { UserPhotos, UserAbout, UserPosts, UserHeader },
  data() {
    return {
      userInfo: null,
    };
  },
  async mounted() {
    const { id } = this.$router.currentRoute.params;
    const user = await userService.getUser(id);
    this.userInfo = user.data;
    console.log(user.data);
  },
};
</script>

<style lang="scss">
.banner {
  background: url('https://sun9-65.userapi.com/M3RTb3IE8AcfRqWKTOUt7v9079KRE8MEY050yw/FrNd1WqVRmA.jpg');
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
    opacity: 0.6;
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
