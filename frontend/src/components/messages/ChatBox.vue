<template>
  <span>
    <v-row
      v-for="msg in messages"
      :key="msg.id"
      :align-content-end="isCurrentUser(msg.sender.id)"
      justify-end
      :class="isCurrentUser(msg.sender.id) ? 'text-right' : 'text-left'">
      <v-col
        sm="8"
        md="6"
        lg="4"
        :offset-sm="isCurrentUser(msg.sender.id) ? 4 : 0"
        :offset-md="isCurrentUser(msg.sender.id) ? 6 : 0"
        :offset-lg="isCurrentUser(msg.sender.id) ? 8 : 0">
        <span class="d-flex align-end"
        :class="isCurrentUser(msg.sender.id) ? 'justify-end' : 'justify-start'">
        <v-avatar
          size="32"
          :class="isCurrentUser(msg.sender.id) ? 'order-last ml-2' : 'left mr-2'"
          style="z-index: 4">
          <img
            :src="isCurrentUser(msg.sender.id) ? $store.state.userInfo.avatar : msg.sender.avatar">
        </v-avatar>
        <span
          class="caption grey--text"
          :class="isCurrentUser(msg.sender.id) ? 'text-right' : 'text-xs-left'">
          {{ msg.dateSent | formatDate }}
        </span>
          </span>
        <v-card  rounded :color="isCurrentUser(msg.sender.id) ? 'blue' : 'white' ">
          <v-card-text :class="isCurrentUser(msg.sender.id) ? 'white--text' : 'black--text'">
            {{ msg.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ChatBox',
  props: ['user', 'interlocutor', 'messages'],
  methods: {
    isCurrentUser(user) {
      return user === this.$store.getters.getUserId;
    },
  },
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y hh:mm A');
    },
  },
};
</script>

<style scoped>

</style>
