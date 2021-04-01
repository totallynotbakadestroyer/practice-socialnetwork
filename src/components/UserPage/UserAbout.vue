<template>
  <v-card class="about pa-4">
    <p v-if="user.contacts.country">
      <v-icon dense small>mdi-map-marker</v-icon>
      {{ user.contacts.country }} {{ user.contacts.city }}
    </p>
    <p v-if="user.gender">
      <v-icon dense small v-if="user.gender === 'Male'">mdi-gender-male</v-icon>
      <v-icon dense small v-else>mdi-gender-female</v-icon>
      {{ user.gender }}
    </p>
    <p v-if="user.birthday">
      <v-icon dense small>mdi-cake</v-icon>
      {{ user.birthday | formatDate }}
    </p>
    <v-divider />
    <br />
    <!-- todo: implement showing user links -->
    <div class="about_links">
      <a>some link</a>
    </div>
    <v-divider />
    <div v-if="user.id === $store.state.id" class="d-flex flex-column mt-4">
      <send-message-profile-button class-name="mb-4" :user="user" />
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
import SendMessageProfileButton from '../SendMessageProfileButton.vue';

export default {
  components: { SendMessageProfileButton },
  name: 'UserAbout',
  props: ['user'],
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y ');
    },
  },
};
</script>
