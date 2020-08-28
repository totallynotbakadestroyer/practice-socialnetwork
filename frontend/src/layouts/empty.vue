<template>
  <v-app>
    <router-view/>
    <v-footer
        absolute>
      <h3 class="ml-auto">
        {{ new Date().getFullYear() }} - <strong>Vuealize</strong>
      </h3>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'EmptyLayout',
};
</script>

<style>
*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
}
</style>
