<template>
  <v-card class="about pa-4">
    <p v-if="userInfo.country">
      <v-icon dense small>mdi-map-marker</v-icon>
      {{ userInfo.country }} {{ userInfo.city }}
    </p>
    <p v-if="userInfo.gender">
      <v-icon dense small v-if="userInfo.gender === 'Male'">mdi-gender-male</v-icon>
      <v-icon dense small v-else>mdi-gender-female</v-icon>
      {{ userInfo.gender }}</p>
    <p v-if="userInfo.birthday">
      <v-icon dense small>mdi-cake</v-icon>
      {{ userInfo.birthday | formatDate}}</p>
    <p v-if="userInfo.relationship">
      <v-icon dense small>mdi-heart-box</v-icon>
      {{ userInfo.relationship }}</p>
    <v-divider/>
    <br>
    <!-- todo: implement showing user links -->
    <div class="about_links">
      <a>some link</a>
    </div>
    <v-divider/>
    <div v-if="user.id !== $store.getters.getUserId" class="d-flex flex-column mt-4">
      <v-dialog
        v-model="dialog"
        width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mb-4"
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Send message
          </v-btn>
        </template>
        <send-message-profile :user="user" v-on:closeModal="dialog = false"/>
      </v-dialog>
      <v-btn>Add as friend</v-btn>
    </div>
    <div v-else class="d-flex flex-column mt-4">
      <v-btn>Edit profile</v-btn>
    </div>
  </v-card>
</template>

<style>

.about_links {
  display: flex;
  flex-direction: column;
}

.about_links * {
  margin-bottom: 16px;
}

</style>

<script>
import moment from 'moment';
import SendMessageProfile from '@/components/SendMessageProfile.vue';

export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: { SendMessageProfile },
  name: 'UserAbout',
  props: ['userInfo', 'user'],
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y ');
    },
  },
};

</script>
