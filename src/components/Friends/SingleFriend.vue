<template>
  <v-col cols="4" class="d-flex flex-column justify-center align-center text-center">
    <div class="mb-2">
      <v-avatar size="62">
        <img :src="friend.avatar" alt="avatar" />
      </v-avatar>
    </div>
    <div class="d-flex flex-column">
      <div>{{ friend.firstName }} {{ friend.lastName }}</div>
      <div
        v-if="!$route.query.section || $route.query.section === 'all'"
        class="flex-column d-flex"
      >
        <send-message-profile-button class-name="my-2" :user="friend" />
        <delete-friend-button :firstName="friend.firstName" v-on:confirmDeletion="deleteFriend" />
      </div>
      <div v-else-if="$route.query.section === 'requests'" class="flex-column d-flex">
        <v-btn v-on:click="acceptFriendRequest" class="my-2" color="success">accept request</v-btn>
        <v-btn v-on:click="rejectFriendRequest" color="error"> reject request</v-btn>
      </div>
      <div v-else-if="$route.query.section === 'out_requests'" class="flex-column d-flex">
        <v-btn v-on:click="cancelFriendRequest" class="my-2" color="warning">cancel request</v-btn>
      </div>
    </div>
  </v-col>
</template>

<script>
import friendshipService from '../../services/friendship';
import DeleteFriendButton from './DeleteFriendButton.vue';
import SendMessageProfileButton from '../SendMessageProfileButton.vue';

export default {
  name: 'SingleFriend',
  components: { SendMessageProfileButton, DeleteFriendButton },
  props: ['friend'],
  methods: {
    async deleteFriend() {
      await friendshipService.deleteFriend(this.friend.id);
      this.$emit('friendDeleted', this.friend.id);
    },
    async cancelFriendRequest() {
      await friendshipService.cancelFriendRequest(this.friend.id);
      this.$emit('friendDeleted', this.friend.id);
    },
    async acceptFriendRequest() {
      await friendshipService.acceptFriendRequest(this.friend.id);
      this.$emit('friendDeleted', this.friend.id);
    },
    async rejectFriendRequest() {
      await friendshipService.rejectFriendRequest(this.friend.id);
      this.$emit('friendDeleted', this.friend.id);
    },
  },
};
</script>
