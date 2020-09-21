<template>
  <v-app>
    <v-navigation-drawer
      app
    >
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img :src="$store.state.userInfo.avatar">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ currentUser }}</v-list-item-title>
          <v-list-item-subtitle @click="$store.dispatch('logout')" >Logout</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
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

  </v-app>
</template>

<script>

export default {
  name: "primary",
  data () {
    return {
      miniVariant: false,
      currentUser: this.$store.getters.getFullName,
      items: [
        { title: 'My Account', icon: 'mdi-account', link: `/id${this.$store.getters.getUserId}`},
        { title: 'News Feed', icon: 'mdi-view-dashboard', link: '/feed' },
        { title: 'Messages', icon: 'mdi-message', link: '/messages' },
        { title: 'Settings', icon: 'mdi-cog', link: '/settings' },
      ],
      right: null,
    }
  },
};
</script>

<style scoped>

body, html {
  height: 100%;
}

</style>
