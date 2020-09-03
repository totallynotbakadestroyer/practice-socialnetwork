<template>
  <v-app>
    <v-container fill-height>
      <v-card class="mr-auto ml-auto" width="50%">
        <v-card-title>
          Upload your avatar:
        </v-card-title>
        <v-container fill-height>
          <keep-alive>
            <component v-on:emitCurrentState="saveState" v-bind:is="currentComponent[i]"/>
          </keep-alive>
        </v-container>
        <v-card-actions>
          <v-col>
            <v-btn @click="i--" :disabled="i === 0 ? true : false" fab>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn @click="i != currentComponent.length-1 ? i++ : postInfo()" fab>
              <v-icon v-if="i != currentComponent.length-1">mdi-arrow-right</v-icon>
              <v-icon v-else>mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>

      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import CompleteAvatar from '@/components/CompleteAvatar.vue';
import CompleteInfo from '@/components/CompleteInfo.vue';
import axios from 'axios';

export default {
  data() {
    return {
      currentComponent: [CompleteAvatar, CompleteInfo],
      i: 0,
      userInfo: {
        birthday: new Date().toISOString().substr(0, 10),
        gender: '',
        country: '',
        city: '',
        relationship: '',
      },
    };
  },
  methods: {
    saveState(userInfo) {
      Object.assign(this.userInfo, userInfo);
    },
    postInfo() {
      axios({
        url: `/api/users/${this.$store.getters.getUserId}`,
        method: 'PUT',
        data: this.userInfo,
      }).then(() => {
        this.$router.push(`id${this.$store.getters.getUserId}`);
      }).catch((error) => {
        console.log(error);
      });
    },

  },
  name: 'CompleteRegistration.vue',
  components: CompleteAvatar,
  CompleteInfo,
};
</script>

<style scoped>

</style>
