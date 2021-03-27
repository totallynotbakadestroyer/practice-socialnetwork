<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="([title, icon, section, disabled], i) in friends"
        :disabled="disabled"
        :key="i"
        :to="{ query: { section } }"
        exact
      >
        <v-list-item-title v-text="title"></v-list-item-title>

        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Requests</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, icon, section], i) in requests"
          :key="i"
          :to="{ query: { section } }"
          exact
        >
          <v-list-item-title v-text="title"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'FriendsMenu',
  data() {
    return {
      friends: [
        ['All friends', 'mdi-account-multiple', 'all'],
        ['Online friends', 'mdi-account-alert', 'online', true], // TODO: Implement showing online users
        ['Find friends', 'mdi-account-search', 'find'],
      ],
      requests: [
        ['Outgoing', 'mdi-account-arrow-right', 'out_requests'],
        ['Incoming', 'mdi-account-arrow-left', 'requests'],
      ],
    };
  },
};
</script>

<style scoped></style>
