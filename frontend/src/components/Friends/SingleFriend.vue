<template>
  <v-col cols="4" class="d-flex flex-column justify-center align-center text-center">
    <div class="mb-2">
      <v-avatar size="62">
        <img :src="friend.avatar" alt="avatar" />
      </v-avatar>
    </div>
    <div class="d-flex flex-column">
      <div>{{ friend.firstName }} {{ friend.lastName }}</div>
      <div class="flex-column d-flex">
        <v-btn class="my-2" color="success">send message</v-btn>
        <delete-friend-button :firstName="friend.firstName" v-on:confirmDeletion="deleteFriend" />
      </div>
    </div>
  </v-col>
</template>

<script>
import friendshipService from '../../services/friendship';
import DeleteFriendButton from './DeleteFriendButton.vue';

export default {
  name: 'SingleFriend',
  components: { DeleteFriendButton },
  props: ['friend'],
  data() {
    return {
      deleteDialog: false,
    };
  },
  methods: {
    async deleteFriend() {
      await friendshipService.deleteFriend(this.friend.id);
      this.deleteDialog = false;
      this.$emit('friendDeleted', this.friend.id);
    },
  },
};
</script>
