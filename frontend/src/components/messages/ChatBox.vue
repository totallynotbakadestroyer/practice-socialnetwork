<template>
  <span>
    <v-row
      v-for="msg in messages"
      :key="msg.id"
      :align-content-end="isCurrentUser(msg.userId)"
      justify-end
      :class="isCurrentUser(msg.userId) ? 'text-right' : 'text-left'"
    >
      <v-col
        sm="8"
        md="6"
        lg="4"
        :offset-sm="isCurrentUser(msg.userId) ? 4 : 0"
        :offset-md="isCurrentUser(msg.userId) ? 6 : 0"
        :offset-lg="isCurrentUser(msg.userId) ? 8 : 0"
      >
        <span
          class="d-flex align-end"
          :class="isCurrentUser(msg.userId) ? 'justify-end' : 'justify-start'"
        >
          <v-avatar
            size="32"
            :class="isCurrentUser(msg.userId) ? 'order-last ml-2' : 'left mr-2'"
            style="z-index: 4"
          >
            <img
              :src="isCurrentUser(msg.userId) ? $store.state.userInfo.avatar : msg.userInfo.avatar"
            />
          </v-avatar>
          <span
            class="caption grey--text"
            :class="isCurrentUser(msg.userId) ? 'text-right' : 'text-xs-left'"
          >
            {{ msg.createdAt | formatDate }}
          </span>
        </span>
        <v-card rounded :color="isCurrentUser(msg.userId) ? 'blue' : 'white'">
          <v-card-text :class="isCurrentUser(msg.userId) ? 'white--text' : 'black--text'">
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
      return user === this.$store.state.id;
    },
  },
  filters: {
    formatDate(date) {
      return moment(new Date(date)).format('MM/DD/Y hh:mm A');
    },
  },
};
</script>

<style scoped></style>
