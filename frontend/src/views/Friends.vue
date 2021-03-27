<template>
  <div class="d-flex flex-column fill-height">
    <v-container class="flex-grow-1 d-flex" fluid>
      <v-row class="flex-grow-1">
        <v-col class="d-flex" cols="9">
          <v-card outlined class="py-6 flex-grow-1">
            <v-row>
              <single-friend
                v-on:friendDeleted="deleteFriendFromList"
                v-for="friend in friends"
                :key="friend.id"
                :friend="friend"
              />
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3">
          <friends-menu />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SingleFriend from '../components/Friends/SingleFriend.vue';
import FriendsMenu from '../components/Friends/FriendsMenu.vue';
import friendshipService from '../services/friendship';

export default {
  name: 'Friends.vue',
  components: { SingleFriend, FriendsMenu },
  data() {
    return {
      friends: null,
    };
  },
  methods: {
    deleteFriendFromList(id) {
      const index = this.friends.findIndex((x) => x.id === id);
      this.friends.splice(index, 1);
    },
  },
  async beforeMount() {
    this.friends = await friendshipService.getFriends();
  },
};
</script>

<style scoped></style>
