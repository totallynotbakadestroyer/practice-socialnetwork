<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img :src="$store.state.userInfo.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ currentUser }}</v-list-item-title>
          <v-list-item-subtitle @click="$store.dispatch('logout')">Logout</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="fill-height">
        <router-view></router-view>
      </div>
    </v-main>
    <div class="notification__container">
      <notification
        v-for="notification in notifications"
        :notification="notification"
        :key="notification.id"
      />
    </div>
  </v-app>
</template>

<script>
import { generateNotification } from '../helper';
import Notification from '../components/Notification.vue';

export default {
  components: { Notification },
  sockets: {
    notification(notification) {
      const newNotification = generateNotification(notification);
      console.log(newNotification);
      this.$store.dispatch('addNewNotification', newNotification);
    },
  },
  beforeCreate() {
    this.$socket.connect();
    this.$socket.emit('registerSocket', this.$store.state.id);
  },
  name: 'primary',
  data() {
    return {
      miniVariant: false,
      currentUser: this.$store.getters.getFullName,
      items: [
        { title: 'My Account', icon: 'mdi-account', link: `/id${this.$store.state.id}` },
        { title: 'News Feed', icon: 'mdi-view-dashboard', link: '/feed' },
        { title: 'Messages', icon: 'mdi-message', link: '/messages' },
        { title: 'Settings', icon: 'mdi-cog', link: '/settings' },
      ],
      right: null,
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
  },
};
</script>

<style scoped>
body,
html {
  height: 100%;
}

.notification__container {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 10px;
  bottom: 0;
  width: 100vw;
}
</style>
